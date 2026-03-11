import React, { useState, useMemo } from 'react';
import { Subject } from '../types.ts';
import { ApsMark, Degree, DREAM_DEGREES, calculateBaseAps, calculateTotalAps } from '../data/apsData.ts';

interface ApsCalculatorProps {
    onClose: () => void;
}

const DEFAULT_SUBJECTS: { name: string, isLO: boolean }[] = [
    { name: 'Home Language', isLO: false },
    { name: 'First Additional Language', isLO: false },
    { name: 'Mathematics / Math Lit', isLO: false },
    { name: 'Life Orientation', isLO: true },
    { name: 'Subject 5', isLO: false },
    { name: 'Subject 6', isLO: false },
    { name: 'Subject 7', isLO: false },
];

export const ApsCalculator: React.FC<ApsCalculatorProps> = ({ onClose }) => {
    const [marks, setMarks] = useState<ApsMark[]>(
        DEFAULT_SUBJECTS.map(s => ({ subject: s.name, percentage: 0, isLifeOrientation: s.isLO }))
    );

    const [selectedDegreeId, setSelectedDegreeId] = useState<string | null>(null);

    const selectedDegree = useMemo(() =>
        DREAM_DEGREES.find(d => d.id === selectedDegreeId) || null
        , [selectedDegreeId]);

    const totalApsExcludingLO = useMemo(() => calculateTotalAps(marks, true), [marks]);
    const totalApsIncludingLO = useMemo(() => calculateTotalAps(marks, false), [marks]);

    const handlePercentageChange = (index: number, value: string) => {
        const numValue = Math.min(100, Math.max(0, Number(value) || 0));
        setMarks(prev => {
            const newMarks = [...prev];
            newMarks[index].percentage = numValue;
            return newMarks;
        });
    };

    const handleSubjectNameChange = (index: number, value: string) => {
        setMarks(prev => {
            const newMarks = [...prev];
            newMarks[index].subject = value;
            return newMarks;
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
            <div className="relative w-full max-w-5xl mx-auto my-auto p-4 md:p-8">

                <button onClick={onClose} className="absolute top-6 right-6 lg:-right-12 p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-black hover:text-white transition-colors z-10 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">

                    {/* Left Column: Input Panel */}
                    <div className="flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">APS Calculator</h2>
                            <p className="text-sm font-bold text-slate-500 mt-2">Enter your latest report marks to see where you stand.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-3 px-3">
                                <div className="col-span-12 sm:col-span-7 text-xs font-black text-slate-400 uppercase tracking-widest">Subject</div>
                                <div className="col-span-6 sm:col-span-3 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Score (%)</div>
                                <div className="col-span-6 sm:col-span-2 text-xs font-black text-slate-400 uppercase tracking-widest text-center">APS</div>
                            </div>

                            {marks.map((mark, idx) => (
                                <div key={idx} className={`grid grid-cols-12 gap-3 items-center p-3 rounded-xl border ${mark.isLifeOrientation ? 'bg-purple-50/50 border-purple-100' : 'bg-white border-slate-200'} shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100`}>
                                    <div className="col-span-12 sm:col-span-7">
                                        <input
                                            type="text"
                                            value={mark.subject}
                                            onChange={(e) => handleSubjectNameChange(idx, e.target.value)}
                                            disabled={['Home Language', 'First Additional Language', 'Mathematics / Math Lit', 'Life Orientation'].includes(mark.subject)}
                                            className="w-full text-sm font-bold text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 p-0 disabled:opacity-70 disabled:cursor-not-allowed"
                                            placeholder={`Subject ${idx + 1}`}
                                        />
                                        {mark.isLifeOrientation && <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest mt-1 block">Usually excluded from APS</span>}
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0" max="100"
                                                value={mark.percentage || ''}
                                                onChange={(e) => handlePercentageChange(idx, e.target.value)}
                                                className="w-full text-center text-lg font-black text-slate-800 bg-slate-100 rounded-lg p-2 focus:bg-blue-50 focus:outline-none focus:ring-0 border-none"
                                                placeholder="0"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-2 text-center flex flex-col items-center justify-center">
                                        <span className={`text-xl font-black ${mark.isLifeOrientation ? 'text-purple-400' : 'text-blue-600'}`}>{calculateBaseAps(mark.percentage)}</span>
                                        <span className="text-[10px] font-bold text-slate-400">PTS</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Results & Goal Tracker */}
                    <div className="w-full md:w-[400px] bg-slate-900 p-6 md:p-10 flex flex-col relative overflow-hidden">

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 flex-1">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Your Score</h3>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-6xl font-black text-white tracking-tighter">{totalApsExcludingLO}</span>
                                <span className="text-lg font-bold text-slate-400">APS</span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 mb-10">Excluding Life Orientation • {totalApsIncludingLO} incl. LO</p>

                            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8 backdrop-blur-sm">
                                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Set a Goal: Dream Degree</h4>
                                <select
                                    value={selectedDegreeId || ''}
                                    onChange={(e) => setSelectedDegreeId(e.target.value)}
                                    className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 font-bold text-sm focus:outline-none focus:border-blue-500 mb-4"
                                >
                                    <option value="">-- Choose a Degree to Aim For --</option>
                                    {DREAM_DEGREES.map(deg => (
                                        <option key={deg.id} value={deg.id}>{deg.name} @ {deg.university.split(' (')[0]}</option>
                                    ))}
                                </select>

                                {selectedDegree && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-slate-400">Required APS</span>
                                            <span className="text-lg font-black text-white">{selectedDegree.requiredAps}</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden mb-4 relative">
                                            <div
                                                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2
                          ${totalApsExcludingLO >= selectedDegree.requiredAps ? 'bg-green-500' : 'bg-blue-500'}`}
                                                style={{ width: `${Math.min(100, (totalApsExcludingLO / selectedDegree.requiredAps) * 100)}%` }}
                                            >
                                                {/* Optional tiny sparkle or indicator here */}
                                            </div>
                                        </div>

                                        {totalApsExcludingLO >= selectedDegree.requiredAps ? (
                                            <div className="flex items-start gap-3 text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <p className="text-xs font-bold">You are currently meeting the minimum APS requirement! Keep it up!</p>
                                            </div>
                                        ) : (
                                            <div className="flex items-start gap-3 text-amber-400 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                                                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <p className="text-xs font-bold">You need {selectedDegree.requiredAps - totalApsExcludingLO} more points to reach the minimum APS for this degree.</p>
                                            </div>
                                        )}

                                        <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-bold">
                                            <span className="text-white block mb-1">About this degree:</span>
                                            {selectedDegree.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 relative overflow-hidden group hover:bg-blue-500/20 transition-colors cursor-pointer">
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-black text-blue-400">Need to boost your points?</h4>
                                        <p className="text-xs font-bold text-blue-200/60 mt-1">Talk to the AI Tutor to build a study plan.</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
