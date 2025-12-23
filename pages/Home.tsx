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
  AlertCircle
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
      <section id="hero" className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Abstract Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
        <div className="absolute top-20 right-0 w-[600px] h-[400px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] -z-10 opacity-40"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            La communauté open-source n°1 de Côte d'Ivoire
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.25]">
            Construire le futur <br />
            de la <span className="relative inline-block px-4 py-0 ml-1">
              <span className="absolute inset-0 bg-emerald-600 -rotate-2 rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-500/20"></span>
              <span className="relative text-white">Tech Ivoirienne</span>
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            Découvrez, partagez et contribuez à des projets open-source de pointe créés par des talents tech ivoiriens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-base hover:bg-slate-800 dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              Rejoindre la communauté
              <ArrowRight size={20} />
            </button>
            <Link
              to="/why"
              className="w-full sm:w-auto px-7 py-3.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              En savoir plus
            </Link>
          </div>

          {/* Community & Connection Highlight */}
          <div className="mt-24 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-3xl -z-10 rounded-full opacity-50"></div>

            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-800/60 p-8 md:p-12 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-black/20">
              <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                    <Users size={12} className="text-emerald-500" />
                    La communauté d'abord
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    L'union fait la <br />
                    <span className="text-transparent bg-clip-text bg-emerald-500">force technologique</span>
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    Connectez-vous avec la plus grande communauté open source de Côte d'Ivoire. Partagez, apprenez et grandissez aux côtés des meilleurs talents du pays.
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-[3px] border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 55}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-[3px] border-white dark:border-slate-900 bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        +500
                      </div>
                    </div>
                  </div>
                </div>

                {/* The "Joliement Codée" Illustration - Dynamic Connectivity Node */}
                <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
                  {/* Background Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm -skew-y-3 transform translate-x-4 select-none pointer-events-none"></div>

                  {/* Central Hub Animation */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Orbital Rings */}
                    <div className="absolute w-64 h-64 border border-dashed border-slate-300 dark:border-slate-600 rounded-full animate-[spin_60s_linear_infinite] opacity-40"></div>
                    <div className="absolute w-48 h-48 border border-slate-200 dark:border-slate-700 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-40"></div>

                    {/* Central Core */}
                    <div className="relative z-20 w-24 h-24 bg-white dark:bg-slate-900 rounded-full shadow-2xl shadow-emerald-500/20 border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center p-1 group cursor-pointer transition-transform hover:scale-110 duration-500">
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                        <Cpu className="text-white w-8 h-8" />
                      </div>
                      {/* Connecting Lines emitting from center (CSS) */}
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping"></div>
                    </div>

                    {/* Satellite Nodes */}
                    <div className="absolute w-64 h-64 animate-[spin_20s_linear_infinite]">
                      {/* Satellite 1 */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 transform hover:scale-110 transition-transform">
                        <Terminal size={16} className="text-slate-600 dark:text-slate-300" />
                      </div>
                      {/* Satellite 2 */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 transform hover:scale-110 transition-transform">
                        <Globe size={16} className="text-slate-600 dark:text-slate-300" />
                      </div>
                      {/* Satellite 3 */}
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 transform hover:scale-110 transition-transform">
                        <Github size={16} className="text-slate-600 dark:text-slate-300" />
                      </div>
                      {/* Satellite 4 */}
                      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 transform hover:scale-110 transition-transform">
                        <Users size={16} className="text-slate-600 dark:text-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAILED FEATURES SECTION (ZIG-ZAG LAYOUT) --- */}
      <div className="overflow-hidden space-y-24 md:space-y-32 pb-32">

        {/* Block 1: Solving Local Problems */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Visual: Mobile API Integration */}
              <div className="lg:w-1/2 w-full flex lg:justify-start justify-center perspective-1000">
                <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 flex items-center justify-center transform transition duration-500">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shine_4s_linear_infinite] opacity-10 rounded-3xl pointer-events-none"></div>

                  {/* Floating Phone UI */}
                  <div className="relative w-48 h-80 bg-slate-900 rounded-[2rem] border-4 border-slate-800 overflow-hidden flex flex-col z-20 transform rotate-[-6deg] translate-x-4 animate-float">
                    <div className="h-full bg-slate-950 p-4 flex flex-col relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-xl"></div>
                      <div className="mt-8 space-y-3">
                        <div className="h-20 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex flex-col items-center justify-center">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mb-1 animate-pulse">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                          <div className="text-[10px] text-emerald-400 font-bold animate-pulse">Payment Success</div>
                        </div>
                        <div className="h-2 w-1/2 bg-slate-800 rounded-full"></div>
                        <div className="h-2 w-3/4 bg-slate-800 rounded-full"></div>
                        <div className="h-32 bg-slate-800/50 rounded-xl mt-4 border border-slate-800 border-dashed"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Code Snippet Card behind phone */}
                  <div className="absolute left-8 bottom-12 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-4 border border-slate-200 dark:border-slate-600 z-10 transform rotate-[3deg] animate-float-delayed">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-600 rounded"></div>
                      <div className="h-2 w-1/2 bg-emerald-100 dark:bg-emerald-900/50 rounded"></div>
                      <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Globe size={14} />
                  Solutions locales
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Résolvez des défis réels <br /> avec du code local
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  La Silicon Valley ne résoudra pas les problèmes d'Abidjan. Qu'il s'agisse d'intégrer des <span className="text-slate-900 dark:text-white font-semibold">APIs Mobile Money</span>, de numériser l'agriculture ou d'optimiser les transports, l'open source nous permet de construire des solutions adaptées à notre réalité.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <CheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">Adapter les outils à Wave, Orange Money et MTN.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <CheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">Créer des applications hors-ligne pour les zones à faible débit.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 2: Career Growth */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">

              {/* Visual: Contribution Graph & Profile */}
              <div className="lg:w-1/2 w-full flex lg:justify-end justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex items-center justify-center">
                  {/* Abstract Contribution Grid Background */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-20 grid grid-cols-12 gap-1 p-8">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${Math.random() > 0.7 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                    ))}
                  </div>

                  {/* Profile Card */}
                  <div className="relative z-10 w-64 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 animate-float">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500"></div>
                      <div>
                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                        <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800 rounded"></div>
                      </div>
                    </div>
                    {/* Fake Stats */}
                    <div className="flex justify-between mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">142</div>
                        <div className="text-[10px] text-slate-500 uppercase">Commits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">12</div>
                        <div className="text-[10px] text-slate-500 uppercase">Projets</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">5</div>
                        <div className="text-[10px] text-slate-500 uppercase">Étoiles</div>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold">
                      Voir le profil
                    </button>

                    {/* Hired Badge */}
                    <div className="absolute -right-6 -top-6 bg-emerald-500 text-white px-4 py-2 rounded-lg transform rotate-12 flex items-center gap-2 animate-wiggle">
                      <CheckCircle size={16} />
                      <span className="font-bold text-sm">RECRUTÉ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Terminal size={14} />
                  Accélérateur de carrière
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Votre code est votre <br /> nouveau CV
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Dans un marché compétitif, un CV PDF ne suffit plus. Contribuer à l'open source vous donne une <span className="text-slate-900 dark:text-white font-semibold">preuve de compétence</span>. Cela aide les entreprises locales à trouver des pépites cachées et vous permet de décrocher des opportunités.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>Présentez votre style de code et vos compétences de collaboration.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>Soyez reconnu par les meilleures entreprises technologiques de Côte d'Ivoire et d'Afrique de l'Ouest.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Block 3: Digital Sovereignty */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Visual: Server Stack & Shield */}
              <div className="lg:w-1/2 w-full flex lg:justify-start justify-center">
                <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-3xl border border-slate-800 p-8 flex items-center justify-center overflow-hidden group">
                  {/* Glowing Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] group-hover:bg-purple-500/30 transition-all duration-700"></div>

                  {/* Server Stack Illustration (CSS Shapes) */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-48 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center px-4 justify-between relative overflow-hidden">
                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                        </div>
                        <div className="h-1 w-12 bg-slate-700 rounded-full"></div>
                        {/* Scanning line animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
                      </div>
                    ))}
                  </div>

                  {/* Shield Overlay */}
                  <div className="absolute z-20 bg-slate-950/80 backdrop-blur-sm border border-purple-500/50 p-4 rounded-2xl flex flex-col items-center gap-2 transform translate-y-8 group-hover:translate-y-6 transition-transform animate-float-delayed">
                    <Shield size={32} className="text-purple-500" />
                    <span className="text-xs font-bold text-white tracking-widest">MAÎTRISEZ VOS DONNÉES</span>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Cpu size={14} />
                  Souveraineté
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Construire une infrastructure <br /> indépendante
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  La dépendance vis-à-vis de logiciels étrangers coûteux limite notre croissance. En défendant l'open source en Côte d'Ivoire, nous construisons une <span className="text-slate-900 dark:text-white font-semibold">infrastructure numérique résiliente</span> qui nous appartient.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Nous créons des outils accessibles, modifiables et détenus par la communauté, réduisant ainsi la dépendance aux SaaS propriétaires coûteux.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 4: Community & Unity */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">

              {/* Visual: Network Hub */}
              <div className="lg:w-1/2 w-full flex lg:justify-end justify-center">
                <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 flex items-center justify-center overflow-hidden">
                  {/* Connecting Lines (CSS) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[80%] h-[1px] bg-slate-300 dark:bg-slate-700 rotate-45"></div>
                    <div className="absolute w-[80%] h-[1px] bg-slate-300 dark:bg-slate-700 -rotate-45"></div>
                    <div className="absolute w-[1px] h-[80%] bg-slate-300 dark:bg-slate-700"></div>
                    <div className="absolute w-[80%] h-[1px] bg-slate-300 dark:bg-slate-700"></div>
                  </div>

                  {/* Satellite Nodes */}
                  <div className="absolute top-12 left-12 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border-2 border-pink-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white animate-pulse">Abidjan</div>
                  <div className="absolute bottom-12 right-12 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border-2 border-orange-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white animate-pulse delay-75">Yamoussoukro</div>
                  <div className="absolute top-12 right-12 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border-2 border-blue-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white animate-pulse delay-150">Bouaké</div>
                  <div className="absolute bottom-12 left-12 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border-2 border-emerald-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white animate-pulse delay-300">Korhogo</div>

                  {/* Central Hub */}
                  <div className="relative z-20 w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-100 dark:border-slate-700 animate-[spin_60s_linear_infinite]">
                    <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center">
                      <Terminal size={24} className="text-white dark:text-slate-900" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Users size={14} />
                  Unité
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Unir le "Tech Maquis"
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Des freelances à Bouaké aux startups à Abidjan, la scène tech ivoirienne est vibrante mais dispersée. Cette plateforme agit comme le <span className="text-slate-900 dark:text-white font-semibold">hub central</span>, où les développeurs se rencontrent, collaborent et se soutiennent mutuellement.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>



      {/* --- PROBLEM & SOLUTION SECTION --- */}
      <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              Le problème que nous résolvons
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              GitHub est la plus grande plateforme open source au monde, mais il lui manque une fonctionnalité cruciale : filtrer les projets par pays. C'est là qu'intervient 225 Open Source.
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
                <X className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pas de filtre par pays sur GitHub</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Impossible de découvrir facilement les projets open source créés par des développeurs ivoiriens
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Visibilité limitée</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Les talents ivoiriens restent cachés dans l'océan mondial des projets open source
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4">
                <Users className="text-yellow-600 dark:text-yellow-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Collaboration fragmentée</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Difficile pour les développeurs ivoiriens de se trouver et de collaborer
              </p>
            </div>
          </div>

          {/* Solution Cards */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Notre solution</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Terminal className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Centralisation intelligente</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Nous regroupons automatiquement les projets open source ivoiriens depuis GitHub
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Filtrage par pays</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Accès instantané à tous les projets open source créés en Côte d'Ivoire
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Communauté unifiée</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Un espace central pour découvrir, contribuer et collaborer avec les talents locaux
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-4">Comment ça marche ?</h3>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Une solution simple mais puissante pour connecter l'écosystème ivoirien
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center mb-6 relative">
                    <span className="text-2xl font-bold text-white dark:text-slate-900">1</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Github className="text-white" size={14} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Partagez sur GitHub</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Poussez votre projet open source sur GitHub et rendez-le public pour qu'il soit accessible à tous
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center mb-6 relative">
                    <span className="text-2xl font-bold text-white dark:text-slate-900">2</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <ArrowRight className="text-white" size={14} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Ajoutez-le ici</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Importez votre projet ici pour qu'il puisse être facilement trouvé dans notre écosystème
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center mb-6 relative">
                    <span className="text-2xl font-bold text-white dark:text-slate-900">3</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-white" size={14} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Collaborez</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    La communauté ivoirienne découvre votre projet, y contribue et l'aide à grandir ensemble
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS SECTION --- */}
      <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">
            Approuvé par ces entreprises de l'écosystème
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60">
            {/* Fake Partners - Placeholders */}
            <div className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              <Globe className="h-8 w-8 text-emerald-500" />
              <span>AfricaTech</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              <Cpu className="h-8 w-8 text-blue-500" />
              <span>IvoireSoft</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              <Terminal className="h-8 w-8 text-orange-500" />
              <span>AbidjanCode</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              <Shield className="h-8 w-8 text-purple-500" />
              <span>SecuWeb</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              <Users className="h-8 w-8 text-pink-500" />
              <span>TechHub225</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-emerald-950 rounded-[2.5rem] p-10 sm:p-20 text-center relative overflow-hidden group">
          {/* Decor elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none group-hover:bg-emerald-500/30 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Prêts pour la dynamique ?</h2>
            <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Ne laissez pas votre projet se perdre dans l'océan des projets GitHub. Ajoutez votre projet sur 225 Open Source et contribuez au développement numérique de la Côte d'Ivoire.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/kouame09/225_OS"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Github size={20} />
                Voir sur GitHub
              </a>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105"
              >
                Créer un compte
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTRIBUTORS / COMMUNITY SECTION --- */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Rejoignez le top des contributeurs</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img src="/Contributors/prince.jpg" alt="Prince Kouamé" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img src="/Contributors/Kouame_Thibaut.jpg" alt="Kouame Thibaut" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img src="https://us.123rf.com/450wm/afe207/afe2071602/afe207160200158/52329668-male-avatar-profile-picture-silhouette-light-shadow.jpg" alt="Contributor" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img src="https://us.123rf.com/450wm/afe207/afe2071602/afe207160200158/52329668-male-avatar-profile-picture-silhouette-light-shadow.jpg" alt="Contributor" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img src="https://us.123rf.com/450wm/afe207/afe2071602/afe207160200158/52329668-male-avatar-profile-picture-silhouette-light-shadow.jpg" alt="Contributor" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900 text-slate-500 font-bold">
              +500
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Notre communauté s'agrandit chaque jour. Ingénieurs logiciels, experts en cybersécurité, data scientists... s'unissent pour façonner l'avenir technologique de la Côte d'Ivoire.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;