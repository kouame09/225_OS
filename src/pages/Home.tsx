import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Terminal,
  Cpu,
  Globe,
  Shield,
  Users,
  Github,
  X,
  AlertCircle,
  Star,
  Rocket,
  Wallet,
  Database,
  ShieldAlert,
  Server,
  Lightbulb,
  GraduationCap,
  PenTool,
  Plus,
  Clock,
  User
} from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 font-sans overflow-x-hidden">
      <AuthModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        initialView="signup"
      />

      {/* ====================================================================================
          LANDING PAGE SECTIONS
      ==================================================================================== */}

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Abstract Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Dynamic Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen opacity-40 animate-[pulse_8s_infinite]"></div>
        <div className="absolute top-40 right-1/4 w-[350px] h-[350px] bg-steel-500/20 dark:bg-steel-500/10 rounded-full blur-[100px] -z-10 opacity-30 animate-[pulse_10s_infinite_2s]"></div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] -z-10 opacity-30"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 text-sm font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-glow shadow-emerald-500/50"></span>
            La communauté open-source n°1 de Côte d'Ivoire
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[900] tracking-tight mb-6 leading-tight">
            <span className="block text-slate-900 dark:text-white">Open source.</span>
            <span className="block text-slate-900 dark:text-white">Talents connectés.</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-emerald-600">Innovation accélérée.</span>
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-emerald-500/30 dark:text-emerald-500/20 pointer-events-none" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
            L'open source ivoirien comme levier de développement technologique. <br className="hidden md:block" />
            On découvre, on partage, on fait avancer ensemble l'économie numérique de la Côte d'Ivoire.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/explore')}
              className="group w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
            >
              Explorer la plateforme
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/why"
              className="w-full sm:w-auto px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-base hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 hover:shadow-lg"
            >
              En savoir plus
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-semibold">
            <CheckCircle size={16} className="text-emerald-500" />
            100% Gratuit & Open Source
          </div>

          {/* Community & Connection Highlight */}
          <div className="mt-16 md:mt-20 relative max-w-5xl mx-auto w-full px-4 sm:px-6">
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 relative overflow-hidden">

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

                {/* Text Content */}
                <div className="space-y-5 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Users size={14} />
                    Communauté 225OS
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                    La force de <br className="hidden md:block" />
                    <span className="text-emerald-500">la communauté.</span>
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Arrêtez de construire seul dans votre coin. Rejoignez une communauté active de builders. Partagez, apprenez, collaborez pour bâtir l'avenir numérique du pays ensemble.
                  </p>

                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                  >
                    Rejoindre la communauté
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Community Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <Github size={16} className="text-slate-700 dark:text-slate-300" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-left">Projets open source</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <Users size={16} className="text-slate-700 dark:text-slate-300" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-left">Builders connectés</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <GraduationCap size={16} className="text-slate-700 dark:text-slate-300" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-left">Tutoriels & savoirs</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <Rocket size={16} className="text-slate-700 dark:text-slate-300" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-left">Produits lancés</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BMAC-STYLE STACKED FEATURES SECTION --- */}
      <section className="py-16 space-y-16 md:space-y-20">

        {/* Feature 1: Open Source (GitHub Projects) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Globe size={14} />
              Open Source
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Tous les projets ivoiriens.<br />Au même endroit.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Découvrez, explorez et contribuez aux meilleurs dépôts GitHub open source créés par les acteurs de la tech locale. Fini de reinventer la roue à chaque projet. Catalyseur de startup.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transform -rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-base text-slate-900 dark:text-white">API-Paiement-CI</div>
                  <Github className="text-slate-400" size={16} />
                </div>
                <p className="text-sm text-slate-500 mb-3 h-10">Package d'intégration unifiée pour Wave, Orange Money et MTN.</p>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg"><Star size={12} fill="currentColor" /> 124</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg"><Cpu size={12} /> TypeScript</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-all duration-300 shadow-lg md:mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-base text-slate-900 dark:text-white">Agri-Data-CI</div>
                  <Github className="text-slate-400" size={16} />
                </div>
                <p className="text-sm text-slate-500 mb-3 h-10">Base de données open source des prix du vivrier à Abidjan.</p>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg"><Star size={12} fill="currentColor" /> 89</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg"><Cpu size={12} /> Python</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Launchpad */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Rocket size={14} />
              Nouveau: Launchpad
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Le tremplin de vos <br />produits numériques.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              SaaS, APIs, applications mobiles ou templates... Lancez vos projets tech auprès de la communauté locale, obtenez des retours et trouvez vos premiers utilisateurs.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800 overflow-hidden relative flex flex-col items-center justify-center">

            <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-3 md:p-5 flex flex-col md:flex-row items-center gap-6 transform transition-transform hover:scale-[1.02] duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-600 flex flex-col items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0 relative overflow-hidden group border-2 border-emerald-300">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shine_3s_linear_infinite]"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full blur-xl group-hover:bg-white/40 transition-colors"></div>
                <div className="relative z-10 flex flex-col items-center transform group-hover:scale-110 transition-transform duration-300">
                  <Wallet size={20} strokeWidth={2} className="mb-0.5" />
                  <span className="font-black text-xs tracking-tight leading-none uppercase">WPay</span>
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">WaKanda Pay</h3>
                <p className="text-sm text-slate-500 mb-3">La nouvelle passerelle de paiement unifiée pour toute l'Afrique de l'Ouest. Simple, rapide et sécurisée.</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg text-slate-600 dark:text-slate-400">Fintech</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg text-slate-600 dark:text-slate-400">SaaS</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-xl min-w-[80px] border border-emerald-100 dark:border-emerald-800">
                <div className="text-emerald-500 mb-1 animate-bounce"><ArrowRight size={16} className="-rotate-90" /></div>
                <div className="text-lg font-black text-slate-900 dark:text-white">412</div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase">Upvotes</div>
              </div>
            </div>

          </div>
        </div>



        {/* Feature 3: PitchHub */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Lightbulb size={14} />
              Nouveau: PitchHub
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              L'idée existe. <br />Trouvez qui la construit.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Vous avez une idée de startup mais pas de co-fondateur ? PitchHub connecte les builders ivoiriens : cherchez un associé technique, un mentor, un investisseur ou un latefounder.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Pitch Card 1 */}
              <Link to="/pitchhub" className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transform -rotate-2 hover:rotate-0 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-base text-slate-900 dark:text-white">AgriMarket CI</div>
                  <Lightbulb className="text-slate-300 dark:text-slate-600" size={16} />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Marketplace direct producteur-consommateur pour Abidjan.</p>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">Co-fondateur Tech</span>
                </div>
              </Link>

              {/* Pitch Card 2 */}
              <Link to="/pitchhub" className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-all duration-300 group md:mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-base text-slate-900 dark:text-white">EduLab225</div>
                  <Rocket className="text-slate-300 dark:text-slate-600" size={16} />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Plateforme de tutorat peer-to-peer pour étudiants ivoiriens.</p>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">Investisseur</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature 3b: Articles */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <PenTool size={14} />
              Articles & Knowledge
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Apprenez. Partagez. <br />Montez en compétence.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Tutoriels, retours d'expérience, actu tech et conseils carrière écrits par la communauté. La knowledge base locale, en français, par ceux qui construisent.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-steel-500/5 dark:bg-steel-500/5 rounded-full blur-[100px] -ml-20 -mt-20 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {/* Article Card 1 */}
              <Link to="/articles" className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transform hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="mb-3">
                  <Terminal size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Tutoriels & Guides</span>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 text-sm flex-grow">Déployer une API Express sur Vercel en 2026</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1"><User size={12} /> Prince K.</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 8 min</span>
                </div>
              </Link>

              {/* Article Card 2 */}
              <Link to="/articles" className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transform hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="mb-3">
                  <ShieldAlert size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Rex & Retours d'expérience</span>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 text-sm flex-grow">Ce qu'on apprend en scaling une app à 50k users</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1"><User size={12} /> Thibaut K.</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 12 min</span>
                </div>
              </Link>

              {/* Article Card 3 */}
              <Link to="/articles" className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transform hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="mb-3">
                  <GraduationCap size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Conseils & Carrière</span>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 text-sm flex-grow">De junior à mid : mon plan de carrière en 1 an</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1"><User size={12} /> Mahine</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 6 min</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature 4: Local Economy & Community */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Shield size={14} />
              Économie Numérique Locale
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Bâtissons notre propre <br />souveraineté numérique.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              La Silicon Valley ne résoudra pas les problèmes de la Côte d'Ivoire. En fédérant nos efforts autours de l'open source, nous créons des solutions adaptées à nos réalités : inclusion financière, éducation, agriculture, santé, transport, etc.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 relative">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-500/5 dark:bg-slate-500/5 rounded-full blur-[80px] -ml-20 -mt-20 pointer-events-none"></div>

            {/* Illustration/Mockup for Community/Sovereignty */}
            <div className="relative z-10 w-full max-w-2xl bg-slate-900 rounded-xl p-4 shadow-xl border border-slate-700 font-mono text-sm overflow-hidden flex flex-col group">
              {/* Header terminal context */}
              <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-slate-500 text-xs">init_sovereignty.sh</span>
              </div>

              <div className="space-y-2 text-slate-300">
                <div><span className="text-emerald-400">$</span> npm init 225-tech-ecosystem</div>
                <div className="animate-pulse">Loading dependencies...</div>
                <div><span className="text-purple-400">✔</span> Mobile Money Gateway initialized</div>
                <div><span className="text-purple-400">✔</span> Offline-First Cache Layer ready</div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">✔</span> Local Talent Network
                  <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">Connected</span>
                </div>
                <div className="text-emerald-400 font-bold mt-3">Success: Ivorian Digital Sovereignty module installed.</div>
              </div>

              {/* Overlaid shield/community badge */}
              <div className="absolute right-4 bottom-4 bg-white dark:bg-slate-950 p-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 transform rotate-6 transition-transform group-hover:rotate-0 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Users size={16} />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">Gbonhi Tech</div>
                  <div className="text-xs text-slate-500">+10,000 Développeurs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* --- BMAC-STYLE: DESIGNED FOR DEVELOPERS --- */}
      <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Conçu pour la tech locale,
          </h2>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-500 dark:text-slate-400 tracking-tight">
            pas pour le profit.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Item 1 */}
          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <CheckCircle size={16} />
              </div>
            </div>
            <div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Pas de commission sur vos opportunités. C'est <span className="font-bold text-slate-900 dark:text-white">100% gratuit</span> de lister vos projets et produits.
              </p>
            </div>
          </div>
          {/* Item 2 */}
          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <CheckCircle size={16} />
              </div>
            </div>
            <div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Gardez <span className="font-bold text-slate-900 dark:text-white">le contrôle total</span> sur votre code. La plateforme ne sert que de vitrine locale vers vos dépôts.
              </p>
            </div>
          </div>
          {/* Item 3 */}
          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <CheckCircle size={16} />
              </div>
            </div>
            <div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Parlez aux autres membres de la communauté pour de l'aide via notre Discord et groupe WhatsApp.
              </p>
            </div>
          </div>
          {/* Item 4 */}
          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <CheckCircle size={16} />
              </div>
            </div>
            <div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Visibilité instantanée. Vos contributions sont vues par les recruteurs locaux. <span className="font-bold text-slate-900 dark:text-white">Avantage concurrentiel immense.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BMAC-STYLE: FOR ALL TECH ACTORS BANNER --- */}
      <section className="py-8 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

          <div className="md:w-1/3 relative z-10 text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">Pour <span className="text-emerald-400">tous</span> les acteurs de la Tech.</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              La plateforme n'est pas réservée qu'aux développeurs. C'est tout l'écosystème tech local qui s'y retrouve.
            </p>
          </div>

          <div className="md:w-2/3 relative z-10 flex flex-wrap justify-center md:justify-end gap-2">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 text-xs shadow-sm hover:border-emerald-500/50 hover:text-emerald-400 transition-colors">
              <Terminal size={12} /> Développeurs
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 text-xs shadow-sm hover:border-steel-500/50 hover:text-steel-400 transition-colors">
              <Database size={12} /> Data Scientists / Analysts
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 text-xs shadow-sm hover:border-red-500/50 hover:text-red-400 transition-colors">
              <ShieldAlert size={12} /> Experts Sécurité
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 text-xs shadow-sm hover:border-purple-500/50 hover:text-purple-400 transition-colors">
              <Server size={12} /> Admin Systèmes
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 text-xs shadow-sm hover:border-amber-500/50 hover:text-amber-400 transition-colors">
              <Lightbulb size={12} /> Fondateurs & PM
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 text-xs shadow-sm hover:border-pink-500/50 hover:text-pink-400 transition-colors">
              <PenTool size={12} /> UX/UI Designers
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 text-xs shadow-sm hover:border-emerald-500/50 hover:text-emerald-400 transition-colors">
              <GraduationCap size={12} /> Étudiants Tech
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 border-dashed px-3 py-1.5 rounded-lg text-slate-400 text-xs shadow-sm hover:border-slate-500 hover:text-white transition-colors cursor-default">
              <Plus size={12} /> Autres...
            </div>
          </div>
        </div>
      </section>

      {/* --- BMAC-STYLE: BENEFITS CARD GRID --- */}
      <section className="pb-16 pt-8 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 border border-slate-100 dark:border-slate-800">

          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Propulsez votre carrière,
            </h2>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-500 dark:text-slate-400 tracking-tight">
              comparé à un simple CV PDF.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">

            {/* Grid Item 1 */}
            <div>
              <div className="mb-3">
                <Terminal size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Pas juste un portfolio</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Les entreprises voient vos contributions réelles. Une ligne de code déployée vaut 100 lignes sur un CV.
              </p>
            </div>

            {/* Grid Item 2 */}
            <div>
              <div className="mb-3">
                <Cpu size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Techno Agnostique</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Supporte tous les langages - JavaScript, Python, PHP, Go, Rust... rendant votre stack visible à tous.
              </p>
            </div>

            {/* Grid Item 3 */}
            <div>
              <div className="mb-3">
                <Users size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Réseautage ciblé</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Au lieu de chercher des cofondateurs au hasard sur LinkedIn, rencontrez ici facilement d'autres passionnés d'innovation.
              </p>
            </div>

            {/* Grid Item 4 */}
            <div>
              <div className="mb-3">
                <Shield size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Souveraineté avant tout</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Privilégiez l'utilisation d'outils locaux pour résoudre des problèmes locaux. Ivoirien avant tout.
              </p>
            </div>

            {/* Grid Item 5 */}
            <div>
              <div className="mb-3">
                <Globe size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Visibilité mondiale</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Bien que centré sur la Côte d'Ivoire, vos projets sont indexés et découvrables par le monde entier.
              </p>
            </div>

            {/* Grid Item 6 */}
            <div>
              <div className="mb-3">
                <Star size={20} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Validation par vos pairs</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Les étoiles, les votes Launchpad et les forks témoignent de la qualité de votre travail.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROBLEM & SOLUTION SECTION (REDESIGNED) --- */}
      <section className="py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 dark:bg-red-500/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
              Diagnostic & Vision
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Le problème de <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">GitHub ?</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
              GitHub est le cœur de l'open source mondial, mais il lui manque une dimension essentielle : <span className="text-slate-900 dark:text-white font-bold underline decoration-emerald-500/30 underline-offset-4">la géographie locale.</span>
            </p>
          </div>

          {/* Problem Bento Grid */}
          <div className="grid md:grid-cols-12 lg:grid-cols-10 gap-4 mb-16 items-stretch">
            {/* Main Problem Card */}
            <div className="md:col-span-12 lg:col-span-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-red-500/20 dark:border-red-500/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 text-red-500/10 group-hover:rotate-12 transition-transform duration-700">
                <X size={40} strokeWidth={3} />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-red-500/20">
                  <X className="text-white" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                  Frustration n°1 : Le filtre par pays
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg font-medium">
                  GitHub ne permet pas de filtrer les projets par pays. Résultat ? Impossible de découvrir facilement les initiatives créées par des ivoiriens.<br /><br />
                  Nos projets restent noyés dans un océan de millions de dépôts sans visibilité territoriale.
                </p>
              </div>
            </div>

            {/* Small Problem Card 1 */}
            <div className="md:col-span-6 lg:col-span-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-amber-500/20 dark:border-amber-500/10 transition-transform hover:-translate-y-1 flex flex-col justify-center">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="text-amber-600 dark:text-amber-400" size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">Visibilité fragmentée</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Les recruteurs et investisseurs peinent à identifier les champions locaux de la tech car rien ne les centralise de manière structurée.
              </p>
            </div>

            {/* Small Problem Card 2 */}
            <div className="md:col-span-6 lg:col-span-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-transform hover:-translate-y-1 flex flex-col justify-center">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                <Users className="text-slate-600 dark:text-slate-400" size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">Écosystème isolé</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Chaque développeur code "dans son coin", ignorant souvent que son voisin travaille sur une problématique similaire.
              </p>
            </div>
          </div>

          {/* Visual Link / Divider */}
          <div className="flex flex-col items-center justify-center mb-16 grayscale opacity-30">
            <div className="w-px h-10 bg-gradient-to-b from-slate-400 to-transparent"></div>
            <div className="my-2 text-xs font-black uppercase tracking-widest text-slate-400">Vers une solution ivoirienne</div>
            <div className="w-px h-10 bg-gradient-to-t from-emerald-400 to-transparent"></div>
          </div>

          {/* Solution Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Notre vision : <span className="text-emerald-500">225 Open Source</span></h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-emerald-600/5 dark:bg-emerald-500/5 p-6 rounded-xl border-2 border-emerald-500/20 dark:border-emerald-500/10 shadow-2xl shadow-emerald-900/10 text-center flex flex-col items-center group hover:bg-emerald-600/[0.08] transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Terminal className="text-white" size={20} />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">Hub Centralisé</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Centralisation des dépôts open source ivoiriens disponibles sur GitHub.
                </p>
              </div>

              <div className="bg-emerald-600 p-6 rounded-xl shadow-2xl shadow-emerald-600/30 text-center flex flex-col items-center transform md:-translate-y-4 group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-6 transition-transform">
                  <Globe className="text-emerald-600" size={20} />
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">Filtre National</h3>
                <p className="text-emerald-50/80 font-medium leading-relaxed">
                  Trouver facilement tous les projets open source créés en Côte d'Ivoire.
                </p>
              </div>

              <div className="bg-emerald-600/5 dark:bg-emerald-500/5 p-6 rounded-xl border-2 border-emerald-500/20 dark:border-emerald-500/10 shadow-2xl shadow-emerald-900/10 text-center flex flex-col items-center group hover:bg-emerald-600/[0.08] transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Users className="text-white" size={20} />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">Collaboration Unifiée</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Un espace unique pour briser l'isolement, contribuer mutuellement et innover.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works (Redesigned) */}
          <div className="relative">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">Comment ça marche ?</h3>
              <p className="text-base text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                Rien de plus simple pour propulser votre projet sur 225 Open Source.
              </p>
            </div>

            {/* Connecting line (Desktop) */}
            <div className="hidden md:block absolute top-[105px] left-1/4 right-1/4 h-px border-t border-dashed border-slate-300 dark:border-slate-700 pointer-events-none -z-10"></div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center mb-6 relative shadow-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-lg font-black text-slate-900 dark:text-white">1</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-black dark:bg-white rounded-lg shadow-lg flex items-center justify-center transform rotate-6">
                    <Github className="text-white dark:text-slate-900" size={12} />
                  </div>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">Partagez sur GitHub</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Poussez votre projet sur GitHub et rendez-le public pour qu'il soit indexable.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center mb-6 relative shadow-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-lg font-black text-slate-900 dark:text-white">2</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-lg shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                    <Plus className="text-white" size={18} />
                  </div>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">Référencez le Gbonhi</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Ajoutez votre URL GitHub sur 225_OS. Synchronison automatiquement des stats.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center mb-6 relative shadow-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-lg font-black text-slate-900 dark:text-white">3</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-steel-500 rounded-lg shadow-lg flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform">
                    <Rocket className="text-white" size={12} />
                  </div>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">Propulsez & Collaborez</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  La communauté découvre votre projet, y contribue et l'aide à grandir ensemble
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (IMPROVED) --- */}
      <section className="py-16 relative overflow-hidden px-4">
        <div className="max-w-6xl mx-auto rounded-2xl bg-slate-950 relative overflow-hidden p-6 md:p-10 shadow-xl shadow-emerald-500/10 border border-white/5 group">
          {/* Animated Background Mesh */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse pointer-events-none group-hover:bg-emerald-500/30 transition-colors duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-steel-500/20 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-[900] text-white tracking-tight mb-4 leading-tight">
              Prêt à propulser <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-emerald-500">l'innovation locale ?</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mb-6 font-medium leading-relaxed">
              Ne laissez pas vos efforts invisibles. Rejoignez le mouvement qui redéfinit l'excellence technique en Côte d'Ivoire.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="https://github.com/kouame09/225_OS"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
                <Github size={16} />
                Participer au Projet
              </a>
              <Link
                to="/explore"
                className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl text-white font-bold text-sm rounded-xl transition-all hover:border-white/20 hover:-translate-y-1 shadow-xl flex items-center justify-center gap-2"
              >
                Rejoindre la communauté
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Join 5k+ ivoirian builders
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;