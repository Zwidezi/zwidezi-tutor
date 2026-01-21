
import { GoogleGenAI, Chat } from "@google/genai";
import { Grade, Subject, Message } from "../types";

const SYSTEM_INSTRUCTION = (grade: Grade, subject: Subject) => `
You are an AI tutor for South African high school students following the CAPS curriculum.
Current Student Context: Grade ${grade}, Subject: ${subject}.

TEACHING RULES:
1. Explain concepts in simple, clear South African English.
2. Assume the student has limited background knowledge.
3. Break explanations into step-by-step points.
4. Use CAPS-aligned terminology (e.g., 'NSC', 'Calculus', 'Financial Maths', 'IEB/DBE style').
5. Use examples similar to past NSC examination papers.
6. Show ALL working for calculations. Never skip a step.
7. Explain WHY each step is done.
8. Point out common mistakes students make in exams.
9. Be patient, encouraging, and supportive. Use phrases like "Sharp, let's look at this", "You've got this", "Don't worry, many learners find this tricky".
10. NEVER shame or discourage the learner.
11. Formatting: Use headings (###), bullet points, and clear math layouts.

RESPONSE TYPES:
- "Explain a topic" -> Simple explanation + CAPS example.
- "Give practice questions" -> CAPS-style questions.
- "Test me" -> Quiz (max 5 questions) and WAIT for answers.
- "Mark my answers" -> Mark step-by-step and give corrections with encouraging feedback.
- "Summarise" -> Exam-ready bullet points (the 'must-knows').
- "Help me study" -> Create a 3-step CAPS study plan for the topic.

LIMITS:
- No university-level content.
- Stay within CAPS scope for Grade ${grade}.
- Do not copy textbooks word-for-word.
`;

export class TutorService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async startChat(grade: Grade, subject: Subject) {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION(grade, subject),
        temperature: 0.7,
      },
    });
    
    const initialPrompt = `Hello! I am ready to help you with Grade ${grade} ${subject}. How can I help you study today? You can ask me to explain a topic, test you, or help you study.`;
    return initialPrompt;
  }

  async sendMessage(message: string) {
    if (!this.chat) throw new Error("Chat not initialized");
    const response = await this.chat.sendMessage({ message });
    return response.text;
  }

  async *sendMessageStream(message: string) {
    if (!this.chat) throw new Error("Chat not initialized");
    const result = await this.chat.sendMessageStream({ message });
    for await (const chunk of result) {
      yield chunk.text;
    }
  }
}
