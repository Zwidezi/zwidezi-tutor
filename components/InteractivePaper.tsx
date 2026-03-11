import React, { useState, useRef, useEffect } from 'react';
import { Resource, Grade, Subject, Message } from '../types.ts';
import { TutorService } from '../services/geminiService.ts';

interface InteractivePaperProps {
    resource: Resource | null;
    grade: Grade;
    subject: Subject;
    onClose: () => void;
}

export const InteractivePaper: React.FC<InteractivePaperProps> = ({ resource, grade, subject, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const tutorServiceRef = useRef<TutorService>(new TutorService());
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resource) {
            // Clear previous chat
            setMessages([]);
            const initChat = async () => {
                setIsTyping(true);
                // Start chat with extra context about the paper
                const greeting = await tutorServiceRef.current.startChat(grade, subject);
                const customGreeting = `Hi! I see you're looking at **${resource.title}**. What do you need help with? I can explain the memo, outline steps for a specific question, or break down a tough concept!`;
                setMessages([{ role: 'model', content: customGreeting }]);
                setIsTyping(false);
            };
            initChat();
        }
    }, [resource, grade, subject]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim() || isTyping) return;

        setInput('');
        const userMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const stream = tutorServiceRef.current.sendMessageStream(
                `[Student is currently viewing the past paper: ${resource?.title}]. ${text}`
            );

            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = fullResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', content: 'Eish, there was an error processing your request. Please try again.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!resource) return null;

    return (
        <div className="fixed inset-0 z-[100] flex bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full h-full flex flex-col md:flex-row bg-slate-900">

                {/* Left Side: PDF Viewer */}
                <div className="flex-1 flex flex-col h-[50vh] md:h-full border-b md:border-b-0 md:border-r border-slate-800">
                    <header className="flex items-center justify-between p-3 bg-slate-900 border-b border-slate-800 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                            </div>
                            <h2 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">{resource.title}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            {resource.memoUrl && (
                                <a href={resource.memoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 text-xs font-bold text-white rounded-lg hover:bg-slate-700 transition-colors hidden sm:block border border-slate-700">
                                    Open Memo
                                </a>
                            )}
                            <button onClick={onClose} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-slate-700 ml-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </header>

                    <div className="flex-1 w-full bg-[#323639] relative">
                        <iframe
                            src={`${resource.url}#toolbar=0`}
                            className="w-full h-full border-none absolute inset-0"
                            title={resource.title}
                        />
                    </div>
                </div>

                {/* Right Side: AI Tutor */}
                <div className="w-full md:w-[400px] lg:w-[450px] h-[50vh] md:h-full flex flex-col bg-slate-50 relative shrink-0">
                    <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm z-10 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-2.5 shadow-lg shadow-blue-100">
                                    <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-800">Study Assistant</h3>
                                <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest leading-none">Online & Ready</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 pb-6">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-[1.5rem] p-4 text-[13px] sm:text-sm shadow-sm
                  ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'}
                `}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-100 rounded-[1.5rem] rounded-bl-none p-4 max-w-[85%] shadow-sm flex gap-1.5 items-center">
                                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="bg-white border-t border-slate-100 p-3 sm:p-4 shrink-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                        {messages.length < 3 && !isTyping && (
                            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
                                <button onClick={() => handleSend("Explain to me how to approach Question 1")} className="shrink-0 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                                    Help with Q1
                                </button>
                                <button onClick={() => handleSend("Can you explain the memo for this paper?")} className="shrink-0 px-3 py-1.5 bg-purple-50 text-purple-600 text-xs font-bold rounded-full border border-purple-100 hover:bg-purple-100 transition-colors">
                                    Explain the Memo
                                </button>
                            </div>
                        )}

                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                                placeholder="Ask your tutor anything..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-[1.5rem] pl-4 pr-12 py-3 sm:py-3.5 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                                disabled={isTyping}
                            />
                            <button
                                onClick={() => handleSend(input)}
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 p-1.5 sm:p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
