import React, { useState, useEffect, useRef } from 'react';
import { Grade, Subject, Message, AppView, WhatsAppSync, User, LearningSession } from './types.ts';
import { TutorService } from './services/geminiService.ts';
import { SubjectPicker } from './components/SubjectPicker.tsx';
import { StudyPage } from './components/StudyPage.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { SessionConfirmation } from './components/SessionConfirmation.tsx';
import { UpgradeScreen } from './components/UpgradeScreen.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
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
  const [view, setView] = useState<AppView>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [activeSession, setActiveSession] = useState<LearningSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [systemUsers, setSystemUsers] = useState<User[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const tutorRef = useRef<TutorService | null>(null);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = snapshot.docs.map(doc => doc.data() as User);
      setSystemUsers(usersList);
    }, (error) => {
      console.error("Firestore snapshot error:", error);
    });
    return () => unsubscribe();
  }, []);

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
              setUser({ ...userData, stats: { ...userData.stats, messagesSent: 0, lastActive: new Date().toISOString() }});
            } else {
              setUser(userData);
            }
            
            if (userData.role === 'admin' && view === 'auth') setView('admin');
            else if (view === 'auth') setView('picker');
          } else {
            console.warn("User doc not found. This is expected during new registration.");
          }
        } else {
          setUser(null);
          setView('auth');
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

  const deleteUser = async (userId: string) => {
    if (confirm("Delete this learner permanently?")) await deleteDoc(doc(db, "users", userId));
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
      await createSession({
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
    tutorRef.current = new TutorService();
    try {
      const welcome = await tutorRef.current.startChat(activeSession.grade, activeSession.subject);
      setMessages([{ role: 'model', content: welcome }]);
    } catch (error) {
      setMessages([{ role: 'model', content: "Eish, connection slow. Try again." }]);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !tutorRef.current || !user) return;
    if (user.plan === 'free' && user.stats.messagesSent >= user.stats.dailyLimit) {
      setView('upgrade');
      return;
    }

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      const stream = tutorRef.current.sendMessageStream(text);
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
      await updateDoc(doc(db, "users", user.id), { "stats.messagesSent": newCount });
      setUser({ ...user, stats: { ...user.stats, messagesSent: newCount } });

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Eish, try again." }]);
    } finally { setIsTyping(false); }
  };

  if (isInitializing) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-20 h-20 bg-green-600 rounded-[2rem] flex items-center justify-center text-white mb-6 animate-pulse-soft shadow-xl shadow-green-100">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h2 className="text-xl font-black text-slate-900 tracking-tight">Mzansi Tutor</h2>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Special welcome to our Grade 10s! 🇿🇦</p>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 italic">Connecting to Knowledge Hub...</p>
      <div className="mt-8 animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 opacity-20"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-green-100 overflow-x-hidden">
      {view === 'auth' && <div className="min-h-screen flex items-center justify-center p-4"><LoginScreen onLogin={handleLogin} /></div>}
      {view === 'admin' && <AdminDashboard users={systemUsers} onUpdateUser={saveUser} onDeleteUser={deleteUser} onBack={() => setView('picker')} />}
      {view === 'picker' && (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
          <div className="w-full">
            <div className="max-w-xl mx-auto flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-3">
                <button onClick={() => user?.role === 'admin' && setView('admin')} className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-green-600 font-black border border-slate-100 uppercase">{user?.name.charAt(0)}</button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{user?.name}</span>
                  {user?.plan === 'pro' && <span className="text-[7px] font-black text-yellow-600 uppercase tracking-widest bg-yellow-50 px-1 rounded inline-block w-fit">PRO LEARNER</span>}
                </div>
              </div>
              <button onClick={handleLogout} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">Logout</button>
            </div>
            <SubjectPicker onSelect={handleSelect} initialGrade={activeSession?.grade} initialSubject={activeSession?.subject} />
          </div>
        </div>
      )}
      {view === 'confirmation' && activeSession && <div className="min-h-screen flex items-center justify-center p-4"><SessionConfirmation grade={activeSession.grade} subject={activeSession.subject} waSync={{ enabled: activeSession.whatsappSync, phoneNumber: activeSession.phoneNumber || '' }} onConfirm={handleConfirm} onCancel={() => setView('picker')} /></div>}
      {view === 'upgrade' && user && <div className="min-h-screen flex items-center justify-center p-4"><UpgradeScreen user={user} onBack={() => setView('picker')} onUpgrade={() => { saveUser({...user, plan: 'pro', stats: {...user.stats, dailyLimit: 9999}}); setView('picker'); }} /></div>}
      {view === 'study' && activeSession && <StudyPage grade={activeSession.grade} subject={activeSession.subject} messages={messages} isTyping={isTyping} onSendMessage={handleSendMessage} onBack={() => setView('picker')} whatsappSync={{ enabled: activeSession.whatsappSync, phoneNumber: activeSession.phoneNumber || '' }} user={user} />}
    </div>
  );
};

export default App;