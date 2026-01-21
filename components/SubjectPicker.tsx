
import React from 'react';
import { Grade, Subject, WhatsAppSync } from '../types';
import { Button } from './Button';

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
  'Geography'
];

export const SubjectPicker: React.FC<SubjectPickerProps> = ({ 
  onSelect, 
  initialGrade, 
  initialSubject, 
  initialWaSync 
}) => {
  const [selectedGrade, setSelectedGrade] = React.useState<Grade | null>(initialGrade || null);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(initialSubject || null);
  const [waEnabled, setWaEnabled] = React.useState(initialWaSync?.enabled || false);
  const [phoneNumber, setPhoneNumber] = React.useState(initialWaSync?.phoneNumber || '');

  const handleSubmit = () => {
    if (selectedGrade && selectedSubject) {
      onSelect(selectedGrade, selectedSubject, {
        enabled: waEnabled,
        phoneNumber: phoneNumber.trim()
      });
    }
  };

  const isValid = selectedGrade && selectedSubject && (!waEnabled || (phoneNumber.length >= 9));

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
          Sharp <span className="text-green-600">Learner!</span>
        </h1>
        <p className="text-slate-500 font-medium">Ready for your Grade {selectedGrade || '...'} {selectedSubject || '...'} session?</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-4 text-center uppercase tracking-[0.2em]">Select Grade</label>
          <div className="flex justify-center gap-4">
            {GRADES.map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all border-2 ${
                  selectedGrade === grade 
                    ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-200 scale-110' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-green-200 hover:text-green-600'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-4 text-center uppercase tracking-[0.2em]">Select Subject</label>
          <div className="grid grid-cols-2 gap-3">
            {SUBJECTS.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`p-4 rounded-2xl text-sm font-bold transition-all border-2 text-left flex items-center justify-between ${
                  selectedSubject === subject 
                    ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-green-200 hover:bg-green-50/30'
                }`}
              >
                <span>{subject}</span>
                {selectedSubject === subject && (
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-[2rem] border transition-all ${waEnabled ? 'border-green-200 bg-green-50/50' : 'border-slate-100 bg-slate-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${waEnabled ? 'bg-green-200 text-green-700' : 'bg-slate-200 text-slate-400'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className={`font-bold ${waEnabled ? 'text-green-800' : 'text-slate-400'}`}>WhatsApp Sync</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={waEnabled}
                onChange={(e) => setWaEnabled(e.target.checked)}
              />
              <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          {waEnabled ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <p className="text-xs text-green-700 font-medium leading-relaxed">We'll send your CAPS materials directly to your WhatsApp for offline study. Sharp!</p>
              <div className="flex shadow-sm">
                <span className="inline-flex items-center px-4 text-sm text-slate-700 bg-white border border-r-0 border-green-200 rounded-l-2xl font-black">
                  +27
                </span>
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="82 123 4567" 
                  className="block flex-1 min-w-0 w-full bg-white border border-green-200 text-slate-900 text-sm p-4 rounded-r-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none font-bold"
                />
              </div>
            </div>
          ) : (
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Materials will be viewable in-app only.</p>
          )}
        </div>

        <Button 
          disabled={!isValid} 
          onClick={handleSubmit}
          className="w-full py-5 rounded-[1.5rem] text-lg font-black tracking-tight"
          variant="primary"
        >
          {waEnabled ? 'Sync & Start Session' : 'Start Study Session'}
        </Button>
      </div>
    </div>
  );
};
