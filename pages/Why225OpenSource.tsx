import React, { useEffect } from 'react';
import { Terminal, Heart, Globe, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Why225OpenSource: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-12 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">225 Open Source?</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                A Côte d'Ivoire initiative showcasing how open-source can transform African tech ecosystems.
            </p>
        </div>

        <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-8">
            <section>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                        <Globe size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Born in Côte d'Ivoire, Made for Africa</h2>
                </div>
                <p className="text-lg leading-relaxed">
                    Starting from Abidjan, we've witnessed incredible talent across Africa. Many brilliant projects remain hidden in private repositories or local hard drives.
                    <strong className="text-slate-900 dark:text-white font-semibold"> 225 Open Source</strong> is a Côte d'Ivoire-born platform designed to showcase African innovation. We believe that by highlighting what we build, we change the narrative from "technology consumers" to "technology creators" - starting with our Ivorian community and expanding across the continent.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                        <Terminal size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">An Ivorian Learning Model</h2>
                </div>
                <p className="text-lg leading-relaxed">
                    For junior developers in Côte d'Ivoire and across Africa, tutorials only go so far. Real growth happens when you read production-grade code, understand architecture decisions, and see how local developers solve complex problems. This platform, born from Ivorian experience, creates a massive library of real-world African code that can serve as a model for other countries wanting to build their own open-source ecosystems.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
                        <Shield size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">A Model for African Independence</h2>
                </div>
                <p className="text-lg leading-relaxed">
                    Côte d'Ivoire and Africa cannot rely solely on foreign software to solve local challenges. We need payment gateways that understand Mobile Money, agricultural apps that work offline in rural areas, and solutions built by people who understand our context. 225 Open Source demonstrates how a country can build independent, locally-maintained infrastructure. Our success in Côte d'Ivoire can serve as a blueprint for other African nations wanting to achieve digital sovereignty through open-source collaboration.
                </p>
            </section>

            <section className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 mt-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Heart className="text-red-500 fill-current animate-pulse" size={24} />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
                    </div>
                    <p className="italic text-xl text-slate-600 dark:text-slate-300 font-serif">
                        "To demonstrate how Côte d'Ivoire can build a thriving open-source ecosystem that serves as a replicable model for other African nations, fostering local innovation and digital independence."
                    </p>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Why225OpenSource;