import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Terminal,
  Cpu,
  Globe,
  Shield,
  Users,
  Github
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
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Abstract Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
        <div className="absolute top-20 right-0 w-[600px] h-[400px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] -z-10 opacity-40"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            The #1 Open Source Community in West Africa
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
            Build the Future of <br />
            <span className="text-transparent bg-clip-text bg-emerald-600 dark:from-emerald-400 dark:to-blue-400">Ivorian Tech</span> Together
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            Discover, showcase, and contribute to cutting-edge open source projects built by the most talented developers from Côte d'Ivoire and beyond.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-base hover:bg-slate-800 dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              Join the Community
              <ArrowRight size={20} />
            </button>
            <Link
              to="/why"
              className="w-full sm:w-auto px-7 py-3.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Learn More
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">500+</p>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1">Developers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">120+</p>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">50+</p>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1">Startups</p>
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
              <div className="lg:w-1/2 w-full flex justify-center perspective-1000">
                <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 flex items-center justify-center transform transition hover:scale-[1.02] duration-500">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shine_4s_linear_infinite] opacity-10 rounded-3xl pointer-events-none"></div>

                  {/* Floating Phone UI */}
                  <div className="relative w-48 h-80 bg-slate-900 rounded-[2rem] border-4 border-slate-800 overflow-hidden flex flex-col z-20 transform rotate-[-6deg] translate-x-4">
                    <div className="h-full bg-slate-950 p-4 flex flex-col relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-xl"></div>
                      <div className="mt-8 space-y-3">
                        <div className="h-20 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex flex-col items-center justify-center">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mb-1">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                          <div className="text-[10px] text-emerald-400 font-bold">Payment Success</div>
                        </div>
                        <div className="h-2 w-1/2 bg-slate-800 rounded-full"></div>
                        <div className="h-2 w-3/4 bg-slate-800 rounded-full"></div>
                        <div className="h-32 bg-slate-800/50 rounded-xl mt-4 border border-slate-800 border-dashed"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Code Snippet Card behind phone */}
                  <div className="absolute left-8 bottom-12 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-4 border border-slate-200 dark:border-slate-600 z-10 transform rotate-[3deg]">
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
                  Local Solutions
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Solve Real Challenges <br /> with Local Code
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Silicon Valley won't solve Abidjan's problems. Whether it's integrating <span className="text-slate-900 dark:text-white font-semibold">Mobile Money APIs</span>, digitizing agriculture, or optimizing transport, open source allows us to build solutions tailored to our reality.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <CheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">Adapt tools to Wave, Orange Money, and MTN.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <CheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">Build offline-first apps for low-bandwidth areas.</span>
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
              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex items-center justify-center">
                  {/* Abstract Contribution Grid Background */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-20 grid grid-cols-12 gap-1 p-8">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${Math.random() > 0.7 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                    ))}
                  </div>

                  {/* Profile Card */}
                  <div className="relative z-10 w-64 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
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
                        <div className="text-[10px] text-slate-500 uppercase">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">5</div>
                        <div className="text-[10px] text-slate-500 uppercase">Stars</div>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold">
                      View Profile
                    </button>

                    {/* Hired Badge */}
                    <div className="absolute -right-6 -top-6 bg-emerald-500 text-white px-4 py-2 rounded-lg transform rotate-12 flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span className="font-bold text-sm">HIRED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Terminal size={14} />
                  Career Booster
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Your Code is Your <br /> New Resume
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  In a competitive market, a PDF CV isn't enough. Contributing to open source gives you <span className="text-slate-900 dark:text-white font-semibold">proof of competence</span>. It helps local companies find hidden gems and allows you to land remote jobs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>Showcase your coding style and collaboration skills.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>Get recognized by top tech companies in West Africa.</span>
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
              <div className="lg:w-1/2 w-full flex justify-center">
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
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                      </div>
                    ))}
                  </div>

                  {/* Shield Overlay */}
                  <div className="absolute z-20 bg-slate-950/80 backdrop-blur-sm border border-purple-500/50 p-4 rounded-2xl flex flex-col items-center gap-2 transform translate-y-8 group-hover:translate-y-6 transition-transform">
                    <Shield size={32} className="text-purple-500" />
                    <span className="text-xs font-bold text-white tracking-widest">OWN YOUR DATA</span>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Cpu size={14} />
                  Sovereignty
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Build Independent <br /> Infrastructure
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Dependency on expensive foreign software limits our growth. By championing open source in Côte d'Ivoire, we are building a <span className="text-slate-900 dark:text-white font-semibold">resilient digital infrastructure</span> that belongs to us.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  We create tools that are accessible, modifiable, and owned by the community, reducing reliance on costly proprietary SaaS.
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
              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 flex items-center justify-center overflow-hidden">
                  {/* Connecting Lines (CSS) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[80%] h-[1px] bg-slate-300 dark:bg-slate-700 rotate-45"></div>
                    <div className="absolute w-[80%] h-[1px] bg-slate-300 dark:bg-slate-700 -rotate-45"></div>
                    <div className="absolute w-[1px] h-[80%] bg-slate-300 dark:bg-slate-700"></div>
                    <div className="absolute w-[80%] h-[1px] bg-slate-300 dark:bg-slate-700"></div>
                  </div>

                  {/* Satellite Nodes */}
                  <div className="absolute top-12 left-12 w-12 h-12 bg-white dark:bg-slate-800 rounded-full border-2 border-pink-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white">ABJ</div>
                  <div className="absolute bottom-12 right-12 w-12 h-12 bg-white dark:bg-slate-800 rounded-full border-2 border-orange-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white">YOP</div>
                  <div className="absolute top-12 right-12 w-12 h-12 bg-white dark:bg-slate-800 rounded-full border-2 border-blue-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white">COC</div>
                  <div className="absolute bottom-12 left-12 w-12 h-12 bg-white dark:bg-slate-800 rounded-full border-2 border-emerald-500 z-10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white">BKE</div>

                  {/* Central Hub */}
                  <div className="relative z-20 w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-100 dark:border-slate-700 animate-pulse">
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
                  Unity
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Uniting the "Tech Maquis"
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  From freelancers in Cocody to startups in Yopougon, the Ivorian tech scene is vibrant but scattered. This platform acts as the <span className="text-slate-900 dark:text-white font-semibold">central hub</span>—where developers meet, collaborate, and lift each other up through code reviews and shared knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* --- CONTRIBUTORS / COMMUNITY SECTION --- */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Join Top Ivorian Contributors</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
                <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Contributor" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900 text-slate-500 font-bold">
              +500
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our community is growing every day. Developers, designers, and innovators are coming together to shape the future of West Africa.
          </p>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-emerald-950 rounded-[2.5rem] p-10 sm:p-20 text-center relative overflow-hidden group">
          {/* Decor elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none group-hover:bg-emerald-500/30 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Ready to put CI on the map?</h2>
            <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Don't let your code gather dust. Add your project to 225 Open Source and inspire the next generation of Ivorian developers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/princekouame/africode-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Github size={20} />
                View on GitHub
              </a>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-xl transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;