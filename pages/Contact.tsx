import React, { useEffect } from 'react';
import { Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-12 px-4 font-sans">
      
      <div className="max-w-xl w-full mx-auto mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center pb-20">
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-[2rem] p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 text-emerald-600 dark:text-emerald-400 shadow-inner rotate-3">
                <MessageSquare size={36} />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-10 leading-relaxed text-lg">
                Have a suggestion, a partnership idea, or just want to talk? <br className="hidden sm:block"/>
                We are always open to discussing how to move the Ivorian tech ecosystem forward.
            </p>

            <a 
                href="mailto:hello@princekouame.com"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
                <Mail size={22} />
                <span>hello@princekouame.com</span>
            </a>

            <p className="mt-10 text-sm text-slate-400">
                We usually respond within 24-48 hours.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;