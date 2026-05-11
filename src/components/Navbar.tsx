import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Github, Terminal, User, LogOut, LayoutDashboard, Compass, Heart, Search, Users, Star, Rocket, Lightbulb, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import SearchModalPublic from './SearchModalPublic';
import { fetchGithubMetadata } from '../services/githubService';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const REPO_URL = 'https://github.com/kouame09/225_OS';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const getStars = async () => {
      try {
        const data = await fetchGithubMetadata(REPO_URL);
        setStarCount(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching stars:', error);
      }
    };
    getStars();
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const formatStars = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView="signup"
      />
      <SearchModalPublic
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Popup */}
      <div className={`fixed top-16 right-4 z-[70] w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl transition-all duration-300 origin-top-right transform md:hidden ${isMobileMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'
        }`}>
        <div className="p-2">
          {user ? (
            <div className="px-4 py-4 mb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Session active</p>
                <button onClick={toggleDarkMode} className="p-1.5 rounded-lg text-slate-500 bg-slate-50 dark:bg-slate-800 transition-colors">
                  {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                </button>
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.email}</p>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4 py-3 mb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Menu</span>
              <button onClick={toggleDarkMode} className="p-1.5 rounded-lg text-slate-500 bg-slate-50 dark:bg-slate-800 transition-colors">
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          )}

          <div className="space-y-1">
            {location.pathname === '/' && (
              <button
                onClick={() => { setIsSearchOpen(true); closeMobileMenu(); }}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition-colors"
              >
                <Search size={18} className="text-emerald-500" />
                <span>Rechercher</span>
              </button>
            )}

            {user && (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl font-bold transition-colors ${location.pathname === '/dashboard'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  <LayoutDashboard size={18} className="text-emerald-500" />
                  <span>Mon Dashboard</span>
                </Link>

                <div className="py-2 px-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Navigation</p>
                </div>

                <Link
                  to="/explore"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl font-bold transition-colors ${location.pathname === '/explore'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  <Compass size={18} />
                  <span>Explorer</span>
                </Link>

                <Link
                  to="/launchpad"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl font-bold transition-colors ${location.pathname.startsWith('/launchpad')
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  <Rocket size={18} />
                  <span>Launchpad</span>
                </Link>

                <Link
                  to="/pitchhub"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl font-bold transition-colors ${location.pathname.startsWith('/pitchhub')
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  <Lightbulb size={18} />
                  <div className="flex items-center gap-2">
                    <span>PitchHub</span>
                    <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                      New
                    </span>
                  </div>
                </Link>
              </>
            )}

            <Link
              to="/donate"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 w-full p-3 rounded-xl font-black transition-colors ${location.pathname === '/donate'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                : 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/20'
                }`}
            >
              <Heart size={18} />
              <span>Soutenir 225OS</span>
            </Link>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition-colors"
            >
              <div className="flex items-center gap-3">
                <Github size={18} />
                <span>GitHub</span>
              </div>
              {starCount !== null && (
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-600 dark:text-slate-400">
                  <Star size={10} className="fill-current text-amber-500" />
                  <span>{formatStars(starCount)}</span>
                </div>
              )}
            </a>

            {user ? (
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => { signOut(); closeMobileMenu(); }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-black transition-colors"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsAuthOpen(true); closeMobileMenu(); }}
                className="mt-2 flex items-center gap-3 w-full p-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black justify-center shadow-lg"
              >
                <User size={18} />
                <span>Connexion</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={darkMode ? "/logo_white.png" : "/logo_color.png"}
                alt="225OS Logo"
                className="h-8 w-auto -ml-2"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6">
              {location.pathname === '/' && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Rechercher"
                >
                  <Search size={20} />
                </button>
              )}

              {user && (
                <>
                  <Link
                    to="/explore"
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${location.pathname === '/explore'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
                      : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    <Compass size={14} />
                    <span>Explorer</span>
                  </Link>



                  <Link
                    to="/launchpad"
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${location.pathname.startsWith('/launchpad')
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
                      : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    <Rocket size={14} />
                    <span>Launchpad</span>
                  </Link>

                  <Link
                    to="/pitchhub"
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${location.pathname.startsWith('/pitchhub')
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
                      : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    <Lightbulb size={14} />
                    <span>PitchHub</span>
                    <span className="bg-emerald-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                      New
                    </span>
                  </Link>
                </>
              )}

              {!user && (
                <>
                  <Link
                    to="/donate"
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${location.pathname === '/donate'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
                      : 'text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                      }`}
                  >
                    <Heart size={14} />
                    <span>Soutenir</span>
                  </Link>
                </>
              )}

              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
                {starCount !== null && (
                  <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 ml-1 pl-2 text-slate-500 dark:text-slate-400 transition-colors">
                    <Star size={12} className="fill-current text-amber-500" />
                    <span className="font-bold">{formatStars(starCount)}</span>
                  </div>
                )}
              </a>

              {user && (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <User size={18} />
                    </div>
                  </button>

                  {/* Desktop User Dropdown */}
                  <div className={`absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl transition-all duration-300 origin-top-right transform ${isUserMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-2 pointer-events-none'
                    }`}>
                    <div className="p-2">
                      <div className="px-4 py-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Session active</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-colors ${location.pathname === '/dashboard'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                        >
                          <LayoutDashboard size={18} />
                          <span>Mon Dashboard</span>
                        </Link>

                        <Link
                          to="/donate"
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-colors ${location.pathname === '/donate'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                        >
                          <Heart size={18} />
                          <span>Soutenir 225OS</span>
                        </Link>

                        <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-medium transition-colors"
                          >
                            <LogOut size={18} />
                            <span>Déconnexion</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Profile Icon */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-1 rounded-full border transition-all overflow-hidden ${isMobileMenuOpen
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
                  }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isMobileMenuOpen
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                  <User size={18} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
