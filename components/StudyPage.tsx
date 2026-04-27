import React, { useState, useEffect, useRef } from 'react';
import { Grade, Subject, Message, Topic, Resource, WhatsAppSync, User } from '../types.ts';
import { Button } from './Button.tsx';
import { ChatMessage } from './ChatMessage.tsx';
import { CURRICULUM_DATA } from '../data/curriculum.ts';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { SYSTEM_INSTRUCTION, encodeBase64, decodeBase64, decodeAudioData } from '../services/geminiService.ts';
import { DailyWarmUp } from './DailyWarmUp.tsx';
import { InteractiveQuiz } from './InteractiveQuiz.tsx';
import { SyllabusNavigator } from './SyllabusNavigator.tsx';
import { ResourceViewer } from './ResourceViewer.tsx';
import { VideoPlayer } from './VideoPlayer.tsx';
import { InteractivePaper } from './InteractivePaper.tsx';
import { ApsCalculator } from './ApsCalculator.tsx';
import { CareerExplorer } from './CareerExplorer.tsx';
import { TRANSLATIONS, Language } from '../data/translations.ts';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppService } from '../services/whatsappService.ts';

interface StudyPageProps {
  grade: Grade;
  subject: Subject;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string, image?: string) => void;
  onBack: () => void;
  whatsappSync?: WhatsAppSync;
  sessionId?: string;
  waError?: string | null;
  user?: User | null;
  language?: string;
  onUpdateMastery?: (topicId: string, percentage: number) => void;
}

const MOTIVATION = [
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Sharp Learner" },
  { text: "May your choices reflect your hopes, not your fears.", author: "Nelson Mandela" },
  { text: "Nkosi Sikelel' iAfrika – God bless your study session!", author: "Mzansi Pulse" }
];

const TopicCard: React.FC<{
  topic: Topic;
  onWhatsAppAction: (type: 'pdf' | 'formula' | 'quiz', topic: Topic) => void;
  onViewResource: (resource: Resource) => void;
  onViewPastPaper: (resource: Resource) => void;
  onViewVideo: (resource: Resource) => void;
  onUpdateMastery?: (topicId: string, percentage: number) => void;
  mastery?: number;
}> = ({ topic, onWhatsAppAction, onViewResource, onViewPastPaper, onViewVideo, onUpdateMastery, mastery = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all hover:shadow-lg group mb-4"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-5">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </motion.div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">{topic.title}</h3>
            <div className="flex items-center gap-3 mt-0.5">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                CAPS MODULE READY
              </p>
              {mastery > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${mastery}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-green-600 dark:text-green-400">{mastery}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <motion.div 
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="p-2 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{topic.summary}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Key Concepts</h4>
                  {topic.keyPoints.map((point, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm"
                    >
                      <div className="w-5 h-5 bg-green-600 text-white rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0 mt-0.5">{idx + 1}</div>
                      <span className="text-xs font-bold text-slate-700">{point}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Study Material</h4>
                  <div className="flex flex-col gap-2">
                    {topic.resources?.pastPapers?.map(pp => (
                      <button key={pp.id} onClick={() => onViewPastPaper(pp)} className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-100 transition-all group shadow-sm">
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-xs font-bold text-indigo-900 line-clamp-1">{pp.title}</span>
                          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">INTERACTIVE PAPER • {pp.year}</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                      </button>
                    ))}

                    {topic.resources?.studyNotes?.map(note => (
                      <button key={note.id} onClick={() => onViewResource(note)} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group shadow-sm">
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-xs font-bold text-slate-800 line-clamp-1">{note.title}</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">STUDY NOTES • PDF</span>
                        </div>
                        <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      </button>
                    ))}

                    {topic.resources?.videoTutorials?.map(vid => (
                      <button key={vid.id} onClick={() => onViewVideo(vid)} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm">
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-xs font-bold text-slate-800 line-clamp-1">{vid.title}</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">VIDEO • EXPERT EXPLAINED</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </button>
                    ))}

                    {(!topic.resources?.pastPapers?.length && !topic.resources?.videoTutorials?.length) && (
                      <button onClick={() => onWhatsAppAction('pdf', topic)} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group">
                        <span className="text-xs font-bold text-slate-700">Request Exam Guide (WA)</span>
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      </button>
                    )}

                    <button onClick={() => onWhatsAppAction('quiz', topic)} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-100 rounded-xl hover:border-purple-500 hover:bg-purple-100 transition-all group mt-2">
                      <span className="text-xs font-bold text-purple-900">Take Speed Quiz (WA)</span>
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {onUpdateMastery && (
                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${mastery === 100 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">Mastery Goal</p>
                      <p className="text-[10px] font-bold text-slate-400">Mark module as completed</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateMastery(topic.id, 100);
                    }}
                    disabled={mastery === 100}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      mastery === 100 
                        ? 'bg-green-500 text-white shadow-lg' 
                        : 'bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    {mastery === 100 ? 'Mastered!' : 'Mark Completed'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const StudyPage: React.FC<StudyPageProps> = ({
  grade, subject, messages, isTyping, onSendMessage, onBack, whatsappSync, sessionId, waError, user, language = 'en'
}) => {
  const t = TRANSLATIONS[language as Language] || TRANSLATIONS.en;
  const [activeMode, setActiveMode] = useState<'hub' | 'tutor'>('hub');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [activePastPaper, setActivePastPaper] = useState<Resource | null>(null);
  const [activeVideo, setActiveVideo] = useState<Resource | null>(null);
  const [showApsCalculator, setShowApsCalculator] = useState(false);
  const [showCareerExplorer, setShowCareerExplorer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [examCountdown, setExamCountdown] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const examDate = new Date('2024-10-21T09:00:00'); // NSC 2024 Starts
    const timer = setInterval(() => {
      const now = new Date();
      const diff = examDate.getTime() - now.getTime();
      if (diff < 0) {
        setExamCountdown('Finals have started!');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setExamCountdown(`${days}d ${hours}h until Finals`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % MOTIVATION.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { if (activeMode === 'tutor') scrollToBottom(); }, [messages, isTyping, activeMode]);

  const waService = whatsappSync?.enabled && whatsappSync.phoneNumber 
    ? new WhatsAppService(whatsappSync.phoneNumber) 
    : null;

  const handleWhatsAppAction = (type: 'pdf' | 'formula' | 'quiz', topic: Topic) => {
    if (!waService) {
      toast.error("WhatsApp Sync not active. Enable it in settings!");
      return;
    }

    switch (type) {
      case 'pdf': waService.requestPdfGuide(topic); break;
      case 'formula': waService.requestFormulaSheet(topic); break;
      case 'quiz': waService.requestQuiz(topic); break;
    }
  };

  const startVoice = async () => {
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        alert("Voice feature requires VITE_GEMINI_API_KEY. Please configure it in your .env.local file.");
        return;
      }
      setIsVoiceActive(true);
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = {
                data: encodeBase64(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              for (const source of sourcesRef.current.values()) {
                source.stop();
                sourcesRef.current.delete(source);
              }
              nextStartTimeRef.current = 0;
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Gemini Live API Error:', e);
            setIsVoiceActive(false);
          },
          onclose: () => setIsVoiceActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION(grade, subject),
        }
      });
    } catch (err) { console.error(err); setIsVoiceActive(false); }
  };

  const stopVoice = () => {
    setIsVoiceActive(false);
    streamRef.current?.getTracks().forEach(track => track.stop());
    audioContextRef.current?.close();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = (text: string) => {
    onSendMessage(text, selectedImage || undefined);
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const usagePercent = user ? (user.stats.messagesSent / (user.stats.dailyLimit || 1)) * 100 : 0;
  const isLimitReached = user?.plan === 'free' && user?.stats.messagesSent >= user?.stats.dailyLimit;
  const topics = CURRICULUM_DATA[grade]?.[subject] || [];

  const filteredTopics = topics.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] dark:bg-slate-900 font-sans overflow-hidden transition-colors duration-500">
      {showApsCalculator && <ApsCalculator onClose={() => setShowApsCalculator(false)} />}
      {showCareerExplorer && user && <CareerExplorer user={user} onClose={() => setShowCareerExplorer(false)} currentAps={32} />}
      <InteractivePaper resource={activePastPaper} grade={grade} subject={subject} onClose={() => setActivePastPaper(null)} />
      <ResourceViewer resource={activeResource} onClose={() => setActiveResource(null)} />
      <VideoPlayer video={activeVideo} onClose={() => setActiveVideo(null)} />

      <header className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-40 shadow-sm transition-colors duration-500">
        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100 dark:shadow-none"
          >
            G{grade}
          </motion.div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{subject}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mzansi Hub</span>
              <div className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <span className="text-[8px] font-black text-green-600 uppercase tracking-widest">Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowApsCalculator(true)} className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100/50 dark:border-blue-800/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-widest">APS Calc</span>
          </button>

          <button onClick={() => setShowCareerExplorer(true)} className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100/50 dark:border-indigo-800/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Careers</span>
          </button>

          <nav className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-2xl border border-slate-200 dark:border-slate-600">
            <button onClick={() => setActiveMode('hub')} className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest relative z-10 ${activeMode === 'hub' ? 'text-green-700 dark:text-green-400' : 'text-slate-400'}`}>
              {t.study_hub}
              {activeMode === 'hub' && <motion.div layoutId="mode-pill" className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl -z-10 shadow-sm" />}
            </button>
            <button onClick={() => setActiveMode('tutor')} className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest relative z-10 ${activeMode === 'tutor' ? 'text-green-700 dark:text-green-400' : 'text-slate-400'}`}>
              {t.tutor}
              {activeMode === 'tutor' && <motion.div layoutId="mode-pill" className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl -z-10 shadow-sm" />}
            </button>
          </nav>

          <button onClick={onBack} className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-100 transition-all ml-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeMode === 'hub' ? (
            <motion.div 
              key="hub"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth"
            >
              <div className="max-w-4xl mx-auto space-y-8 pb-32">
                <div className="bg-green-600 text-white py-2 px-4 rounded-xl overflow-hidden relative flex items-center mb-4">
                  <div className="whitespace-nowrap flex gap-10 animate-marquee font-black text-[9px] uppercase tracking-widest">
                    <span>📢 NSC 2024 Exam Timetable is now live!</span>
                    <span>📝 New Mathematics Study Guides added for Grade 12</span>
                    <span>🏆 Congrats to our top 100 Learners this week!</span>
                    <span>📅 Final exams start in {examCountdown.split(' ')[0]} days</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">NSC Countdown</p>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{examCountdown}</h3>
                    </div>
                    <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center animate-pulse">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowApsCalculator(true)}
                    className="flex-1 bg-indigo-600 p-6 rounded-[2.5rem] text-white shadow-lg shadow-indigo-100 dark:shadow-none cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{t.career_path}</p>
                      <h3 className="text-xl font-black tracking-tight">{t.check_aps}</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/40 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                  </motion.div>
                </div>

                <DailyWarmUp grade={grade} subject={subject} />

                <SyllabusNavigator grade={grade} subject={subject} />

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-green-100 relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Mzansi Pulse Motivation</span>
                    <motion.p 
                      key={quoteIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl md:text-2xl font-black mt-2 leading-tight tracking-tight"
                    >
                      "{MOTIVATION[quoteIdx].text}"
                    </motion.p>
                    <p className="text-sm font-bold mt-4 opacity-80">— {MOTIVATION[quoteIdx].author}</p>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                </motion.div>

                <div className="space-y-4 pt-4 border-t border-slate-200" id="study-material-section">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 gap-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-800 tracking-tight">Study Material</h2>
                      <p className="text-sm font-bold text-slate-400 mt-1">CAPS Aligned • Grade {grade}</p>
                    </div>
                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        placeholder="Search topics, formulas, concepts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 rounded-[1.25rem] pl-10 pr-4 py-3 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-50 transition-all font-bold text-slate-700 shadow-sm placeholder:text-slate-300"
                      />
                      <svg className="w-5 h-5 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 01-14 0z" /></svg>
                    </div>
                  </div>

                  <motion.div layout className="grid grid-cols-1 gap-2 mt-2">
                    {filteredTopics.map((topic, i) => (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <TopicCard
                          topic={topic}
                          onWhatsAppAction={handleWhatsAppAction}
                          onViewResource={(res) => setActiveResource(res)}
                          onViewPastPaper={(pp) => setActivePastPaper(pp)}
                          onViewVideo={(vid) => setActiveVideo(vid)}
                          onUpdateMastery={onUpdateMastery}
                          mastery={user?.stats.mastery?.[topic.id] || 0}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {filteredTopics.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50"
                  >
                    <div className="w-16 h-16 bg-slate-200 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 grayscale opacity-50">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-slate-400 tracking-tight">Eish, no topics found</h3>
                    <p className="text-slate-400 text-sm mt-1 font-bold">Try searching for something else like "Geometry" or "Forces".</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="tutor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900"
            >
              <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 max-w-xs">
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Daily Brain Fuel</span>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${usagePercent > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePercent}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-purple-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  Quiz
                </button>
                <span className="text-[9px] font-black text-slate-500 dark:text-slate-400">{user?.stats.messagesSent}/{user?.stats.dailyLimit}</span>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-10 scroll-smooth">
                {showQuiz && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto mb-6"
                  >
                    <InteractiveQuiz subject={subject} grade={grade} onClose={() => setShowQuiz(false)} />
                  </motion.div>
                )}
                <div className="max-w-3xl mx-auto space-y-8">
                  {messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest ml-4"
                    >
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span>{t.thinking}</span>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <footer className="bg-white dark:bg-slate-800 border-t border-slate-50 dark:border-slate-700 p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                    {["Another example", "Practice question", "Explain simply", "How many marks?"].map((action, i) => (
                      <motion.button 
                        key={action}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        disabled={isLimitReached} 
                        onClick={() => action === "Practice question" ? setShowQuiz(true) : handleSend(action)} 
                        className="whitespace-nowrap px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-green-600 hover:text-white transition-all disabled:opacity-30"
                      >
                        {action}
                      </motion.button>
                    ))}
                  </div>

                  {selectedImage && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-green-500 shadow-lg mb-2"
                    >
                      <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-3">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLimitReached}
                      className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-100 transition-all disabled:opacity-30"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </button>
                    <div className="relative flex-1">
                      <textarea rows={1} disabled={isLimitReached} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); const val = (e.target as HTMLTextAreaElement).value; if (val.trim() || selectedImage) { handleSend(val || "Explain this image"); (e.target as HTMLTextAreaElement).value = ''; } } }} placeholder={isLimitReached ? t.limit_reached : t.ask_anything} className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent dark:border-slate-800 rounded-2xl px-6 py-4 pr-12 focus:bg-white dark:focus:bg-slate-800 focus:border-green-500 outline-none font-bold text-slate-800 dark:text-white transition-all resize-none shadow-sm placeholder:text-slate-400" />
                      <button onClick={(e) => { const t = e.currentTarget.parentElement?.querySelector('textarea') as HTMLTextAreaElement; if (t.value.trim() || selectedImage) { handleSend(t.value || "Explain this image"); t.value = ''; } }} className="absolute right-2 top-2 p-3 bg-green-600 text-white rounded-xl shadow-lg shadow-green-100 dark:shadow-none">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                      </button>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => isVoiceActive ? stopVoice() : startVoice()} 
                      className={`p-4 rounded-xl transition-all ${isVoiceActive ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'}`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                    </motion.button>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};