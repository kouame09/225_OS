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
  Plus
} from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
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
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
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
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen opacity-40 animate-[pulse_8s_infinite]"></div>
        <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[100px] -z-10 opacity-30 animate-[pulse_10s_infinite_2s]"></div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] -z-10 opacity-30"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold mb-8">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-glow shadow-emerald-500/50"></span>
            La communauté open-source n°1 de Côte d'Ivoire
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-[900] tracking-tight mb-8 leading-[1.1] md:leading-[1.05]">
            <span className="block text-slate-900 dark:text-white">Open source.</span>
            <span className="block text-slate-900 dark:text-white">Talents connectés.</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-emerald-600">Innovation accélérée.</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500/30 dark:text-emerald-500/20 pointer-events-none" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium">
            Le hub centralisateur de l'écosystème tech ivoirien. <br className="hidden md:block" />
            Découvrez, partagez et contribuez au développement de la tech locale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="group w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
            >
              C'est parti !
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/why"
              className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-lg hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 hover:shadow-lg"
            >
              En savoir plus
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-semibold">
            <CheckCircle size={16} className="text-emerald-500" />
            100% Gratuit & Open Source
          </div>

          {/* Community & Connection Highlight - Redesigned */}
          <div className="mt-24 md:mt-32 relative max-w-[1200px] mx-auto w-full px-4 sm:px-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/10 to-purple-500/20 blur-[100px] -z-10 rounded-full opacity-60"></div>

            <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/40 dark:border-slate-800/60 p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-emerald-900/5 dark:shadow-black/40 overflow-hidden relative group">

              {/* Subtle grid pattern inside card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50"></div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

                {/* Text Content */}
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Users size={14} />
                    Communauté 225OS
                  </div>

                  <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                    La force de <br className="hidden md:block" />
                    <span className="text-emerald-500">la communauté.</span>
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Arrêtez de construire seul dans votre coin. Rejoignez une communauté active de builders. Partagez, apprenez, collaborez pour bâtir l'avenir numérique du pays ensemble.
                  </p>

                  <div className="flex flex-col items-center lg:items-start gap-3 pt-4">
                    <div className="flex -space-x-2 h-10 hover:space-x-1 transition-all duration-300">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden shadow-sm transform hover:-translate-y-1 transition-transform duration-300 z-[${10 - i}]`}>
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 88}&backgroundColor=e2e8f0`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm z-0">
                        +5k
                      </div>
                    </div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center lg:text-left">
                      Rejoignez plus de <span className="font-bold text-slate-900 dark:text-white">5 000 acteurs.</span>
                    </div>
                  </div>
                </div>

                {/* Orbital Animation / Network Hub */}
                <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center order-1 lg:order-2">

                  {/* Glowing core background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-[50px] group-hover:bg-emerald-500/30 transition-all duration-1000"></div>

                  <div className="relative z-10 w-full h-full flex items-center justify-center scale-90 sm:scale-100">

                    {/* Outer Orbit */}
                    <div className="absolute w-[300px] sm:w-[380px] md:w-[450px] aspect-square border border-dashed border-slate-300/60 dark:border-slate-700/60 rounded-full animate-[spin_40s_linear_infinite]"></div>

                    {/* Inner Orbit */}
                    <div className="absolute w-[200px] sm:w-[250px] md:w-[280px] aspect-square border border-slate-200/80 dark:border-slate-700/80 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>

                    {/* Central Core */}
                    <div className="relative z-20 w-28 h-28 bg-white dark:bg-slate-950 rounded-full shadow-2xl shadow-emerald-500/30 border-8 border-slate-50 dark:border-slate-900 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-700">
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse">
                        <Cpu className="text-white w-10 h-10" />
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                    </div>

                    {/* Floating Tech Nodes */}
                    <div className="absolute w-[300px] sm:w-[380px] md:w-[450px] aspect-square animate-[spin_40s_linear_infinite]">
                      {/* Node 1 */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-[spin_40s_linear_infinite_reverse]">
                        <Terminal size={24} className="text-blue-500" />
                      </div>
                      {/* Node 2 */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-[spin_40s_linear_infinite_reverse]">
                        <Globe size={24} className="text-emerald-500" />
                      </div>
                      {/* Node 3 */}
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-[spin_40s_linear_infinite_reverse]">
                        <Database size={24} className="text-purple-500" />
                      </div>
                      {/* Node 4 */}
                      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-[spin_40s_linear_infinite_reverse]">
                        <ShieldAlert size={24} className="text-amber-500" />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BMAC-STYLE STACKED FEATURES SECTION --- */}
      <section className="py-24 space-y-24 md:space-y-32">

        {/* Feature 1: Open Source (GitHub Projects) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Globe size={14} />
              Open Source
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Tous les projets ivoiriens.<br />Au même endroit.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Découvrez, explorez et contribuez aux meilleurs dépôts GitHub open source créés par les acteurs de la tech locale. Fini de reinventer la roue à chaque projet. Catalyseur de startup.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-200/60 dark:border-slate-800 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 transform -rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-lg text-slate-900 dark:text-white">API-Paiement-CI</div>
                  <Github className="text-slate-400" size={20} />
                </div>
                <p className="text-sm text-slate-500 mb-4 h-10">Package d'intégration unifiée pour Wave, Orange Money et MTN.</p>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg"><Star size={12} fill="currentColor" /> 124</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg"><Cpu size={12} /> TypeScript</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-all duration-300 shadow-lg md:mt-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-lg text-slate-900 dark:text-white">Agri-Data-CI</div>
                  <Github className="text-slate-400" size={20} />
                </div>
                <p className="text-sm text-slate-500 mb-4 h-10">Base de données open source des prix du vivrier à Abidjan.</p>
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
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Rocket size={14} />
              Nouveau: Launchpad
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Le tremplin de vos <br />produits numériques.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              SaaS, APIs, applications mobiles ou templates... Lancez vos projets tech auprès de la communauté locale, obtenez des retours et trouvez vos premiers utilisateurs.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-emerald-50 dark:bg-emerald-950/20 rounded-[3rem] p-8 md:p-12 border-2 border-emerald-100 dark:border-emerald-900/50 overflow-hidden relative flex flex-col items-center justify-center">

            <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 transform transition-transform hover:scale-[1.02] duration-300">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-600 flex flex-col items-center justify-center text-white shadow-xl shadow-emerald-500/30 flex-shrink-0 relative overflow-hidden group border-2 border-emerald-300">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shine_3s_linear_infinite]"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover:bg-white/40 transition-colors"></div>
                <div className="relative z-10 flex flex-col items-center transform group-hover:scale-110 transition-transform duration-300">
                  <Wallet size={36} strokeWidth={2} className="mb-1" />
                  <span className="font-black text-xl tracking-tight leading-none uppercase">WPay</span>
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">WaKanda Pay</h3>
                <p className="text-slate-500 mb-4">La nouvelle passerelle de paiement unifiée pour toute l'Afrique de l'Ouest. Simple, rapide et sécurisée.</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg text-slate-600 dark:text-slate-400">Fintech</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg text-slate-600 dark:text-slate-400">SaaS</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-2xl min-w-[100px] border border-emerald-100 dark:border-emerald-800">
                <div className="text-emerald-500 mb-1 animate-bounce"><ArrowRight size={24} className="-rotate-90" /></div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">412</div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase">Upvotes</div>
              </div>
            </div>

          </div>
        </div>

        {/* Feature 3: Talents */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Users size={14} />
              Espace Talents
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Votre code est <br />votre nouveau CV.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Dans un marché compétitif, un PDF ne suffit plus. Montrez vos compétences réelles aux recruteurs via vos contributions et produits lancés sur la plateforme.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-blue-50 dark:bg-blue-950/20 rounded-[3rem] p-8 md:p-12 border-2 border-blue-100 dark:border-blue-900/30 overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8">

            {/* Profile Card */}
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 text-center relative z-10">
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                À l'écoute
              </div>
              <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full mb-4 overflow-hidden border-4 border-white dark:border-slate-800 shadow-md">
                <img src="/Contributors/prince.jpg" alt="Dev" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Prince Kouamé</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-6">Software Developer</p>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">14</div>
                  <div className="text-xs text-slate-500 uppercase font-bold mt-1">Projets</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">890</div>
                  <div className="text-xs text-slate-500 uppercase font-bold mt-1">Étoiles</div>
                </div>
              </div>
            </div>

            {/* Tech Stacks bubbles */}
            <div className="hidden md:flex flex-col gap-4">
              <div className="flex gap-4 transform translate-x-8">
                <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">React.js</div>
                <div className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg font-bold">TypeScript</div>
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-3 bg-slate-900 text-white dark:bg-slate-800 rounded-2xl shadow-lg font-bold">Node.js</div>
                <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">PostgreSQL</div>
              </div>
              <div className="flex gap-4 transform translate-x-12">
                <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">Docker</div>
                <div className="px-6 py-3 bg-emerald-500 text-white rounded-2xl shadow-lg font-bold">Supabase</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Local Economy & Community */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Shield size={14} />
              Économie Numérique Locale
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Bâtissons notre propre <br />souveraineté numérique.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              La Silicon Valley ne résoudra pas les problèmes de la Côte d'Ivoire. En fédérant nos efforts autours de l'open source, nous créons des solutions adaptées à nos réalités : inclusion financière, éducation, agriculture, santé, transport, etc.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="w-full bg-purple-50 dark:bg-purple-950/20 rounded-[3rem] p-8 md:p-12 border-2 border-purple-100 dark:border-purple-900/30 overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 relative">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] -ml-20 -mt-20 pointer-events-none"></div>

            {/* Illustration/Mockup for Community/Sovereignty */}
            <div className="relative z-10 w-full max-w-2xl bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-700 font-mono text-sm overflow-hidden flex flex-col group">
              {/* Header terminal context */}
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-slate-500 text-xs">init_sovereignty.sh</span>
              </div>

              <div className="space-y-3 text-slate-300">
                <div><span className="text-emerald-400">$</span> npm init 225-tech-ecosystem</div>
                <div className="animate-pulse">Loading dependencies...</div>
                <div><span className="text-purple-400">✔</span> Mobile Money Gateway initialized</div>
                <div><span className="text-purple-400">✔</span> Offline-First Cache Layer ready</div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">✔</span> Local Talent Network
                  <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">Connected</span>
                </div>
                <div className="text-emerald-400 font-bold mt-4">Success: Ivorian Digital Sovereignty module installed.</div>
              </div>

              {/* Overlaid shield/community badge */}
              <div className="absolute right-6 bottom-6 bg-white dark:bg-slate-950 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 transform rotate-6 transition-transform group-hover:rotate-0 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Gbonhi Tech</div>
                  <div className="text-xs text-slate-500">+10,000 Développeurs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* --- BMAC-STYLE: DESIGNED FOR DEVELOPERS --- */}
      <section className="py-12 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Conçu pour la tech locale,
          </h2>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-500 dark:text-slate-400 tracking-tight">
            pas pour le profit.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
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
        <div className="w-full bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

          <div className="md:w-1/3 relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-3">Pour <span className="text-emerald-400">tous</span> les acteurs de la Tech.</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              La plateforme n'est pas réservée qu'aux développeurs. C'est tout l'écosystème tech local qui s'y retrouve.
            </p>
          </div>

          <div className="md:w-2/3 relative z-10 flex flex-wrap justify-center md:justify-end gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm shadow-sm hover:border-emerald-500/50 hover:text-emerald-400 transition-colors">
              <Terminal size={14} /> Développeurs
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm shadow-sm hover:border-blue-500/50 hover:text-blue-400 transition-colors">
              <Database size={14} /> Data Scientists / Analysts
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm shadow-sm hover:border-red-500/50 hover:text-red-400 transition-colors">
              <ShieldAlert size={14} /> Experts Sécurité
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm shadow-sm hover:border-purple-500/50 hover:text-purple-400 transition-colors">
              <Server size={14} /> Admin Systèmes
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm shadow-sm hover:border-amber-500/50 hover:text-amber-400 transition-colors">
              <Lightbulb size={14} /> Fondateurs & PM
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm shadow-sm hover:border-pink-500/50 hover:text-pink-400 transition-colors">
              <PenTool size={14} /> UX/UI Designers
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm shadow-sm hover:border-emerald-500/50 hover:text-emerald-400 transition-colors">
              <GraduationCap size={14} /> Étudiants Tech
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 border-dashed px-4 py-2 rounded-xl text-slate-400 text-sm shadow-sm hover:border-slate-500 hover:text-white transition-colors cursor-default">
              <Plus size={14} /> Autres...
            </div>
          </div>
        </div>
      </section>

      {/* --- BMAC-STYLE: BENEFITS CARD GRID --- */}
      <section className="pb-24 pt-8 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 border border-slate-100 dark:border-slate-800">

          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Propulsez votre carrière,
            </h2>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-500 dark:text-slate-400 tracking-tight">
              comparé à un simple CV PDF.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">

            {/* Grid Item 1 */}
            <div>
              <div className="mb-4">
                <Terminal size={32} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pas juste un portfolio</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Les entreprises voient vos contributions réelles. Une ligne de code déployée vaut 100 lignes sur un CV.
              </p>
            </div>

            {/* Grid Item 2 */}
            <div>
              <div className="mb-4">
                <Cpu size={32} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Techno Agnostique</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Supporte tous les langages - JavaScript, Python, PHP, Go, Rust... rendant votre stack visible à tous.
              </p>
            </div>

            {/* Grid Item 3 */}
            <div>
              <div className="mb-4">
                <Users size={32} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Réseautage ciblé</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Au lieu de chercher des cofondateurs au hasard sur LinkedIn, rencontrez ici facilement d'autres passionnés d'innovation.
              </p>
            </div>

            {/* Grid Item 4 */}
            <div>
              <div className="mb-4">
                <Shield size={32} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Souveraineté avant tout</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Privilégiez l'utilisation d'outils locaux pour résoudre des problèmes locaux. Ivoirien avant tout.
              </p>
            </div>

            {/* Grid Item 5 */}
            <div>
              <div className="mb-4">
                <Globe size={32} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Visibilité mondiale</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Bien que centré sur la Côte d'Ivoire, vos projets sont indexés et découvrables par le monde entier.
              </p>
            </div>

            {/* Grid Item 6 */}
            <div>
              <div className="mb-4">
                <Star size={32} strokeWidth={1.5} className="text-slate-800 dark:text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Validation par vos pairs</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Les étoiles, les votes Launchpad et les forks témoignent de la qualité de votre travail.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROBLEM & SOLUTION SECTION (REDESIGNED) --- */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 dark:bg-red-500/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
              Diagnostic & Vision
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-slate-900 dark:text-white tracking-tight mb-6">
              Le problème de <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">GitHub ?</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
              GitHub est le cœur de l'open source mondial, mais il lui manque une dimension essentielle : <span className="text-slate-900 dark:text-white font-bold underline decoration-emerald-500/30 underline-offset-4">la géographie locale.</span>
            </p>
          </div>

          {/* Problem Bento Grid */}
          <div className="grid md:grid-cols-12 lg:grid-cols-10 gap-6 mb-24 items-stretch">
            {/* Main Problem Card */}
            <div className="md:col-span-12 lg:col-span-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 md:p-10 lg:px-10 rounded-[2.5rem] border border-red-500/20 dark:border-red-500/10 shadow-xl shadow-red-900/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-red-500/10 group-hover:rotate-12 transition-transform duration-700">
                <X size={120} strokeWidth={3} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/20">
                  <X className="text-white" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Frustration n°1 : Le filtre par pays
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg font-medium">
                  GitHub ne permet pas de filtrer les projets par pays. Résultat ? Impossible de découvrir facilement les initiatives créées par des ivoiriens.<br /><br />
                  Nos talents restent noyés dans un océan de millions de projets sans visibilité territoriale.
                </p>
              </div>
            </div>

            {/* Small Problem Card 1 */}
            <div className="md:col-span-6 lg:col-span-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-amber-500/20 dark:border-amber-500/10 shadow-xl shadow-amber-900/5 transition-transform hover:-translate-y-1 flex flex-col justify-center">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Visibilité fragmentée</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Les recruteurs et investisseurs peinent à identifier les champions locaux de la tech car rien ne les centralise de manière structurée.
              </p>
            </div>

            {/* Small Problem Card 2 */}
            <div className="md:col-span-6 lg:col-span-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 transition-transform hover:-translate-y-1 flex flex-col justify-center">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-700">
                <Users className="text-slate-600 dark:text-slate-400" size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Écosystème isolé</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Chaque développeur code "dans son coin", ignorant souvent que son voisin travaille sur une problématique similaire.
              </p>
            </div>
          </div>

          {/* Visual Link / Divider */}
          <div className="flex flex-col items-center justify-center mb-24 grayscale opacity-30">
            <div className="w-px h-16 bg-gradient-to-b from-slate-400 to-transparent"></div>
            <div className="my-2 text-xs font-black uppercase tracking-widest text-slate-400">Vers une solution ivoirienne</div>
            <div className="w-px h-16 bg-gradient-to-t from-emerald-400 to-transparent"></div>
          </div>

          {/* Solution Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Notre vision : <span className="text-emerald-500">225 Open Source</span></h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-emerald-600/5 dark:bg-emerald-500/5 p-8 rounded-[2rem] border-2 border-emerald-500/20 dark:border-emerald-500/10 shadow-2xl shadow-emerald-900/10 text-center flex flex-col items-center group hover:bg-emerald-600/[0.08] transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-500 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Terminal className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Hub Centralisé</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Centralisation des dépôts open source ivoiriens disponibles sur GitHub.
                </p>
              </div>

              <div className="bg-emerald-600 p-8 rounded-[2rem] shadow-2xl shadow-emerald-600/30 text-center flex flex-col items-center transform md:-translate-y-4 group">
                <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform">
                  <Globe className="text-emerald-600" size={32} />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3">Filtre National</h3>
                <p className="text-emerald-50/80 font-medium leading-relaxed">
                  Trouver facilement tous les projets open source créés en Côte d'Ivoire.
                </p>
              </div>

              <div className="bg-emerald-600/5 dark:bg-emerald-500/5 p-8 rounded-[2rem] border-2 border-emerald-500/20 dark:border-emerald-500/10 shadow-2xl shadow-emerald-900/10 text-center flex flex-col items-center group hover:bg-emerald-600/[0.08] transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-500 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Collaboration Unifiée</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Un espace unique pour briser l'isolement, contribuer mutuellement et innover.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works (Redesigned) */}
          <div className="relative">
            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Comment ça marche ?</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                Rien de plus simple pour propulser votre projet sur 225 Open Source.
              </p>
            </div>

            {/* Connecting line (Desktop) */}
            <div className="hidden md:block absolute top-[160px] left-1/4 right-1/4 h-px border-t border-dashed border-slate-300 dark:border-slate-700 pointer-events-none -z-10"></div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 relative shadow-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">1</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-black dark:bg-white rounded-xl shadow-lg flex items-center justify-center transform rotate-6">
                    <Github className="text-white dark:text-slate-900" size={16} />
                  </div>
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Partagez sur GitHub</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Poussez votre projet sur GitHub et rendez-le public pour qu'il soit indexable.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 relative shadow-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">2</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-xl shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                    <Plus className="text-white" size={18} />
                  </div>
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Référencez le Gbonhi</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Ajoutez votre URL GitHub sur 225_OS. Synchronison automatiquement des stats.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 relative shadow-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">3</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform">
                    <Rocket className="text-white" size={16} />
                  </div>
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Propulsez & Collaborez</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  La communauté découvre votre projet, y contribue et l'aide à grandir ensemble
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS SECTION (REDESIGNED) --- */}
      <section className="py-24 relative bg-white dark:bg-slate-950/50 backdrop-blur-3xl overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mb-8"></div>
            <h2 className="text-sm font-[900] text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center max-w-lg">
              Ils soutiennent et utilisent <br className="sm:hidden" /> l'écosystème open source
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 items-center justify-items-center opacity-50 dark:opacity-40 grayscale group/grid">
            {/* Logo 1 */}
            <div className="flex items-center gap-3 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-default">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm group-hover/grid:shadow-emerald-500/10 transition-all">
                <Globe className="h-8 w-8 text-emerald-500" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">AfricaTech</span>
            </div>
            {/* Logo 2 */}
            <div className="flex items-center gap-3 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-default">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                <Cpu className="h-8 w-8 text-blue-500" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">IvoireSoft</span>
            </div>
            {/* Logo 3 */}
            <div className="flex items-center gap-3 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-default">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                <Terminal className="h-8 w-8 text-orange-500" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">AbidjanCode</span>
            </div>
            {/* Logo 4 */}
            <div className="flex items-center gap-3 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-default">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">SecuWeb</span>
            </div>
            {/* Logo 5 */}
            <div className="flex items-center gap-3 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-default">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                <Users className="h-8 w-8 text-pink-500" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">TechHub225</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (IMPROVED) --- */}
      <section className="py-24 relative overflow-hidden px-4">
        <div className="max-w-6xl mx-auto rounded-[3.5rem] bg-slate-950 relative overflow-hidden p-12 md:p-24 shadow-3xl shadow-emerald-500/10 border border-white/5 group">
          {/* Animated Background Mesh */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse pointer-events-none group-hover:bg-emerald-500/30 transition-colors duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-[900] text-white tracking-tight mb-8 leading-tight">
              Prêt à propulser <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-emerald-500">l'innovation locale ?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Ne laissez pas vos efforts invisibles. Rejoignez le mouvement qui redéfinit l'excellence technique en Côte d'Ivoire.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <a
                href="https://github.com/kouame09/225_OS"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg rounded-2xl transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
                <Github size={24} />
                Participer au Projet
              </a>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl text-white font-black text-lg rounded-2xl transition-all hover:border-white/20 hover:-translate-y-1 shadow-xl"
              >
                Créer mon compte
              </button>
            </div>

            <div className="mt-12 flex items-center gap-4 text-slate-500 text-sm font-bold uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Join 5k+ ivoirian builders
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTRIBUTORS SECTION (ORGANIC) --- */}
      <section className="py-24 relative bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 dark:text-white tracking-tight mb-6">
              Rejoins une communauté <span className="text-emerald-500">dynamique.</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Du junior passionné à l'expert senior, nous construisons ensemble l'écosystème tech ivoirien.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16 max-w-4xl mx-auto">
            {/* Prince */}
            <div className="relative group p-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl transition-all duration-300 group-hover:scale-110 z-10 relative">
                <img src="/Contributors/prince.jpg" alt="Prince Kouamé" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full z-20 shadow-lg scale-0 group-hover:scale-100 transition-transform">
                <CheckCircle size={14} strokeWidth={3} />
              </div>
            </div>

            {/* Thibaut */}
            <div className="relative group p-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl transition-all duration-300 group-hover:scale-110 z-10 relative">
                <img src="/Contributors/Kouame_Thibaut.jpg" alt="Kouame Thibaut" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Mahine */}
            <div className="relative group p-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl transition-all duration-300 group-hover:scale-110 z-10 relative">
                <img src="/Contributors/Mahine.jpg" alt="Mahine" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Yaya */}
            <div className="relative group p-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl transition-all duration-300 group-hover:scale-110 z-10 relative">
                <img src="/Contributors/Yaya.jpeg" alt="Yaya" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Bidjang */}
            <div className="relative group p-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl transition-all duration-300 group-hover:scale-110 z-10 relative">
                <img src="/Contributors/BIDJANG.jpg" alt="Bidjang" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Counter */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border-4 border-white dark:border-slate-800 text-slate-500 dark:text-slate-400 font-[900] text-xl md:text-2xl shadow-xl transition-all hover:bg-emerald-500 hover:text-white hover:scale-110 cursor-alias">
              +100
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;