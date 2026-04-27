import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Target, TrendingUp, Users } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  grade: string;
  rank: number;
  avatar?: string;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', name: 'Thabo M.', points: 12500, grade: '12', rank: 1 },
  { id: '2', name: 'Lindiwe S.', points: 11200, grade: '12', rank: 2 },
  { id: '3', name: 'Pieter v. d. M.', points: 9800, grade: '11', rank: 3 },
  { id: '4', name: 'Ayanda K.', points: 8900, grade: '12', rank: 4 },
  { id: '5', name: 'Sarah J.', points: 7500, grade: '10', rank: 5 },
];

export const Leaderboard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Trophy className="w-6 h-6 text-amber-500" />
            Top Learners
          </h2>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Mzansi-wide Ranking 🇿🇦</p>
        </div>
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          Week 14
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {MOCK_LEADERBOARD.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                idx === 0 ? 'bg-amber-50/50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900' : 'bg-white dark:bg-slate-800 border-slate-50 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                  idx === 0 ? 'bg-amber-500 text-white' : 
                  idx === 1 ? 'bg-slate-400 text-white' : 
                  idx === 2 ? 'bg-amber-700 text-white' : 'text-slate-400'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{entry.name}</h4>
                  <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Grade {entry.grade}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-green-600 dark:text-green-400">{entry.points.toLocaleString()}</div>
                <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Study Points</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-black tracking-tight mb-2">Climb the Ranks!</h3>
            <p className="text-xs opacity-60 font-medium mb-4">Complete daily warm-ups and tutorials to earn points and win monthly prizes.</p>
            <button className="w-full py-3 bg-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-colors">
              How to earn points
            </button>
          </div>
          <Target className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
        </div>
      </div>
    </div>
  );
};
