import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingModalProps {
  onComplete: () => void;
}

const STEPS = [
  {
    title: "Welcome to Mzansi Tutor!",
    description: "Your ultimate CAPS companion for Grades 10-12. Let's get you ready for your next distinction.",
    icon: (
      <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      </div>
    )
  },
  {
    title: "The Study Hub",
    description: "Find past papers, study notes, and video tutorials for every topic in your subject. All CAPS aligned.",
    icon: (
      <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
      </div>
    )
  },
  {
    title: "AI Personal Tutor",
    description: "Stuck on a problem? Ask our AI Tutor anything. It speaks your language and explains concepts simply.",
    icon: (
      <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center text-purple-600">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
      </div>
    )
  },
  {
    title: "WhatsApp Sync",
    description: "Get summaries and quick quizzes sent straight to your WhatsApp for studying on the go.",
    icon: (
      <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600">
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </div>
    )
  }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden"
      >
        <div className="p-10 text-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <div className="mb-8">{STEPS[currentStep].icon}</div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">{STEPS[currentStep].title}</h2>
              <p className="text-slate-500 font-medium leading-relaxed">{STEPS[currentStep].description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-col gap-4">
            <button 
              onClick={nextStep}
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-green-100 hover:bg-green-700 transition-all"
            >
              {currentStep === STEPS.length - 1 ? "Let's Start!" : "Next Step"}
            </button>
            <div className="flex justify-center gap-2">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-8 bg-green-600' : 'w-2 bg-slate-200'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
