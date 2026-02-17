import React, { useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Donation: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const waveUrl = "https://pay.wave.com/m/M_ci_BzrF5N5Dmt4d/c/ci/";
    const bmcUrl = "https://buymeacoffee.com/princekouame";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex items-center justify-center p-4 sm:p-6">
            {/* Background elements for a premium feel */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12 lg:p-16">

                {/* Header Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Retour</span>
                </Link>

                {/* Intro Text */}
                <div className="mb-12">
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                        <span className="font-bold text-slate-900 dark:text-white">225 Open Source</span> est un projet de cœur.
                        Votre contribution, même symbolique, nous aide à propulser l'écosystème tech ivoirien.
                    </p>
                </div>

                {/* Donation Cards Container */}
                <div className="space-y-6">

                    {/* Wave CI card */}
                    <div className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-emerald-500/30">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800">
                                <img src="/Services/wave.jpg" alt="Wave" className="w-14 h-14 object-contain" />
                            </div>
                            <div>
                                <p className="text-slate-400 dark:text-slate-500 text-sm mb-1 font-medium">Paiement sécurisé</p>
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Wave CI</h3>
                            </div>
                        </div>

                        <a
                            href={waveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto px-10 py-4 bg-[#009669] hover:bg-[#057a57] text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 text-center transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            Soutenir via Wave
                        </a>
                    </div>

                    {/* Buy Me A Coffee card */}
                    <div className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-yellow-500/30">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="w-20 h-20 bg-[#FFDD00] rounded-2xl flex items-center justify-center flex-shrink-0">
                                <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="BMC" className="w-10 h-10" />
                            </div>
                            <div>
                                <p className="text-slate-400 dark:text-slate-500 text-sm mb-1 font-medium">Ou nous offrir un café</p>
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Buy Me A Coffee</h3>
                            </div>
                        </div>

                        <a
                            href={bmcUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto px-10 py-4 bg-[#FFDD00] hover:bg-[#F2D200] text-black font-bold rounded-2xl shadow-lg shadow-yellow-500/10 text-center transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            Soutenir via BMC
                        </a>
                    </div>

                </div>

                {/* Footer Disclaimer */}
                <div className="mt-12">
                    <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                        * Chaque don nous permet de maintenir la gratuité pour tous.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Donation;

