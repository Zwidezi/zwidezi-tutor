import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Book, FileText, Video, ArrowLeft, Download, ExternalLink, GraduationCap } from 'lucide-react';
import { Resource, Grade, Subject } from '../types.ts';
import { CURRICULUM_DATA } from '../data/curriculum.ts';

interface ResourceLibraryProps {
  onBack: () => void;
  onViewResource: (resource: Resource) => void;
}

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ onBack, onViewResource }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'All'>('All');
  const [selectedType, setSelectedType] = useState<'All' | 'Paper' | 'Note' | 'Video'>('All');

  // Flatten all resources from the curriculum data
  const allResources: (Resource & { grade: string, subject: string, type: 'Paper' | 'Note' | 'Video' })[] = [];

  Object.entries(CURRICULUM_DATA).forEach(([grade, subjects]) => {
    Object.entries(subjects).forEach(([subject, topics]) => {
      topics.forEach(topic => {
        topic.resources.pastPapers.forEach(r => allResources.push({ ...r, grade, subject, type: 'Paper' }));
        topic.resources.studyNotes.forEach(r => allResources.push({ ...r, grade, subject, type: 'Note' }));
        topic.resources.videoTutorials.forEach(r => allResources.push({ ...r, grade, subject, type: 'Video' }));
      });
    });
  });

  // Filter logic
  const filteredResources = allResources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || r.grade === selectedGrade;
    const matchesType = selectedType === 'All' || r.type === selectedType;
    return matchesSearch && matchesGrade && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 font-sans selection:bg-green-100 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-6 py-8 sticky top-0 z-30 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-slate-400 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Resource Library</h1>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Access {allResources.length}+ CAPS Materials</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600" />
            <input 
              type="text" 
              placeholder="Search by subject or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:bg-white dark:focus:bg-slate-800 focus:border-green-500 outline-none font-bold text-slate-800 dark:text-white transition-all shadow-sm placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="max-w-7xl mx-auto mt-6 flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
            {['All', '10', '11', '12'].map(g => (
              <button 
                key={g}
                onClick={() => setSelectedGrade(g as any)}
                className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest ${selectedGrade === g ? 'bg-white dark:bg-slate-800 text-green-700 dark:text-green-400 shadow-sm' : 'text-slate-400 dark:text-slate-500'}`}
              >
                Grade {g}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block" />

          <div className="flex gap-2">
            {['All', 'Paper', 'Note', 'Video'].map(t => (
              <button 
                key={t}
                onClick={() => setSelectedType(t as any)}
                className={`px-4 py-2 text-[10px] font-black rounded-xl border transition-all uppercase tracking-widest ${selectedType === t ? 'bg-green-600 border-green-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-green-200 dark:hover:border-green-800'}`}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((r, i) => (
                <motion.div
                  key={`${r.id}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110 ${
                    r.type === 'Paper' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                    r.type === 'Note' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                  }`}>
                    {r.type === 'Paper' ? <FileText className="w-6 h-6" /> : 
                     r.type === 'Note' ? <Book className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase rounded-md tracking-tighter">Grade {r.grade}</span>
                      <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-[8px] font-black text-green-600 dark:text-green-400 uppercase rounded-md tracking-tighter">{r.subject}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">{r.title}</h3>
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-50 dark:border-slate-700">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{r.year || 'CAPS 2024'}</span>
                      <button 
                        onClick={() => onViewResource(r)}
                        className="p-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Visual Background Element */}
                  <div className="absolute -bottom-4 -right-4 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-0 text-slate-900 dark:text-white">
                    <GraduationCap className="w-32 h-32" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-40 bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[3rem]">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 dark:text-slate-700">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-400 dark:text-slate-500">Eish, nothing found</h3>
            <p className="text-slate-400 dark:text-slate-500 font-bold mt-2">Try searching for "Maths" or "Grade 12".</p>
          </div>
        )}
      </main>
    </div>
  );
};
