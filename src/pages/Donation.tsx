import React, { useEffect } from 'react';
import { Heart, ArrowLeft, Shield, Zap, Users, ArrowRight, ExternalLink, TrendingUp, Globe, Smartphone, QrCode, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
const Donation: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const donationUrl = "https://pay.wave.com/m/M_ci_BzrF5N5Dmt4d/c/ci/";

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 font-sans overflow-x-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
            <div className="absolute top-20 right-0 w-[600px] h-[400px] bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px] -z-10 opacity-40"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 text-sm font-medium">
                    <ArrowLeft size={16} /> Retour à l'accueil
                </Link>

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
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 mb-20 relative overflow-hidden shadow-2xl shadow-emerald-500/10 dark:shadow-emerald-900/20">
                    {/* Brand Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            {/* Left Side: QR Visualization */}
                            <div className="w-full lg:w-2/5 flex flex-col items-center">
                                <div className="relative">
                                    <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col items-center group transition-transform duration-500 hover:scale-105">
                                        <div className="w-48 h-48 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-100 dark:border-emerald-800 flex items-center justify-center mb-4 overflow-hidden relative group-hover:border-emerald-500 transition-colors p-2">
                                            <img
                                                src="/Services/qr-code.png"
                                                alt="QR Code Wave"
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors pointer-events-none"></div>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-100 dark:border-emerald-800 mb-4">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Lien Direct Actif</span>
                                        </div>
                                        <img
                                            src="/Services/wave-logo.png"
                                            alt="Wave"
                                            className="h-6 object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-col gap-3 w-full max-w-[240px]">
                                    {[
                                        { icon: <CheckCircle2 size={16} />, text: "Zéro frais de transaction" },
                                        { icon: <CheckCircle2 size={16} />, text: "Supporte les talents locaux" },
                                        { icon: <CheckCircle2 size={16} />, text: "Déduction possible" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                            <span className="text-emerald-500">{item.icon}</span>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Content & Actions */}
                            <div className="w-full lg:w-3/5 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 mb-8">
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Partenaire de Don Officiel</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                                    Soutenez avec <span className="text-emerald-500">Wave</span>
                                </h2>

                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                                    Faites un don instantané et sécurisé. Chaque contribution, petite ou grande, nourrit l'innovation en Côte d'Ivoire.
                                </p>

                                {/* Amount Suggestions */}
                                <div className="mb-10">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Montants suggérés (FCFA)</p>
                                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                        {[1000, 2000, 5000, 10000].map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => window.open(donationUrl, '_blank')}
                                                className="px-6 py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 text-slate-600 dark:text-slate-300 font-bold transition-all duration-300 active:scale-95"
                                            >
                                                {amt.toLocaleString()}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => window.open(donationUrl, '_blank')}
                                            className="px-6 py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all"
                                        >
                                            Autre
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a
                                        href={donationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-10 py-5 rounded-[1.5rem] transition-all duration-500 shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-1"
                                    >
                                        <Heart className="w-6 h-6 fill-white" />
                                        <span className="text-lg text-white">Faire un don maintenant</span>
                                        <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </div>
                                <p className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400 font-medium">
                                    <Shield size={14} className="text-emerald-500" />
                                    Transactions cryptées et gérées par Wave CI
                                </p>
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
                            <a
                                href={donationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-950 dark:text-emerald-300 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                            >
                                <Heart className="w-5 h-5" />
                                Faire un don
                                <ArrowRight className="w-5 h-5" />
                            </a>
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
        </div>
    );
};

export default Donation;
