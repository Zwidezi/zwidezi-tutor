import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Calendar, Users, GraduationCap, ArrowLeft, Heart } from 'lucide-react';
import { BURSARY_DATA, Bursary } from '../data/bursaries.ts';

interface BursaryHubProps {
  onClose: () => void;
}

export const BursaryHub: React.FC<BursaryHubProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = BURSARY_DATA.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </button>
          <div className="text-right">
            <h2 className="text-2xl font-black text-white tracking-tighter">Bursary Hub</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Fund your future</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-12 text-white mb-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Financial Support for Your Studies.</h1>
            <p className="text-indigo-100 font-medium text-lg mb-10 leading-relaxed">
              We've curated the most reliable bursaries and funding opportunities for South African students. Apply early and secure your education.
            </p>
            <div className="relative">
              <input 
                type="text"
                placeholder="Search bursaries or fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border-2 border-white/20 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:text-slate-900 focus:outline-none transition-all font-bold text-white placeholder:text-white/60"
              />
              <Search className="w-6 h-6 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <GraduationCap className="w-64 h-64" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((b, i) => (
            <motion.div 
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.07] transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  b.category === 'STEM' ? 'bg-blue-500/20 text-blue-400' :
                  b.category === 'Finance' ? 'bg-green-500/20 text-green-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {b.category}
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  <Calendar className="w-3 h-3" />
                  Due {b.deadline}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">{b.name}</h3>
              <p className="text-sm font-bold text-slate-400 mb-6">{b.provider}</p>

              <div className="space-y-3 mb-8">
                {b.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs font-medium text-slate-300">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
                    {req}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                   <Users className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Apply Online</span>
                </div>
                <a 
                  href={b.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-lg shadow-white/5"
                >
                  Visit Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Helping you reach the finish line</p>
        </div>
      </div>
    </div>
  );
};
