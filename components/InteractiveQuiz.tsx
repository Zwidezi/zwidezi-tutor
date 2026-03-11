import React, { useState } from 'react';
import { Grade, Subject } from '../types.ts';
import { Quiz, QuizQuestion, getQuizByTopic, getQuizzesForSubject, getAllQuizTopics } from '../data/quizzes.ts';

interface InteractiveQuizProps {
  subject: Subject;
  grade: Grade;
  onClose?: () => void;
  initialTopic?: string;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ subject, grade, onClose, initialTopic }) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const availableQuizzes = getQuizzesForSubject(subject, grade);

  React.useEffect(() => {
    if (initialTopic && !currentQuiz) {
      const quiz = getQuizByTopic(initialTopic, subject, grade);
      if (quiz) setCurrentQuiz(quiz);
    }
  }, [initialTopic, subject, grade, currentQuiz]);

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setShowHint(false);
  };

  const handleAnswer = (answerIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIdx);
    setShowExplanation(true);
    if (answerIdx === currentQuiz?.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + currentQuiz!.questions[currentQuestionIndex].marks);
    }
  };

  const nextQuestion = () => {
    if (!currentQuiz) return;
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setShowHint(false);
  };

  const getTotalMarks = () => currentQuiz?.questions.reduce((sum, q) => sum + q.marks, 0) || 0;

  if (!currentQuiz) {
    return (
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-black text-lg tracking-tight flex items-center gap-2">
              <span className="text-xl">📝</span> Practice Quiz
            </h3>
            <p className="text-purple-100 text-[10px] font-bold mt-1">Test your knowledge with these NSC-style questions!</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>

        <div className="p-6">
          {availableQuizzes.length > 0 ? (
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Available Quizzes for Grade {grade} {subject}</p>
              {availableQuizzes.map((quiz) => (
                <button
                  key={quiz.id}
                  onClick={() => startQuiz(quiz)}
                  className="w-full text-left p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-purple-700">{quiz.title}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{quiz.questions.length} Questions • {getTotalMarks()} Total Marks</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-slate-500 font-medium">No quizzes available yet for this subject.</p>
              <p className="text-slate-400 text-sm mt-1">We're working on adding more quizzes!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const totalMarks = getTotalMarks();
    const percentage = Math.round((score / totalMarks) * 100);
    const isPassing = percentage >= 50;

    return (
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
        <div className={`px-6 py-8 text-center ${isPassing ? 'bg-green-600' : 'bg-orange-500'}`}>
          <div className="text-5xl mb-4">{isPassing ? '🎉' : '💪'}</div>
          <h3 className="text-white font-black text-2xl tracking-tight">
            {isPassing ? 'Sharp Work!' : 'Keep Practicing!'}
          </h3>
          <p className="text-white/80 font-medium mt-2">
            You scored {score} out of {totalMarks} marks ({percentage}%)
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Performance</div>
            <div className={`text-4xl font-black ${isPassing ? 'text-green-600' : 'text-orange-500'}`}>
              {percentage}%
            </div>
            <p className="text-slate-500 text-sm mt-2">
              {isPassing ? "You're exam-ready for this topic!" : "Review the topics and try again!"}
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={resetQuiz} className="flex-1 py-3 bg-purple-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-purple-700 transition-colors">
              Try Another Quiz
            </button>
            {onClose && (
              <button onClick={onClose} className="px-4 py-3 bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors">
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-black text-lg tracking-tight">{currentQuiz.title}</h3>
          <p className="text-purple-100 text-[10px] font-bold mt-1">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
        </div>
        <div className="text-right">
          <div className="bg-white/20 px-3 py-1 rounded-full">
            <span className="text-white font-black text-sm">{score}</span>
            <span className="text-white/60 text-xs">/{getTotalMarks()}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-purple-100 text-purple-700 text-[8px] font-black px-2 py-1 rounded-full">
            {currentQuestion.marks} MARK{currentQuestion.marks > 1 ? 'S' : ''}
          </span>
          {currentQuestion.hint && !showHint && (
            <button 
              onClick={() => setShowHint(true)}
              className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-purple-600 transition-colors"
            >
              Need a hint? 💡
            </button>
          )}
        </div>

        {showHint && currentQuestion.hint && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
            <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">Hint</p>
            <p className="text-xs font-medium text-slate-700">{currentQuestion.hint}</p>
          </div>
        )}

        <p className="text-sm font-bold text-slate-800 leading-relaxed mb-6">{currentQuestion.question}</p>

        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = idx === currentQuestion.correctAnswer;
            const isSelected = idx === selectedAnswer;
            
            let btnClass = 'bg-slate-50 hover:bg-purple-50 border border-slate-100 hover:border-purple-300';
            if (showExplanation) {
              if (isCorrect) btnClass = 'bg-green-100 border-2 border-green-500 text-green-800';
              else if (isSelected) btnClass = 'bg-red-50 border-2 border-red-300 text-red-800';
              else btnClass = 'bg-slate-50 border border-slate-100 opacity-50';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${btnClass}`}
              >
                <span className="font-black mr-3">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`mt-6 p-4 rounded-xl border ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <><span className="text-green-600">✅</span> Correct!</>
              ) : (
                <><span className="text-red-600">❌</span> Not quite!</>
              )}
            </p>
            <p className="text-xs font-medium text-slate-700">{currentQuestion.explanation}</p>
            {selectedAnswer !== currentQuestion.correctAnswer && (
              <p className="text-[9px] font-black text-red-500 mt-2 uppercase tracking-widest">Tip: Review this concept before the exam!</p>
            )}
          </div>
        )}

        {selectedAnswer !== null && (
          <button 
            onClick={nextQuestion}
            className="w-full mt-6 py-4 bg-purple-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-purple-700 transition-colors"
          >
            {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}

        {onClose && selectedAnswer === null && (
          <button 
            onClick={onClose}
            className="w-full mt-4 py-3 text-slate-400 font-black text-[9px] uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
