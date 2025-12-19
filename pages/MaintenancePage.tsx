import React from 'react';
import { Hammer, Clock, Mail, ChevronRight } from 'lucide-react';

const MaintenancePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
                {/* Icon */}
                <div className="relative inline-flex mb-4 group">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all duration-500"></div>
                    <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-800">
                        <Hammer className="w-12 h-12 text-emerald-600 dark:text-emerald-500 animate-pulse" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>Bientôt disponible</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Nous construisons quelque chose d'<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400">incroyable</span>.
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                        La plateforme est actuellement en maintenance pendant que nous apportons les dernières touches.
                        Nous serons de retour en ligne très bientôt avec une expérience améliorée.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                        href="mailto:hello@princekouame.com"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-95 shadow-lg shadow-slate-900/10 dark:shadow-none"
                    >
                        <Mail className="w-5 h-5" />
                        Contacter le support
                    </a>

                    <button
                        disabled
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-not-allowed opacity-80"
                    >
                        Vérifier le statut
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 w-full text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    &copy; {new Date().getFullYear()} 225 Open Source. Tous droits réservés.
                </p>
            </div>
        </div>
    );
};

export default MaintenancePage;
