import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Download } from 'lucide-react';
import { EXAM_TIMETABLE } from '../data/timetable.ts';

interface FullTimetableProps {
  onBack: () => void;
}

export const FullTimetable: React.FC<FullTimetableProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 p-6 md:p-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-green-600 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-right">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Exam Timetable</h2>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">NSC October/November 2024</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-10 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-2">Final Roadmap.</h1>
              <p className="text-slate-400 font-medium text-sm">Every minute counts. Plan your revision accordingly.</p>
            </div>
            <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
              <Download className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {EXAM_TIMETABLE.map((exam, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center shadow-sm">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{exam.date.split(' ')[1]}</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{exam.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight">{exam.subject}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{exam.paper} • NSC Standard</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-black">{exam.time}</span>
                    </div>
                    <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-green-100 dark:border-green-900/30">
                      90 Days Left
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-amber-50 dark:bg-amber-900/20 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/30 flex items-start gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl shrink-0">
             <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-900 dark:text-amber-200 uppercase tracking-widest mb-1">Exam Reminder</h4>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 leading-relaxed">
              These dates are based on the National Senior Certificate (NSC) 2024 Preliminary Timetable. Please verify with your school's official notice board.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
