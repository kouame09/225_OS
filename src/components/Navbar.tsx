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
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-500 dark:bg-orange-400 text-white dark:text-slate-900 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                <span className="text-emerald-600 dark:text-emerald-400">225OS</span>
              </span>
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
              {/* Search Button - only on landing page */}
              {location.pathname === '/' && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Rechercher"
                  title="Rechercher des projets"
                >
                  <Search size={20} />
                </button>
              )}

              {location.pathname !== '/donate' && location.pathname !== '/' && location.pathname !== '/explore' && location.pathname !== '/why' && location.pathname !== '/privacy' && location.pathname !== '/contact' && (
                <Link
                  to="/explore"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Compass size={14} />
                  <span>Explorer</span>
                </Link>
              )}

              {/* GitHub Repo Link */}
              <a
                href="https://github.com/kouame09/225_OS"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Github size={14} />
                <span>Soutenir</span>
              </a>

              {/* Donation Link */}
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
                aria-label="Changer de thème"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;