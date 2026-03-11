import React from 'react';
import { Button } from './Button.tsx';
import { User } from '../types.ts';

interface UpgradeScreenProps {
  user: User;
  onBack: () => void;
  onUpgrade: () => void;
}

export const UpgradeScreen: React.FC<UpgradeScreenProps> = ({ user, onBack, onUpgrade }) => {
  return (
    <div className="max-w-md w-full mx-auto animate-in fade-in zoom-in duration-500">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500"></div>

        <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-yellow-100">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 11-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Limit Reached!</h2>
        <p className="text-slate-500 font-medium mb-8">
          You've used all <span className="text-slate-900 font-black">{user.stats.dailyLimit}</span> messages for today. 🇿🇦
        </p>

        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-8 text-left space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Sharp Learner Pro includes:</h3>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm font-bold text-slate-700">Unlimited AI Tutor messages</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm font-bold text-slate-700">Instant WhatsApp Resource Sync</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm font-bold text-slate-700">Priority help for Trial & Final Exams</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={onUpgrade}
            className="w-full py-5 rounded-2xl text-lg font-black bg-gradient-to-r from-green-600 to-green-500 shadow-xl shadow-green-100 transition-transform active:scale-95"
          >
            Go Pro for R49 / month
          </Button>
          
          <button 
            onClick={onBack}
            className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
          >
            Wait until tomorrow
          </button>
        </div>
      </div>
    </div>
  );
};