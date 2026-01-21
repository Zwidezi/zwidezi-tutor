
import React, { useState, useRef } from 'react';
import { Grade, Subject, Message, AppView, WhatsAppSync } from './types';
import { TutorService } from './services/geminiService';
import { SubjectPicker } from './components/SubjectPicker';
import { StudyPage } from './components/StudyPage';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('picker');
  const [grade, setGrade] = useState<Grade | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [waSync, setWaSync] = useState<WhatsAppSync | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const tutorRef = useRef<TutorService | null>(null);

  // Configuration for your WhatsApp bot
  const BOT_PHONE_NUMBER = "+27658396392"; 

  const handleSelect = async (g: Grade, s: Subject, sync: WhatsAppSync) => {
    setGrade(g);
    setSubject(s);
    setWaSync(sync);
    setView('study');
    
    // If WhatsApp Sync is enabled and it's a new subject choice, simulate the bot interaction
    if (sync.enabled && sync.phoneNumber) {
      const waMessage = `START_SESSION:G${g}:${s.toUpperCase().replace(/\s/g, '_')}`;
      const waUrl = `https://wa.me/${BOT_PHONE_NUMBER}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');
    }

    // Initialize AI session
    tutorRef.current = new TutorService();
    try {
      const welcome = await tutorRef.current.startChat(g, s);
      setMessages([{ role: 'model', content: welcome }]);
    } catch (error) {
      console.error("Failed to start chat:", error);
      setMessages([{ role: 'model', content: "Eish, I'm having trouble connecting. Please try restarting the session." }]);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !tutorRef.current) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      
      const stream = tutorRef.current.sendMessageStream(text);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', content: fullResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I ran into a bit of a snag. Can you try again? Eish!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBack = () => {
    // Only switch view, don't clear grade/waSync so they are preserved in the picker
    setView('picker');
    setMessages([]);
    tutorRef.current = null;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-green-100 selection:text-green-900">
      {view === 'picker' ? (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
          <SubjectPicker 
            onSelect={handleSelect} 
            initialGrade={grade}
            initialSubject={subject}
            initialWaSync={waSync}
          />
        </div>
      ) : (
        grade && subject && (
          <StudyPage 
            grade={grade}
            subject={subject}
            messages={messages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            whatsappSync={waSync}
          />
        )
      )}
    </div>
  );
};

export default App;
