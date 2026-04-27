import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, MessageSquare, Award, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-green-100 overflow-x-hidden transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100 dark:shadow-none">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Mzansi Tutor</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-green-600 dark:hover:text-green-400 transition-colors">Features</a>
            <button 
              onClick={onStart}
              className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-green-100 dark:shadow-none hover:bg-green-700 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
          <button onClick={onStart} className="md:hidden p-2 text-slate-600 dark:text-slate-400">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-green-100 dark:border-green-900/30">
              🇿🇦 South Africa's #1 AI Study Buddy
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
              Master the <span className="text-green-600 dark:text-green-400">CAPS</span> <br /> 
              Curriculum for <span className="text-indigo-600">Free.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
              Get full access to personalized tutoring, past papers, and study guides. 
              Open to all South African learners—no subscription needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-10 py-5 bg-green-600 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-xl shadow-green-100 dark:shadow-none hover:bg-green-700 transition-all hover:-translate-y-1 active:translate-y-0"
              >
                Start Studying Free
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-lg font-black uppercase tracking-widest hover:border-green-600 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 transition-all">
                View Past Papers
              </button>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-8 opacity-40 dark:opacity-20 grayscale dark:invert"
          >
            <span className="font-black text-2xl tracking-tighter">NSC ALIGNED</span>
            <span className="font-black text-2xl tracking-tighter">UMALUSI READY</span>
            <span className="font-black text-2xl tracking-tighter">IEB COMPATIBLE</span>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-green-100/50 dark:bg-green-900/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Built for Sharp Learners</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Everything you need to ace your finals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Instant Tutoring",
                desc: "Confused about a topic? Ask Mzansi AI and get clear, CAPS-aligned explanations in seconds.",
                color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "WhatsApp Sync",
                desc: "Study on the move! Sync your sessions to WhatsApp and keep learning without using much data.",
                color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Vision AI Tutor",
                desc: "Snap a photo of your homework or a diagram. Our AI analyzes the image to give you step-by-step guidance instantly.",
                color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-white dark:bg-slate-800 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700 transition-colors"
              >
                <div className={`w-16 h-16 ${f.color} rounded-3xl flex items-center justify-center mb-8 shadow-sm`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-green-600 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Mobile Learning</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 mb-8 leading-tight">Study on WhatsApp. <br /> Save Data.</h2>
              <p className="text-lg opacity-80 mb-10 font-medium">
                Get study guides, summaries, and quick quizzes directly on your phone. Perfect for studying during travel or when data is low.
              </p>
              <button onClick={onStart} className="px-8 py-4 bg-white text-green-700 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                Try WhatsApp Sync
              </button>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-[500px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-6 bg-slate-800 flex justify-center items-center">
                  <div className="w-16 h-3 bg-slate-700 rounded-full" />
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-green-100 text-green-900 p-3 rounded-2xl rounded-tl-none text-xs font-bold w-4/5">
                    Hi! Can you explain the quadratic formula?
                  </div>
                  <div className="bg-white text-slate-800 p-3 rounded-2xl rounded-tr-none text-xs font-bold w-4/5 ml-auto border border-slate-100">
                    Sure! The quadratic formula is x = [-b ± √(b² - 4ac)] / 2a. It's used to...
                  </div>
                  <div className="bg-green-100 text-green-900 p-3 rounded-2xl rounded-tl-none text-xs font-bold w-4/5">
                    Eish, much clearer now. Thanks!
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorations */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "50k+", label: "Questions Answered" },
            { val: "10k+", label: "Daily Learners" },
            { val: "2000+", label: "Past Papers" },
            { val: "98%", label: "Satisfaction" }
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{s.val}</div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-900 dark:bg-black text-white transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xl font-black tracking-tight">Mzansi Tutor</span>
              </div>
              <p className="text-slate-400 max-w-sm font-medium">
                Empowering the next generation of South African leaders through accessible, high-quality AI education.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li><a href="#" className="hover:text-green-500 transition-colors">Study Material</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Past Papers</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">APS Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <span>© 2024 Mzansi CAPS Tutor. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>Made with ❤️ in South Africa 🇿🇦</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
