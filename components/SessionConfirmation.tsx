import React from 'react';
import { Grade, Subject, WhatsAppSync } from '../types.ts';
import { Button } from './Button.tsx';

interface SessionConfirmationProps {
  grade: Grade;
  subject: Subject;
  waSync: WhatsAppSync;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SessionConfirmation: React.FC<SessionConfirmationProps> = ({
  grade,
  subject,
  waSync,
  onConfirm,
  onCancel
}) => {
  const displayPhone = waSync.phoneNumber.startsWith('27') 
    ? `+${waSync.phoneNumber}` 
    : waSync.phoneNumber;

  return (
    <div className="max-w-md w-full mx-auto animate-in fade-in zoom-in duration-500">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-green-100">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Ready to Start?</h2>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Confirm your session details</p>

        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade</span>
            <span className="font-black text-slate-800 text-lg">{grade}</span>
          </div>
          
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</span>
            <span className="font-black text-slate-800 text-lg">{subject}</span>
          </div>

          {waSync.enabled ? (
            <div className="p-6 bg-green-50 rounded-[2rem] border border-green-100 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-green-600 text-white rounded-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">WhatsApp Sync On</span>
              </div>
              <p className="text-green-800 font-black text-xl">{displayPhone}</p>
              <p className="text-[9px] text-green-600/70 font-bold uppercase tracking-wider mt-2 italic">We will open WhatsApp for you</p>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-left opacity-60">
              <div className="flex items-center gap-3 mb-1">
                 <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Sync Disabled</span>
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider italic">Session will continue in-app only</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Button 
            onClick={onConfirm}
            className="w-full py-5 rounded-2xl text-lg font-black shadow-xl shadow-green-100 scale-105"
          >
            {waSync.enabled ? 'Continue to WhatsApp' : 'Start My Session'}
          </Button>
          
          <button 
            onClick={onCancel}
            className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-slate-500 transition-colors"
          >
            Cancel and Go Back
          </button>
        </div>
      </div>
    </div>
  );
};