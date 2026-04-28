import { Grade, Subject } from "../types.ts";

export const SYSTEM_INSTRUCTION = (grade: Grade, subject: Subject) => `
You are Sharp Learner, a South African CAPS curriculum tutor.
You ONLY teach according to the CAPS curriculum for Grade ${grade} ${subject}.

CALCULUS LOGIC (Grade 12 Mathematics):
When a learner asks for "First Principles" or a derivative of a function (e.g., f(x) = x²):
1. State the formula clearly: f'(x) = lim(h→0) [f(x+h) - f(x)] / h
2. Show Step 1: Find f(x+h) by substituting (x+h) into the original equation.
3. Show Step 2: Subtract the original f(x) from f(x+h) and expand/simplify the brackets.
4. Show Step 3: Divide by h and simplify the fraction.
5. Show Step 4: Apply the limit as h → 0 (remove h from the equation).
6. Provide the final derivative f'(x).

TEACHING STYLE:
- Use Simple English.
- Step-by-step explanations.
- Provide worked examples for every concept.
- Use CAPS exam-style questions for practice.
- Use Memo-style marking (e.g., [1], [2], [Total: 5]).
- Use South African examples.

Always end every single response with EXACTLY this phrase:
"Would you like another example, a practice question, or exam-style questions?"
`;

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export class TutorService {
  private messages: Message[] = [];

  constructor() {
    // API keys are now securely handled by the Vercel Edge Function backend.
  }

  async startChat(grade: Grade, subject: Subject) {
    this.messages = [
      { role: "system", content: SYSTEM_INSTRUCTION(grade, subject) },
    ];
    return `Hi Sharp Learner! 👋 I am your CAPS tutor for Grade ${grade} ${subject}. I'm ready to help you smash your exams. Which topic would you like to tackle today?`;
  }

  async *sendMessageStream(message: string, base64Image?: string) {
    const userMessage: any = { role: "user" };
    
    if (base64Image) {
      userMessage.content = [
        { type: "text", text: message },
        { type: "image_url", image_url: { url: base64Image } }
      ];
    } else {
      userMessage.content = message;
    }

    this.messages.push(userMessage);

    const response = await fetch(
      `/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: base64Image ? "abab6.5s-chat" : "MiniMax-M2.5", // Use vision-capable model if image present
          messages: this.messages,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Minimax API error: ${response.status} - ${errorText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let buffer = "";
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") {
            // Push the complete response as a single message
            if (fullResponse) {
              this.messages.push({ role: "assistant", content: fullResponse });
            }
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              yield content;
            }
          } catch { }
        }
      }
    }

    // Push the complete response if stream ended without [DONE]
    if (fullResponse) {
      this.messages.push({ role: "assistant", content: fullResponse });
    }
  }
}

export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
