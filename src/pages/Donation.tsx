import React, { useEffect } from 'react';
import { Heart, ArrowLeft, Shield, Zap, Users, ArrowRight, ExternalLink, TrendingUp, Globe, Smartphone, QrCode, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
const Donation: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const waveUrl = "https://pay.wave.com/m/M_ci_BzrF5N5Dmt4d/c/ci/";
    const bmcUrl = "https://buymeacoffee.com/princekouame";

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 font-sans overflow-x-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
            <div className="absolute top-20 right-0 w-[600px] h-[400px] bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px] -z-10 opacity-40"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1]">
                        Soutenir <span className="text-transparent bg-clip-text bg-emerald-600">225 Open Source</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        Votre don aide à maintenir la plateforme, nous permettant de continuer à élever l'écosystème tech ivoirien et à présenter nos talents au monde entier.
                    </p>
                </div>

                {/* Main Donation Card */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {/* Wave Donation Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-10 relative overflow-hidden shadow-xl shadow-emerald-500/5 transition-all duration-300 hover:shadow-emerald-500/10 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
                                    <Smartphone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">Local & Instantané</span>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Wave Money</h2>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 w-fit">
                                    <img src="/Services/wave.jpg" alt="Wave Money" className="w-32 h-32 object-contain" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-600 dark:text-slate-300 font-light mb-4">
                                        Idéal pour les contributeurs en Côte d'Ivoire. Simple, rapide et sans frais.
                                    </p>
                                    <img src="/Services/wave-logo.png" alt="Wave" className="h-6 object-contain" />
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                    {[1000, 2000, 5000].map((amt) => (
                                        <button
                                            key={amt}
                                            onClick={() => window.open(waveUrl, '_blank')}
                                            className="px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 text-sm font-bold text-slate-600 dark:text-slate-300 transition-all"
                                        >
                                            {amt.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                                <a
                                    href={waveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20"
                                >
                                    <Heart className="w-5 h-5 fill-white" />
                                    <span>Soutenir via Wave</span>
                                    <ExternalLink className="w-4 h-4 opacity-50" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Buy Me A Coffee Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-10 relative overflow-hidden shadow-xl shadow-orange-500/5 transition-all duration-300 hover:shadow-orange-500/10 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-1">International</span>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Buy Me A Coffee</h2>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 w-fit">
                                    <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                                        <img src="/Services/buyme.png" alt="Buy Me A Coffee Logo" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-600 dark:text-slate-300 font-light mb-4">
                                        Pour notre communauté internationale. Soutenez-nous avec votre carte bancaire.
                                    </p>
                                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold italic">
                                        ☕ Offrez un café !
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <a
                                    href={bmcUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex w-full items-center justify-center gap-3 bg-[#FFDD00] hover:bg-[#FFCC00] text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-600/10"
                                >
                                    <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="BMC logo" className="w-5 h-5" />
                                    <span>Soutenir via BMC</span>
                                    <ExternalLink className="w-4 h-4 opacity-50" />
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="group relative dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl text-emerald-600 dark:text-emerald-400 shadow-sm">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ultra Rapide</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Maintenez nos serveurs opérationnels 24h/24 et 7j/7 avec une infrastructure de classe entreprise.
                            </p>
                        </div>
                    </div>

                    <div className="group relative dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl text-emerald-600 dark:text-emerald-400 shadow-sm">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">La communauté d'abord</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Soutenez le développement continu et maintenez notre plateforme avec des mises à jour régulières et de nouvelles fonctionnalités.
                            </p>
                        </div>
                    </div>

                    <div className="group relative dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl text-emerald-600 dark:text-emerald-400 shadow-sm">
                                    <Shield size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Renouvellement du domaine</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Assurez que notre domaine reste actif et renouvelé chaque année pour garder la plateforme accessible.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="relative bg-slate-900 dark:bg-emerald-950 rounded-[2.5rem] p-8 md:p-12 text-center overflow-hidden">
                    {/* Decor elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                            <TrendingUp className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium text-white">Rejoindre le mouvement</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Faites partie de quelque chose de plus grand
                        </h3>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Votre soutien transforme les développeurs individuels en une force collective, mettant l'innovation ivoirienne sur la scène mondiale.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.open(waveUrl, '_blank')}
                                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-950 dark:text-emerald-300 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                            >
                                <Heart className="w-5 h-5" />
                                Faire un don (Wave)
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <Link
                                to="/why"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 transform hover:scale-105"
                            >
                                <Globe className="w-5 h-5" />
                                Notre Mission
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-20 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                        Vous avez des questions ? <Link to="/contact" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">Contactez-nous</Link>
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Donation;
