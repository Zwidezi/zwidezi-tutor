import React from 'react';
import { Grade, Subject, WhatsAppSync } from '../types.ts';
import { Button } from './Button.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface SubjectPickerProps {
  onSelect: (grade: Grade, subject: Subject, waSync: WhatsAppSync) => void;
  initialGrade?: Grade | null;
  initialSubject?: Subject | null;
  initialWaSync?: WhatsAppSync;
}

const GRADES: Grade[] = ['10', '11', '12'];
const SUBJECTS: Subject[] = [
  'Mathematics',
  'Mathematical Literacy',
  'Physical Sciences',
  'Life Sciences',
  'Accounting',
  'Geography',
  'English',
  'Afrikaans',
  'Economics',
  'Business Studies',
  'History',
  'Information Technology'
];

/**
 * Normalizes South African phone numbers to 27XXXXXXXXX format.
 */
export const normalizeSAPhone = (input: string): string => {
  let digits = input.replace(/\D/g, ''); // Remove +, spaces, -, etc.
  if (digits.startsWith('0')) {
    return '27' + digits.substring(1);
  }
  // If it already starts with 27 and is 11 digits, return as is
  return digits;
};

export const SubjectPicker: React.FC<SubjectPickerProps> = ({
  onSelect,
  initialGrade,
  initialSubject,
  initialWaSync
}) => {
  const [selectedGrade, setSelectedGrade] = React.useState<Grade | null>(initialGrade || null);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(initialSubject || null);
  const [waEnabled, setWaEnabled] = React.useState<boolean>(initialWaSync?.enabled ?? true);
  const [phoneNumber, setPhoneNumber] = React.useState(initialWaSync?.phoneNumber || '');
  const [showError, setShowError] = React.useState(false);

  const normalized = normalizeSAPhone(phoneNumber);

  const isGradeSelected = !!selectedGrade;
  const isSubjectSelected = !!selectedSubject;
  const isPhoneValid = normalized.length >= 11;

  const isFormComplete = isGradeSelected && isSubjectSelected && isPhoneValid;

  const handleSubmit = () => {
    if (!isGradeSelected || !isSubjectSelected || !phoneNumber.trim()) {
      setShowError(true);
      return;
    }

    onSelect(selectedGrade!, selectedSubject!, {
      enabled: waEnabled,
      phoneNumber: normalized
    });
  };

  return (
    <motion.div 
      className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 transition-colors duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-center mb-8">
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </motion.div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
          Sharp <span className="text-green-600 dark:text-green-400">Learner!</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium italic">
          Select your CAPS details to start smashing your exams.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-4 text-center uppercase tracking-[0.2em]">
            1. Select Grade {selectedGrade && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-600 dark:text-green-400 ml-1">✓</motion.span>}
          </label>
          <div className="flex justify-center gap-4">
            {GRADES.map((grade, i) => (
              <motion.button
                key={grade}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGrade(grade)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all border-2 ${selectedGrade === grade
                    ? 'bg-green-600 border-green-600 text-white shadow-lg ring-4 ring-green-50 dark:ring-green-900/20'
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-green-200 dark:hover:border-green-800 hover:text-green-600 dark:hover:text-green-400'
                  }`}
              >
                {grade}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-4 text-center uppercase tracking-[0.2em]">
            2. Choose Subject {selectedSubject && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-600 dark:text-green-400 ml-1">✓</motion.span>}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {SUBJECTS.map((subject, i) => (
              <motion.button
                key={subject}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.05) }}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedSubject(subject)}
                className={`p-4 rounded-2xl text-sm font-bold transition-all border-2 text-left flex items-center justify-between ${selectedSubject === subject
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-green-200 dark:hover:border-green-800'
                  }`}
              >
                <span>{subject}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`p-6 rounded-[2rem] border transition-all ${waEnabled ? 'border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-900/10' : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${waEnabled ? 'bg-green-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className={`font-black uppercase tracking-widest text-[10px] ${waEnabled ? 'text-green-800 dark:text-green-400' : 'text-slate-400'}`}>WhatsApp Sync</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={waEnabled}
                onChange={(e) => setWaEnabled(e.target.checked)}
              />
              <div className="w-12 h-7 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <AnimatePresence>
            {waEnabled && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2 mt-4">WhatsApp Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 071 234 5678"
                    className={`block w-full bg-white dark:bg-slate-900 border ${showError && !phoneNumber ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white text-sm p-4 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none font-bold transition-all shadow-sm placeholder:text-slate-300 dark:placeholder:text-slate-600`}
                  />
                  {isPhoneValid && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest"
                    >
                      🇿🇦 READY
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {showError && (!isGradeSelected || !isSubjectSelected || !phoneNumber) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1-1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            <span>Missing CAPS Details Above!</span>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          className={`w-full py-5 rounded-[1.5rem] text-lg font-black transition-all duration-300 ${isFormComplete ? 'shadow-xl shadow-green-100 dark:shadow-none scale-105 active:scale-95' : 'opacity-50 grayscale cursor-not-allowed'}`}
          variant="primary"
          disabled={!isFormComplete && phoneNumber.length > 0}
        >
          {waEnabled ? 'Sync & Start Session' : 'Start Study Session'}
        </Button>
      </div>
    </motion.div>
  );
};