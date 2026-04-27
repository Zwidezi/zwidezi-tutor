import React, { useState, useEffect } from 'react';
import { User, LearningSession } from '../types.ts';
import { db, collection, query, where, getDocs, limit, orderBy } from '../services/firebase.ts';
import { Leaderboard } from './Leaderboard.tsx';
import { motion } from 'framer-motion';

interface TeacherDashboardProps {
  user: User;
  onBack: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onBack }) => {
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(
          collection(db, "sessions"),
          where("userId", "==", user.id),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const sessionData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as LearningSession));
        setSessions(sessionData);
      } catch (err) {
        console.error("Error fetching teacher stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  const averageMessages = user.stats.totalMessages / (Math.max(1, user.stats.streakDays));

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-100">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Parent/Teacher Portal</h1>
            <p className="text-slate-500 font-bold mt-1">Monitoring Progress for <span className="text-blue-600">@{user.name}</span></p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Academic Consistency</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900">{user.stats.streakDays}</span>
            <span className="text-sm font-bold text-slate-500 mb-1">Day Streak</span>
          </div>
          <div className="mt-4 h-2 bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[70%]" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Topic Mastery</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900">{user.stats.badges.length}</span>
            <span className="text-sm font-bold text-slate-500 mb-1">Milestones</span>
          </div>
          <div className="mt-4 flex gap-1">
            {user.stats.badges.slice(0, 5).map((_, i) => (
              <div key={i} className="w-6 h-2 bg-green-500 rounded-full" />
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Engagement Level</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900">{averageMessages.toFixed(1)}</span>
            <span className="text-sm font-bold text-slate-500 mb-1">msgs/day</span>
          </div>
          <div className="mt-4 h-2 bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[85%]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Recent Sessions</h2>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            
            <div className="p-6 space-y-6">
              {isLoading ? (
                <div className="py-10 text-center text-slate-400 font-bold italic">Loading student history...</div>
              ) : sessions.length === 0 ? (
                <div className="py-10 text-center text-slate-400 font-bold italic">No sessions recorded yet.</div>
              ) : sessions.map((session, i) => (
                <div key={session.sessionId} className="flex gap-4 relative">
                  {i !== sessions.length - 1 && <div className="absolute left-[11px] top-8 w-0.5 h-12 bg-slate-100" />}
                  <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex-shrink-0 relative z-10" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-black text-slate-800">{session.subject}</h4>
                      <span className="text-[10px] font-bold text-slate-400">{new Date(session.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 mt-1">Grade {session.grade} • {session.sessionStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>

      <div className="mt-10 p-8 bg-blue-600 rounded-[3rem] text-white relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-xl font-black tracking-tight mb-2">Academic Report Ready</h3>
          <p className="text-blue-100 font-medium mb-6 max-w-md">Generate a detailed PDF report of this learner's performance for the current school term.</p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-transform active:scale-95">
            Download Report (PDF)
          </button>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v13a2 2 0 01-2 2zM12 17a3 3 0 100-6 3 3 0 000 6z" /></svg>
        </div>
      </div>
    </div>
  );
};
