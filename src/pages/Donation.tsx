import React, { useEffect } from 'react';

const Donation: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const geniusUrl = "https://geniuspay.ci/product/soutenir-225-open-source-ULtWJC";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex items-center justify-center p-4 sm:p-6">
            {/* Background elements for a premium feel */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12 lg:p-16">

                {/* Intro Text */}
                <div className="mb-12">
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                        <span className="font-bold text-slate-900 dark:text-white">225 Open Source</span> est un projet de cœur.
                        Votre contribution, même symbolique, nous aide à propulser l'écosystème tech ivoirien.
                    </p>
                </div>

                {/* Single Payment Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-all hover:border-emerald-500/30">
                    <div className="flex flex-col items-center gap-8">
                        {/* Payment Icons */}
                        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                <img src="/paiement/mtn.png" alt="MTN" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                <img src="/paiement/orange.png" alt="Orange" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                <img src="/paiement/moov.png" alt="Moov" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                <img src="/paiement/visa.webp" alt="Visa" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                <img src="/paiement/wave.jpg" alt="Wave" className="w-10 h-10 object-contain" />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <p className="text-slate-400 dark:text-slate-500 text-sm mb-1 font-medium">Paiement sécurisé</p>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Mobile Money &amp; Carte Bancaire</h3>
                        </div>

                        {/* Button */}
                        <a
                            href={geniusUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto px-12 py-4 bg-[#009669] hover:bg-[#057a57] text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 text-center transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
                        >
                            Je soutiens 225OS
                        </a>
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-12">
                    <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                        * Chaque don nous permet de couvrir les frais de fonctionnement de la plateforme.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Donation;
