import React, { useState } from 'react';
import { Grade, Subject } from '../types.ts';
import { ATPData, getATPForSubject, getCurrentTerm, getCurrentWeekNumber } from '../data/atp.ts';
import { CURRICULUM_DATA } from '../data/curriculum.ts';

interface SyllabusNavigatorProps {
  grade: Grade;
  subject: Subject;
}

export const SyllabusNavigator: React.FC<SyllabusNavigatorProps> = ({ grade, subject }) => {
  const [selectedTerm, setSelectedTerm] = useState<number>(getCurrentTerm());
  const [expandedWeek, setExpandedWeek] = useState<number | null>(getCurrentWeekNumber());
  
  const atpData = getATPForSubject(grade, subject);
  
  if (!atpData) {
    return (
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h3 className="text-white font-black text-lg tracking-tight flex items-center gap-2">
            <span className="text-xl">📅</span> ATP Tracker
          </h3>
          <p className="text-blue-100 text-[10px] font-bold mt-1">Your weekly teaching plan based on CAPS</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-slate-500">ATP data coming soon for Grade {grade} {subject}!</p>
        </div>
      </div>
    );
  }

  const termData = selectedTerm === 1 ? atpData.term1 : selectedTerm === 2 ? atpData.term2 : selectedTerm === 3 ? atpData.term3 : atpData.term4;

  const getTopicsForWeek = (weekTopics: string[]) => {
    const allTopics = CURRICULUM_DATA[grade]?.[subject] || [];
    const matchingTopics = allTopics.filter(t => 
      weekTopics.some(wt => t.title.toLowerCase().includes(wt.toLowerCase()))
    );
    return matchingTopics;
  };

  const isThisWeek = (week: number) => {
    const currentWeek = getCurrentWeekNumber();
    const currentTerm = getCurrentTerm();
    return selectedTerm === currentTerm && week === currentWeek;
  };

  const getAssessmentColor = (assessment: string) => {
    if (assessment.includes('Exam')) return 'bg-red-100 text-red-700';
    if (assessment.includes('Test')) return 'bg-yellow-100 text-yellow-700';
    if (assessment.includes('Task')) return 'bg-purple-100 text-purple-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h3 className="text-white font-black text-lg tracking-tight flex items-center gap-2">
          <span className="text-xl">📅</span> ATP Tracker
        </h3>
        <p className="text-blue-100 text-[10px] font-bold mt-1">What you should be learning this week</p>
      </div>

      <div className="flex border-b border-slate-100">
        {[1, 2, 3, 4].map(term => (
          <button
            key={term}
            onClick={() => { setSelectedTerm(term); setExpandedWeek(null); }}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedTerm === term 
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            Term {term}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
        {termData.map((week) => {
          const isExpanded = expandedWeek === week.week;
          const isCurrent = isThisWeek(week.week);
          const weekTopics = getTopicsForWeek(week.topics);

          return (
            <div 
              key={week.week}
              className={`rounded-xl overflow-hidden border transition-all ${
                isCurrent ? 'border-blue-300 bg-blue-50' : 'border-slate-100 bg-white'
              }`}
            >
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                className="w-full text-left p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                    isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {week.week}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {week.topics[0]}
                      {week.topics.length > 1 && <span className="text-slate-400"> +more</span>}
                    </p>
                    {isCurrent && (
                      <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest bg-blue-100 px-2 py-0.5 rounded-full">
                        THIS WEEK
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-2 py-1 rounded-full ${getAssessmentColor(week.assessment)}`}>
                    {week.assessment}
                  </span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Topics Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {week.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {weekTopics.length > 0 && (
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Related Study Materials</p>
                      <div className="space-y-2">
                        {weekTopics.slice(0, 3).map(topic => (
                          <div key={topic.id} className="p-3 bg-green-50 rounded-xl border border-green-100">
                            <p className="text-xs font-bold text-green-800">{topic.title}</p>
                            <p className="text-[9px] text-green-600 mt-1 line-clamp-2">{topic.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 bg-slate-50 p-2 rounded-lg">
                    <span>💡</span>
                    <span>Tip: Focus on this week's topics for maximum exam prep!</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
          <span>Week {getCurrentWeekNumber()} of {getCurrentTerm() === selectedTerm ? 'this term' : `Term ${getCurrentTerm()}`}</span>
          <span className="text-blue-600">CAPS Aligned</span>
        </div>
      </div>
    </div>
  );
};
