import React from 'react';
import { Resource } from '../types.ts';

interface VideoPlayerProps {
    video: Resource | null;
    onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
    if (!video) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-4xl bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800 flex flex-col relative animate-in zoom-in-95 duration-500">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="relative pt-[56.25%] bg-slate-900">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`${video.url}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <div className="p-6 bg-slate-900 border-t border-slate-800">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight">{video.title}</h2>
                            <p className="text-slate-400 text-sm mt-2 leading-relaxed max-w-2xl">{video.description}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest mt-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                            YouTube
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
