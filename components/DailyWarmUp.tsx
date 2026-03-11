import React, { useState } from 'react';
import { Grade, Subject } from '../types.ts';
import { QuestionOfTheDay, FormulaFlashcard, WordOfTheDay, getDailyQuestion, getDailyFormula, getDailyWord } from '../data/dailyWarmUp.ts';

interface DailyWarmUpProps {
  grade: Grade;
  subject: Subject;
}

export const DailyWarmUp: React.FC<DailyWarmUpProps> = ({ grade, subject }) => {
  const [selectedTab, setSelectedTab] = useState<'question' | 'formula' | 'word'>('question');
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = getDailyQuestion(subject, grade);
  const formula = getDailyFormula(subject, grade);
  const word = getDailyWord(subject);

  const handleOptionClick = (idx: number) => {
    setSelectedOption(idx);
    setShowAnswer(true);
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setShowAnswer(false);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
        <h3 className="text-white font-black text-lg tracking-tight flex items-center gap-2">
          <span className="text-xl">🧠</span> Daily Warm-Up
        </h3>
        <p className="text-green-100 text-[10px] font-bold mt-1">Jumpstart your brain for exam success!</p>
      </div>

      <div className="flex border-b border-slate-100">
        {[
          { id: 'question' as const, label: 'Question', emoji: '❓' },
          { id: 'formula' as const, label: 'Formula', emoji: '📐' },
          { id: 'word' as const, label: 'Word', emoji: '📝' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setSelectedTab(tab.id); resetQuiz(); }}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedTab === tab.id 
                ? 'bg-green-50 text-green-700 border-b-2 border-green-600' 
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {selectedTab === 'question' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {question.subject} • Grade {question.grade}
              </span>
              <span className="bg-green-100 text-green-700 text-[8px] font-black px-2 py-1 rounded-full">
                {question.marks} MARK{question.marks > 1 ? 'S' : ''}
              </span>
            </div>
            
            <p className="text-sm font-bold text-slate-800 leading-relaxed">{question.question}</p>
            
            <div className="space-y-2">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all ${
                    selectedOption === null
                      ? 'bg-slate-50 hover:bg-green-50 border border-slate-100 hover:border-green-300'
                      : idx === question.correctAnswer
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : selectedOption === idx
                          ? 'bg-red-50 border-2 border-red-300 text-red-800'
                          : 'bg-slate-50 border border-slate-100 opacity-50'
                  }`}
                >
                  <span className="font-black mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {showAnswer && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Explanation</p>
                <p className="text-xs font-medium text-slate-700">{question.explanation}</p>
              </div>
            )}

            <button
              onClick={resetQuiz}
              className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-green-600 transition-colors"
            >
              ← Try Another Question
            </button>
          </div>
        )}

        {selectedTab === 'formula' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {formula.subject} • Grade {formula.grade}
              </span>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <p className="text-green-400 text-[9px] font-black uppercase tracking-widest mb-3">{formula.name}</p>
              <p className="text-white text-xl font-mono font-bold tracking-wider">{formula.formula}</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">When to use</p>
              <p className="text-xs font-medium text-slate-700">{formula.whenToUse}</p>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 p-3 rounded-xl">
              <span>💡</span>
              <span>Pro tip: Memorise this formula - it appears almost every exam!</span>
            </div>
          </div>
        )}

        {selectedTab === 'word' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Academic Vocabulary
              </span>
              <span className="bg-purple-100 text-purple-700 text-[8px] font-black px-2 py-1 rounded-full">
                NSC EXAM TERM
              </span>
            </div>

            <div className="text-center py-4">
              <p className="text-3xl font-black text-slate-800 tracking-tight">{word.word}</p>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-2">{word.subject}</p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Definition</p>
                <p className="text-xs font-medium text-slate-700">{word.definition}</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Example in Exam Context</p>
                <p className="text-xs font-medium text-slate-700 italic">"{word.example}"</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 p-3 rounded-xl">
              <span>📚</span>
              <span>Know this word - examiners use it in essay questions!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
