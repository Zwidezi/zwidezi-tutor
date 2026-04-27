import React, { useState, useEffect, useRef } from 'react';
import { Grade, Subject, Message, AppView, WhatsAppSync, User, LearningSession, Resource } from './types.ts';
import { TutorService } from './services/geminiService.ts';
import { SubjectPicker } from './components/SubjectPicker.tsx';
import { StudyPage } from './components/StudyPage.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { SessionConfirmation } from './components/SessionConfirmation.tsx';
import { UpgradeScreen } from './components/UpgradeScreen.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { ProfileDashboard } from './components/ProfileDashboard.tsx';
import { ResourceLibrary } from './components/ResourceLibrary.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { TeacherDashboard } from './components/TeacherDashboard.tsx';
import { FullTimetable } from './components/FullTimetable.tsx';
import { TRANSLATIONS, Language } from './data/translations.ts';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  auth,
  db,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
  createSession,
  updateSession,
  saveMessage
} from './services/firebase.ts';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [activeSession, setActiveSession] = useState<LearningSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [systemUsers, setSystemUsers] = useState<User[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');
  const t = TRANSLATIONS[language];
  const tutorRef = useRef<TutorService | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Only subscribe to users collection if the current user is an admin
  // Normal users don't have permission to read the entire users collection
  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = snapshot.docs.map(doc => doc.data() as User);
      setSystemUsers(usersList);
    }, (error) => {
      console.error("Firestore snapshot error:", error);
    });
    return () => unsubscribe();
  }, [user?.role]);

  useEffect(() => {
    // Safety timeout to ensure loading screen doesn't hang indefinitely if Firebase fails
    const timer = setTimeout(() => {
      if (isInitializing) setIsInitializing(false);
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      try {
        if (fbUser) {
          const userDoc = await getDoc(doc(db, "users", fbUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            const today = new Date().toDateString();
            const lastActiveDate = new Date(userData.stats.lastActive).toDateString();

            if (today !== lastActiveDate) {
              await updateDoc(doc(db, "users", fbUser.uid), {
                "stats.messagesSent": 0,
                "stats.lastActive": new Date().toISOString()
              });
              setUser({ ...userData, stats: { ...userData.stats, messagesSent: 0, lastActive: new Date().toISOString() } });
            } else {
              setUser(userData);
            }

            if (userData.role === 'admin' && view === 'auth') setView('admin');
            else if (view === 'auth') setView('picker');

            // Trigger onboarding if never seen before
            const hasSeenOnboarding = localStorage.getItem(`onboarding_${fbUser.uid}`);
            if (!hasSeenOnboarding) {
              setShowOnboarding(true);
            }
          } else {
            console.warn("User doc not found. This is expected during new registration.");
          }
        } else {
          setUser(null);
          // Only redirect to landing if not already on auth/landing
          if (view !== 'auth' && view !== 'landing') setView('landing');
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setView('auth');
      } finally {
        setIsInitializing(false);
        clearTimeout(timer);
      }
    });
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const saveUser = async (updatedUser: User) => {
    setUser(updatedUser);
    await setDoc(doc(db, "users", updatedUser.id), updatedUser);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Delete this learner permanently? This cannot be undone.")) await deleteDoc(doc(db, "users", userId));
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setView(newUser.role === 'admin' ? 'admin' : 'picker');
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setActiveSession(null);
    setView('auth');
  };

  const handleSelect = async (g: Grade, s: Subject, sync: WhatsAppSync) => {
    if (!user) return;
    const sessionId = `sess_${Date.now()}`;
    setActiveSession({
      sessionId, userId: user.id, grade: g, subject: s,
      phoneNumber: sync.phoneNumber, whatsappSync: sync.enabled,
      platform: sync.enabled ? 'whatsapp' : 'app',
      createdAt: new Date().toISOString(), lastMessageAt: new Date().toISOString(),
      sessionStatus: 'started', curriculum: 'CAPS'
    });
    setView('confirmation');
  };

  const handleConfirm = async () => {
    if (!user || !activeSession) return;
    if (user.plan === 'free' && user.stats.messagesSent >= user.stats.dailyLimit) {
      setView('upgrade');
      return;
    }

    try {
      await createSession(activeSession.sessionId, {
        userId: user.id,
        grade: activeSession.grade,
        subject: activeSession.subject,
        phoneNumber: activeSession.phoneNumber,
        whatsappSync: activeSession.whatsappSync,
        platform: activeSession.platform,
        curriculum: 'CAPS',
        sessionStatus: 'active'
      });
    } catch (err) {
      console.error("Failed to create session:", err);
    }

    setView('study');
    toast.success("Study session started!");
    tutorRef.current = new TutorService();
    try {
      const welcome = await tutorRef.current.startChat(activeSession.grade, activeSession.subject);
      setMessages([{ role: 'model', content: welcome }]);
    } catch (error) {
      setMessages([{ role: 'model', content: "Eish, connection slow. Try again." }]);
    }
  };

  const handleSendMessage = async (text: string, image?: string) => {
    if (!text.trim() || !tutorRef.current || !user) return;
    if (user.plan === 'free' && user.stats.messagesSent >= user.stats.dailyLimit) {
      setView('upgrade');
      return;
    }

    const userMessage: Message = { role: 'user', content: text, image };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      const stream = tutorRef.current.sendMessageStream(text, image);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: 'model', content: fullResponse };
          return next;
        });
      }

      // Save messages to Firestore
      try {
        await saveMessage(activeSession!.sessionId, userMessage);
        await saveMessage(activeSession!.sessionId, { role: 'model', content: fullResponse });
        await updateSession(activeSession!.sessionId, {
          lastMessage: fullResponse.substring(0, 100),
          messageCount: user.stats.messagesSent + 1
        });
      } catch (dbErr) {
        console.error("Failed to save message:", dbErr);
      }

      const newCount = user.stats.messagesSent + 1;
      const newTotal = (user.stats.totalMessages || 0) + 1;
      
      const updateData: any = { 
        "stats.messagesSent": newCount,
        "stats.totalMessages": newTotal
      };

      // Award badge if it's their 10th message
      if (newTotal === 10) {
        const updatedBadges = [...(user.stats.badges || []), "Conversation Starter"];
        updateData["stats.badges"] = updatedBadges;
        toast.success("Badge Unlocked: Conversation Starter! 🏆", { icon: '👏' });
      }

      await updateDoc(doc(db, "users", user.id), updateData);
      setUser({ 
        ...user, 
        stats: { 
          ...user.stats, 
          messagesSent: newCount, 
          totalMessages: newTotal,
          badges: updateData["stats.badges"] || user.stats.badges
        } 
      });

    } catch (error) {
      toast.error("Eish, connection issue.");
      setMessages(prev => [...prev, { role: 'model', content: "Eish, try again." }]);
    } finally { setIsTyping(false); }
  };

  const handleUpdateMastery = async (topicId: string, percentage: number) => {
    if (!user) return;
    try {
      const currentMastery = user.stats.mastery?.[topicId] || 0;
      if (percentage <= currentMastery) return;
      const newMastery = { ...(user.stats.mastery || {}), [topicId]: percentage };
      await updateDoc(doc(db, "users", user.id), { "stats.mastery": newMastery });
      setUser({ ...user, stats: { ...user.stats, mastery: newMastery } });
      if (percentage === 100) toast.success("Topic Mastered! 🎓", { icon: '🏆' });
    } catch (err) { console.error("Failed to update mastery:", err); }
  };

  if (isInitializing) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-20 h-20 bg-green-600 rounded-[2rem] flex items-center justify-center text-white mb-6 animate-pulse-soft shadow-xl shadow-green-100">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h2 className="text-xl font-black text-slate-900 tracking-tight">Mzansi Tutor</h2>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Your CAPS Study Buddy 🇿🇦</p>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 italic">Connecting to Knowledge Hub...</p>
      <div className="mt-8 animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 opacity-20"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-green-100 overflow-x-hidden">
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#fff', color: '#0f172a', fontWeight: '900', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '1rem', border: '1px solid #f1f5f9' } }} />
      
      {view === 'landing' && <LandingPage onStart={() => setView('auth')} />}
      {view === 'auth' && <div className="min-h-screen flex items-center justify-center p-4"><LoginScreen onLogin={handleLogin} /></div>}
      {view === 'admin' && <AdminDashboard users={systemUsers} onUpdateUser={saveUser} onDeleteUser={handleDeleteUser} onBack={() => setView('picker')} />}
      {view === 'picker' && (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
          <div className="w-full">
            <div className="max-w-xl mx-auto flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setView('profile')} className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-green-600 font-black border border-slate-100 uppercase transition-all hover:scale-110 active:scale-95">{user?.name.charAt(0)}</button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{user?.name}</span>
                  {user?.plan === 'pro' && <span className="text-[7px] font-black text-yellow-600 uppercase tracking-widest bg-yellow-50 px-1 rounded inline-block w-fit">PRO LEARNER</span>}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-green-600 transition-all">
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  )}
                </button>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-2 py-1 text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 outline-none cursor-pointer"
                >
                  <option value="en">EN</option>
                  <option value="zu">ZU</option>
                  <option value="af">AF</option>
                </select>
                <button onClick={() => setView('library')} className="text-[9px] font-black text-green-600 uppercase tracking-widest hover:opacity-70">{t.library}</button>
                <button onClick={() => setView('teacher')} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:opacity-70">{t.parent_portal}</button>
                {user?.role === 'admin' && <button onClick={() => setView('admin')} className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:opacity-70">Admin</button>}
                <button onClick={handleLogout} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">{t.logout}</button>
              </div>
            </div>
            <SubjectPicker onSelect={handleSelect} initialGrade={activeSession?.grade} initialSubject={activeSession?.subject} />
          </div>
        </div>
      )}
      {view === 'library' && (
        <ResourceLibrary 
          onBack={() => setView('picker')} 
          onViewResource={(resource: Resource) => {
            // If it's a paper, we could potentially set up a session or just view it.
            // For now, let's just toast that it's selected.
            toast.success(`Opening ${resource.title}`);
            if (resource.type === 'Paper') {
              // Logic to view paper could go here
            } else if (resource.url) {
              window.open(resource.url, '_blank');
            }
          }} 
        />
      )}
      {view === 'confirmation' && activeSession && <div className="min-h-screen flex items-center justify-center p-4"><SessionConfirmation grade={activeSession.grade} subject={activeSession.subject} waSync={{ enabled: activeSession.whatsappSync, phoneNumber: activeSession.phoneNumber || '' }} onConfirm={handleConfirm} onCancel={() => setView('picker')} /></div>}
      {view === 'upgrade' && user && <div className="min-h-screen flex items-center justify-center p-4"><UpgradeScreen user={user} onBack={() => setView('picker')} onUpgrade={() => { window.open('https://wa.me/27000000000?text=' + encodeURIComponent(`Hi! I'd like to upgrade to Mzansi Tutor Pro.\nName: ${user.name}\nEmail: ${user.email}`), '_blank'); }} /></div>}
      {view === 'study' && activeSession && <StudyPage grade={activeSession.grade} subject={activeSession.subject} messages={messages} isTyping={isTyping} onSendMessage={handleSendMessage} onBack={() => setView('picker')} whatsappSync={{ enabled: activeSession.whatsappSync, phoneNumber: activeSession.phoneNumber || '' }} user={user} language={language} onUpdateMastery={handleUpdateMastery} />}
      {view === 'profile' && user && <ProfileDashboard user={user} onBack={() => setView('picker')} />}
      {view === 'teacher' && user && <TeacherDashboard user={user} onBack={() => setView('picker')} />}
      {view === 'timetable' && <FullTimetable onBack={() => setView('picker')} />}

      {/* Mobile Bottom Navigation */}
      {user && !['landing', 'auth', 'study', 'confirmation'].includes(view) && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-[100] md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          {[
            { id: 'picker', label: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
            { id: 'timetable', label: 'Exams', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
            { id: 'library', label: 'Library', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
            { id: 'profile', label: 'Profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setView(item.id as AppView)}
              className={`flex flex-col items-center gap-1.5 transition-all ${view === item.id ? 'text-green-600 scale-110' : 'text-slate-400'}`}
            >
              {item.icon}
              <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
      )}

      <AnimatePresence>
        {showOnboarding && user && (
          <OnboardingModal 
            onComplete={() => {
              setShowOnboarding(false);
              localStorage.setItem(`onboarding_${user.id}`, 'true');
              toast.success("Ready to go! Have a great study session.");
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;