
import React, { useState, useEffect } from 'react';
import { Grade, Subject, Message, Topic, Resource, WhatsAppSync } from '../types';
import { Button } from './Button';
import { ChatMessage } from './ChatMessage';
import { CURRICULUM_DATA } from '../data/curriculum';

interface StudyPageProps {
  grade: Grade;
  subject: Subject;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onBack: () => void;
  whatsappSync?: WhatsAppSync;
}

const QUICK_ACTIONS = [
  "Explain a topic",
  "Give practice questions",
  "Test me",
  "Summarise",
  "Help me study"
];

const ResourceCard: React.FC<{
  resource: Resource;
  type: 'pdf' | 'video';
  onWhatsApp: (res: Resource) => void;
}> = ({ resource, type, onWhatsApp }) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-green-400 hover:shadow-lg transition-all flex items-center justify-between group">
      <div className="flex items-center gap-5 min-w-0">
        <div className={`p-4 rounded-2xl flex-shrink-0 ${type === 'pdf' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {type === 'pdf' ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <div className="min-w-0">
          <h4 className="font-black text-slate-800 truncate text-lg leading-tight">
            {resource.title}
          </h4>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1.5">
            {resource.year} • {resource.fileSize}
          </p>
        </div>
      </div>

      <div className="flex gap-2 ml-4">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 text-blue-600 hover:bg-blue-50 rounded-2xl transition-all border border-slate-50"
          title="Open Resource"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <button
          onClick={() => onWhatsApp(resource)}
          className="p-3.5 text-green-600 hover:bg-green-50 rounded-2xl transition-all border border-slate-50"
          title="Send to WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const StudyPage: React.FC<StudyPageProps> = ({
  grade,
  subject,
  messages,
  isTyping,
  onSendMessage,
  onBack,
  whatsappSync
}) => {
  const [activeMode, setActiveMode] = useState<'hub' | 'tutor'>('hub');
  const [hubTab, setHubTab] = useState<'papers' | 'notes'>('papers');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleWhatsApp = (res: Resource) => {
    // 1. Format the phone number (saved selection)
    const cleanNumber = whatsappSync?.enabled && whatsappSync.phoneNumber 
      ? whatsappSync.phoneNumber.replace(/\D/g, '') 
      : '';
    
    // 2. Create professional message with bolding
    const message = `*Mzansi CAPS Tutor*\n\nHere is your requested resource:\n*${res.title}*\n\nDownload here: ${res.url}`;
    
    // 3. Encode and Open
    const encodedMessage = encodeURIComponent(message);
    const baseUrl = cleanNumber ? `https://wa.me/27${cleanNumber}` : `https://wa.me/`;
    window.open(`${baseUrl}?text=${encodedMessage}`, '_blank');
  };

  const topics = CURRICULUM_DATA[grade]?.[subject] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (activeMode === 'tutor') {
      scrollToBottom();
    }
  }, [messages, isTyping, activeMode]);

  return (
    <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
      {/* Dynamic Hub Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-green-600 rounded-[1.25rem] flex items-center justify-center text-white font-black text-xl shadow-xl shadow-green-100">
            G{grade}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Grade {grade} {subject}</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mt-2">CAPS Learning Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <nav className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button
              onClick={() => setActiveMode('hub')}
              className={`px-10 py-3 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${activeMode === 'hub' ? 'bg-white text-green-700 shadow-md border border-green-50' : 'text-slate-400'}`}
            >
              Study Hub
            </button>
            <button
              onClick={() => setActiveMode('tutor')}
              className={`px-10 py-3 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${activeMode === 'tutor' ? 'bg-white text-green-700 shadow-md border border-green-50' : 'text-slate-400'}`}
            >
              AI Tutor
            </button>
          </nav>
          
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-50 hover:text-green-600 transition-all uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
            Change Subject
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        {activeMode === 'hub' ? (
          <div className="flex-1 overflow-y-auto bg-slate-50/30 p-10 md:p-16">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Confirmed: <span className="text-green-600">Resources Ready.</span></h2>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setHubTab('papers')}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${hubTab === 'papers' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:border-green-300'}`}
                  >
                    Past Papers
                  </button>
                  <button 
                    onClick={() => setHubTab('notes')}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${hubTab === 'notes' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:border-green-300'}`}
                  >
                    Study Guides
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {topics.map(topic => {
                  const resources = hubTab === 'papers' ? topic.resources.pastPapers : topic.resources.studyNotes;
                  if (resources.length === 0) return null;

                  return (
                    <React.Fragment key={topic.id}>
                      {resources.map(res => (
                        <ResourceCard 
                          key={res.id} 
                          resource={res} 
                          type="pdf" 
                          onWhatsApp={handleWhatsApp} 
                        />
                      ))}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Empty state */}
              {topics.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 text-center animate-in fade-in zoom-in duration-700">
                   <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-slate-100 shadow-xl border border-slate-50 mb-8">
                     <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                   </div>
                   <h3 className="text-3xl font-black text-slate-800 tracking-tight">Eish, No Resources Found!</h3>
                   <p className="text-slate-400 text-sm font-black uppercase tracking-[0.2em] mt-3">We are still loading Grade {grade} {subject} materials.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="flex-1 overflow-y-auto px-10 py-16">
              <div className="max-w-3xl mx-auto space-y-10">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg} />
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-4 text-green-600 text-xs font-black uppercase tracking-[0.2em] ml-8">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span>Sharp learner, I'm thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <footer className="bg-white border-t border-slate-50 p-8 pb-14">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
                  {QUICK_ACTIONS.map(action => (
                    <button
                      key={action}
                      onClick={() => onSendMessage(action)}
                      className="whitespace-nowrap px-8 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-xs font-black text-slate-500 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-all uppercase tracking-widest shadow-sm"
                    >
                      {action}
                    </button>
                  ))}
                </div>

                <div className="flex items-end space-x-5">
                  <div className="relative flex-1">
                    <textarea
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          const val = (e.target as HTMLTextAreaElement).value;
                          if (val.trim()) {
                            onSendMessage(val);
                            (e.target as HTMLTextAreaElement).value = '';
                          }
                        }
                      }}
                      placeholder="Ask about a CAPS topic..."
                      className="w-full bg-slate-50 border-2 border-transparent rounded-[2.5rem] px-10 py-6 pr-20 focus:outline-none focus:ring-12 focus:ring-green-500/5 focus:bg-white focus:border-green-100 transition-all resize-none text-slate-800 font-bold placeholder:text-slate-300 shadow-inner"
                    />
                    <button
                      onClick={(e) => {
                         const textarea = e.currentTarget.previousSibling as HTMLTextAreaElement;
                         if (textarea.value.trim()) {
                           onSendMessage(textarea.value);
                           textarea.value = '';
                         }
                      }}
                      className="absolute right-4 bottom-4 p-5 rounded-2xl bg-green-600 text-white shadow-xl active:scale-90"
                    >
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};
