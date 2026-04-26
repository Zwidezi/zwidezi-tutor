import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Message } from '../types.ts';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';
  const [isFlagged, setIsFlagged] = useState(false);
  
  const handleShare = () => {
    const text = `Check out this CAPS explanation from Mzansi Tutor:\n\n${message.content}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Sanitize HTML to prevent XSS from AI-generated content
  const sanitize = (html: string) => DOMPurify.sanitize(html, { ALLOWED_TAGS: ['strong', 'em', 'span', 'br'], ALLOWED_ATTR: ['class'] });

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      let formattedLine = line.replace(/\[(\d+)\]/g, '<span class="inline-flex items-center justify-center bg-green-100 text-green-800 text-[10px] font-black px-1.5 py-0.5 rounded ml-1">[$1 MARKS]</span>');
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      if (formattedLine.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-black mt-6 mb-3 text-slate-900 border-l-4 border-green-500 pl-4">{formattedLine.replace('### ', '')}</h3>;
      }
      
      if (formattedLine.trim().startsWith('- ') || formattedLine.trim().startsWith('* ')) {
        return (
          <li key={i} className="ml-6 list-disc mb-2 text-slate-700 font-medium" 
              dangerouslySetInnerHTML={{ __html: sanitize(formattedLine.replace(/^[-*]\s/, '')) }} />
        );
      }

      if (formattedLine.includes('=') && formattedLine.length > 3) {
        return (
          <div key={i} className="my-2 p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono text-sm overflow-x-auto whitespace-pre-wrap"
               dangerouslySetInnerHTML={{ __html: sanitize(formattedLine) }} />
        );
      }

      if (!formattedLine.trim()) return <div key={i} className="h-3" />;

      return <p key={i} className="mb-3 leading-relaxed text-slate-700 font-medium" dangerouslySetInnerHTML={{ __html: sanitize(formattedLine) }} />;
    });
  };

  return (
    <div className={`flex w-full mb-8 ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`group relative max-w-[90%] md:max-w-[80%] rounded-3xl px-6 py-5 shadow-sm transition-all hover:shadow-md ${
        isModel 
          ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none' 
          : 'bg-green-600 text-white rounded-tr-none'
      }`}>
        <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isModel ? 'text-green-600' : 'text-green-100'}`}>
            {isModel ? '🇿🇦 Mzansi Tutor' : '🙋 Learner'}
          </span>
          {isModel && (
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsFlagged(!isFlagged)}
                className={`p-1.5 rounded-lg transition-all ${isFlagged ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100'}`}
                title="Report inaccuracy"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </button>
              <button 
                onClick={handleShare}
                className="p-1.5 text-slate-300 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-green-50 rounded-lg"
                title="Share to WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="text-sm md:text-base">
          {formatContent(message.content)}
        </div>
        {isFlagged && (
          <div className="mt-4 p-2 bg-red-50 rounded-lg text-[10px] font-bold text-red-600 flex items-center gap-2 animate-pulse">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            This response has been flagged for curriculum review.
          </div>
        )}
      </div>
    </div>
  );
};