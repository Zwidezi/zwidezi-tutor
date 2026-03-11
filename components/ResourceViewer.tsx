import React from 'react';
import { Resource } from '../types.ts';

interface ResourceViewerProps {
    resource: Resource | null;
    onClose: () => void;
}

export const ResourceViewer: React.FC<ResourceViewerProps> = ({ resource, onClose }) => {
    if (!resource) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300">
            <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-black tracking-tight line-clamp-1">{resource.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-bold text-slate-400">PDF • {resource.fileSize} • {resource.year}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-800 text-white rounded-xl hover:bg-green-600 transition-colors hidden sm:flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span className="text-xs font-bold font-bold">Download</span>
                    </a>
                    {resource.memoUrl && (
                        <a href={resource.memoUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-800 text-white rounded-xl hover:bg-blue-600 transition-colors hidden sm:flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-xs font-bold font-bold">View Memo</span>
                        </a>
                    )}
                    <button onClick={onClose} className="p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </header>

            <div className="flex-1 w-full bg-slate-800 overflow-hidden relative">
                <iframe
                    src={`${resource.url}#toolbar=0`}
                    className="w-full h-full border-none"
                    title={resource.title}
                />

                {/* Mobile quick actions that hover over iframe */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex sm:hidden gap-3 px-4 py-3 bg-slate-900/90 rounded-2xl backdrop-blur-md shadow-2xl border border-slate-700">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 text-white rounded-xl hover:bg-green-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                    {resource.memoUrl && (
                        <a href={resource.memoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 text-white rounded-xl hover:bg-blue-600 transition-colors">
                            <span className="text-xs font-bold">Memo</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
