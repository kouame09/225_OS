import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Github, Terminal, User, LogOut, LayoutDashboard, Compass, Heart, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import SearchModalPublic from './SearchModalPublic';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
      <div className={`fixed top-4 right-4 z-[70] w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl transition-all duration-300 origin-top-right transform md:hidden ${isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Menu</span>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg text-slate-500 bg-slate-50 dark:bg-slate-800 leading-none">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {location.pathname === '/' && (
            <button
              onClick={() => { setIsSearchOpen(true); closeMobileMenu(); }}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              <Search size={18} />
              <span>Rechercher</span>
            </button>
          )}

          <Link
            to="/explore"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            <Compass size={18} />
            <span>Explorer</span>
          </Link>

          <a
            href="https://github.com/kouame09/225_OS"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            <Github size={18} />
            <span>Soutenir</span>
          </a>

          <Link
            to="/donate"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 w-full p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold transition-colors"
          >
            <Heart size={18} />
            <span>Faire un don</span>
          </Link>

          {user ? (
            <div className="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold transition-colors"
              >
                <LayoutDashboard size={18} />
                <span>Mon Dashboard</span>
              </Link>
              <button
                onClick={() => { signOut(); closeMobileMenu(); }}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-medium transition-colors"
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setIsAuthOpen(true); closeMobileMenu(); }}
              className="mt-2 flex items-center gap-3 w-full p-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold"
            >
              <User size={18} />
              <span>Connexion</span>
            </button>
          )}
        </div>
      </div>

      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                <span className="text-emerald-600 dark:text-emerald-400">225OS</span>
              </span>
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

              {location.pathname !== '/explore' && location.pathname !== '/' && (
                <Link
                  to="/explore"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Compass size={14} />
                  <span>Explorer</span>
                </Link>
              )}

              <a
                href="https://github.com/kouame09/225_OS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Github size={14} />
                <span>Soutenir</span>
              </a>

              {location.pathname !== '/donate' && (
                <Link
                  to="/donate"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <Heart size={14} />
                  <span>Donation</span>
                </Link>
              )}

              {user && (
                <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-4">
                  {location.pathname !== '/dashboard' && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      <LayoutDashboard size={18} />
                      <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={signOut}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="Se déconnecter"
                  >
                    <LogOut size={18} />
                  </button>
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
                className={`p-2 rounded-xl border transition-all ${isMobileMenuOpen
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
              >
                <User size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};


export default Navbar;