import React, { useEffect } from 'react';
import { Heart, ArrowLeft, Shield, Zap, Users, ArrowRight, ExternalLink, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import waveLogo from '../public/wave-logo.png';

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
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                {/* Hero Section */}
                <div className="text-center mb-20">                                        
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1]">
                        Support <span className="text-transparent bg-clip-text bg-emerald-600">225 Open Source</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        Your donation helps maintain the platform, ensuring we can continue to elevate the Ivorian tech ecosystem and showcase our talent to the world.
                    </p>
                </div>

                {/* Main Donation Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 mb-20 relative overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 text-center mb-12">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 mb-6">
                            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Secure & Instant</span>
                        </div>
                        
                        <img 
                            src={waveLogo} 
                            alt="Wave" 
                            className="h-16 mx-auto mb-6 drop-shadow-sm"
                        />
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Donate via Wave
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                            Trusted by millions across Africa, Wave makes giving back simple and secure.
                        </p>
                    </div>

                    <div className="text-center">
                        <a
                            href={donationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                        >
                            <Heart className="w-5 h-5" />
                            Donate Now
                            <ExternalLink className="w-5 h-5" />
                        </a>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
                            <span className="inline-flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Secure payment powered by Wave
                            </span>
                        </p>
                    </div>
                </div>

                {/* Impact Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="group relative dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl text-blue-600 dark:text-blue-400 shadow-sm">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lightning Fast</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Keep our servers running 24/7 with enterprise-grade infrastructure.
                            </p>
                        </div>
                    </div>

                    <div className="group relative dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Community First</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Support continuous development and maintain our platform with regular updates and new features.
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
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Domain Renewal</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Ensure our domain stays active and renewed annually to keep the platform accessible.
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
                            <span className="text-sm font-medium text-white">Join the Movement</span>
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Be Part of Something Bigger
                        </h3>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Your support transforms individual developers into a collective force, putting Ivorian innovation on the global stage.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={donationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-950 dark:text-emerald-300 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                            >
                                <Heart className="w-5 h-5" />
                                Make a Donation
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <Link
                                to="/why"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 transform hover:scale-105"
                            >
                                <Globe className="w-5 h-5" />
                                Our Mission
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-20 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                        Have questions? <Link to="/contact" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">Get in touch</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Donation;
