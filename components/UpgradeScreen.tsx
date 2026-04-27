import React from 'react';
import { Button } from './Button.tsx';
import { User } from '../types.ts';
import { initiatePayFastPayment } from '../services/paymentService.ts';

interface UpgradeScreenProps {
  user: User;
  onBack: () => void;
  onUpgrade: () => void;
}

export const UpgradeScreen: React.FC<UpgradeScreenProps> = ({ user, onBack, onUpgrade }) => {
  const handlePayFast = () => {
    initiatePayFastPayment({
      name_first: user.name.split(' ')[0],
      name_last: user.name.split(' ')[1] || '',
      email_address: user.email,
      amount: '49.00',
      item_name: 'Mzansi Tutor Pro Monthly Subscription'
    });
  };

  return (
    <div className="max-w-md w-full mx-auto animate-in fade-in zoom-in duration-500">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700 text-center relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500"></div>

        <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-yellow-100">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 11-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Daily Limit Reached!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
          You've used all <span className="text-slate-900 dark:text-white font-black">{user.stats.dailyLimit}</span> messages for today. 🇿🇦
        </p>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 mb-8 text-left space-y-4 transition-colors">
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Sharp Learner Pro includes:</h3>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Unlimited AI Tutor messages</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Instant WhatsApp Resource Sync</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Priority help for Trial & Final Exams</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handlePayFast}
            className="w-full py-5 rounded-2xl text-lg font-black bg-gradient-to-r from-blue-600 to-blue-500 shadow-xl shadow-blue-100 dark:shadow-none transition-transform active:scale-95"
          >
            Pay with PayFast (R49)
          </Button>

          <Button 
            onClick={onUpgrade}
            className="w-full py-4 rounded-2xl text-sm font-black bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-transform active:scale-95"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat to Upgrade
            </div>
          </Button>
          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 italic uppercase tracking-widest">Activated within minutes</p>
          
          <button 
            onClick={onBack}
            className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] hover:text-slate-600 dark:hover:text-slate-300 transition-colors pt-4"
          >
            Wait until tomorrow
          </button>
        </div>
      </div>
    </div>
  );
};