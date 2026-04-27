import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Subject } from '../types.ts';
import { CAREER_DATA, Career } from '../data/careers.ts';

interface CareerExplorerProps {
  user: User;
  onClose: () => void;
  currentAps: number;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({ user, onClose, currentAps }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCareers = useMemo(() => {
    return CAREER_DATA.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }).sort((a, b) => {
        // Boost careers where the user meets the APS
        const aMet = currentAps >= a.minAps ? 1 : 0;
        const bMet = currentAps >= b.minAps ? 1 : 0;
        return bMet - aMet;
    });
  }, [searchTerm, currentAps]);

  return (
    <div className="fixed inset-0 z-[110] flex bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-4xl mx-auto my-auto p-4 md:p-8">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-black hover:text-white transition-colors z-10 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col min-h-[80vh]">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-10 text-white">
            <h2 className="text-4xl font-black tracking-tight">Career Explorer</h2>
            <p className="text-indigo-100 mt-2 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Personalized for {user.name} • Your APS: <span className="bg-white/20 px-2 py-0.5 rounded-lg">{currentAps}</span>
            </p>
          </div>

          <div className="p-8 flex-1 overflow-y-auto">
            <div className="mb-8">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search careers (e.g. Engineer, Doctor, Lawyer)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-700 shadow-sm"
                />
                <svg className="w-6 h-6 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCareers.map((career, i) => {
                const meetsAps = currentAps >= career.minAps;
                return (
                  <motion.div 
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-6 rounded-3xl border-2 transition-all hover:shadow-xl group ${
                      meetsAps ? 'border-green-100 bg-green-50/30' : 'border-slate-100 bg-white opacity-80'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-2xl ${meetsAps ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                          meetsAps ? 'bg-green-500 text-white' : 'bg-slate-800 text-white'
                        }`}>
                          {meetsAps ? 'MATCH FOUND' : `APS ${career.minAps} REQ`}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{career.name}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed line-clamp-2">{career.description}</p>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {career.requiredSubjects.map(s => (
                        <span key={s} className="text-[9px] font-black px-2 py-1 bg-white border border-slate-100 rounded-lg text-slate-600 uppercase tracking-widest">{s}</span>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Est. Salary</span>
                        <span className="text-xs font-black text-slate-700">{career.salaryExpectation}</span>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        View Paths
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
