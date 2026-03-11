import React, { useState } from 'react';
import { User } from '../types.ts';
import { Button } from './Button.tsx';
import { 
  auth, 
  db,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  doc, 
  setDoc, 
  getDoc 
} from '../services/firebase.ts';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

type AuthMode = 'login' | 'signup';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid South African email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (mode === 'signup' && !name) {
      setError("Please tell us your name so we can personalize your session.");
      return;
    }

    setIsLoading(true);
    
    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        
        await updateProfile(fbUser, { displayName: name });

        const newUser: User = {
          id: fbUser.uid,
          name: name,
          email: email,
          role: 'student',
          joinedAt: new Date().toISOString(),
          plan: 'free',
          stats: {
            messagesSent: 0,
            dailyLimit: 25,
            streakDays: 1,
            lastActive: new Date().toISOString()
          }
        };

        try {
          await setDoc(doc(db, "users", fbUser.uid), newUser);
        } catch (dbErr) {
          console.error("Failed to create user doc:", dbErr);
          await fbUser.delete();
          setError("Registration failed. Please try again.");
          setIsLoading(false);
          return;
        }
        
        onLogin(newUser);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        
        const userDoc = await getDoc(doc(db, "users", fbUser.uid));
        if (userDoc.exists()) {
          onLogin(userDoc.data() as User);
        } else {
          const fallbackUser: User = {
            id: fbUser.uid,
            name: fbUser.displayName || email.split('@')[0],
            email: email,
            role: 'student',
            joinedAt: new Date().toISOString(),
            plan: 'free',
            stats: { messagesSent: 0, dailyLimit: 25, streakDays: 1, lastActive: new Date().toISOString() }
          };
          await setDoc(doc(db, "users", fbUser.uid), fallbackUser);
          onLogin(fallbackUser);
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError("Account already exists. Try logging in.");
      else if (err.code === 'auth/invalid-credential') setError("Incorrect email or password.");
      else if (err.code === 'auth/invalid-email') setError("Invalid email address.");
      else if (err.code === 'auth/weak-password') setError("Password should be at least 6 characters.");
      else if (err.code === 'auth/user-not-found') setError("No account found with this email.");
      else if (err.code) setError(`Error: ${err.code}`);
      else setError("Connection error. Please check your internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-10 animate-in fade-in zoom-in duration-700">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-green-200 rotate-2 hover:rotate-0 transition-transform cursor-pointer">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Mzansi <span className="text-green-600">Tutor</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Your CAPS Study Buddy 🇿🇦</p>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
          <button onClick={() => setMode('signup')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400'}`}>Create Account</button>
          <button onClick={() => setMode('login')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400'}`}>Log In</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sipho Mthembu" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-500 transition-all font-bold text-slate-800 placeholder:text-slate-300" />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sipho@example.co.za" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-500 transition-all font-bold text-slate-800 placeholder:text-slate-300" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-500 transition-all font-bold text-slate-800 placeholder:text-slate-300" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-600 transition-colors">
                {showPassword ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543-7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-widest">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </div>
          )}
          
          <Button type="submit" disabled={isLoading} className="w-full py-5 rounded-[1.5rem] text-lg font-black shadow-lg shadow-green-100 active:scale-95 transition-transform">
            {isLoading ? "Processing..." : mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </Button>
        </form>
      </div>

      <p className="mt-8 text-center text-slate-400 text-xs font-medium px-4">
        {mode === 'signup' ? "Already sharpening your skills? " : "New to the Mzansi family? "}
        <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')} className="text-green-600 font-black hover:underline underline-offset-4">
          {mode === 'signup' ? 'Log in here' : 'Sign up for free'}
        </button>
      </p>
    </div>
  );
};