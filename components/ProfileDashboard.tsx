import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, MessageSquare, Calendar, Zap, ArrowLeft, Star, TrendingUp, Trophy } from 'lucide-react';
import { User as UserType } from '../types.ts';

interface ProfileDashboardProps {
  user: UserType;
  onBack: () => void;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ user, onBack }) => {
  const stats = [
    { label: 'Total Messages', value: user.stats.totalMessages || 0, icon: <MessageSquare className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Study Streak', value: `${user.stats.streakDays} Days`, icon: <Zap className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
    { label: 'Member Since', value: new Date(user.joinedAt).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' }), icon: <Calendar className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    { label: 'Knowledge Points', value: (user.stats.totalMessages || 0) * 10, icon: <Star className="w-5 h-5" />, color: 'bg-green-50 text-green-600' }
  ];

  const badges = user.stats.badges || ['Early Adopter', 'Fast Starter'];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 p-6 md:p-12 font-sans selection:bg-green-100 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-100 dark:hover:border-green-900 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-sm font-black text-slate-900 dark:text-white leading-none">{user.name}</h2>
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{user.plan} account</span>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100 dark:shadow-none uppercase">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-10 md:p-16 text-white mb-12 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Learner Progress</span>
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Your Academic Journey.</h1>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-10">
                You've sent {user.stats.totalMessages || 0} messages to your tutor. Keep going, the NSC exams are coming!
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-black">
                      {i === 4 ? '+12' : <Award className="w-4 h-4" />}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Achievements Unlocked</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-700" />
                  <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - (user.stats.messagesSent / user.stats.dailyLimit))} strokeLinecap="round" className="text-green-500 transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black tracking-tighter">{Math.round((user.stats.messagesSent / user.stats.dailyLimit) * 100)}%</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Daily Goal</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Trophy className="w-64 h-64" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 ${s.color} dark:bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                {s.icon}
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{s.value}</div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              Unlocked Badges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center group hover:border-green-200 dark:hover:border-green-800 transition-colors">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">{badge}</span>
                </div>
              ))}
              <div className="p-6 bg-slate-100/50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center opacity-50">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                </div>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">More Soon</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Latest Insights
            </h3>
            <div className="space-y-4">
              {[
                { title: "Maths Mastery", text: "You spend 60% of your time on Mathematics. Good progress!", color: "border-blue-200 dark:border-blue-900" },
                { title: "Consistency", text: "You've studied 3 days in a row. Keep it up!", color: "border-green-200 dark:border-green-900" }
              ].map((insight, i) => (
                <div key={i} className={`p-6 bg-white dark:bg-slate-800 rounded-[2rem] border-l-4 ${insight.color} shadow-sm transition-colors`}>
                  <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">{insight.title}</h4>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
