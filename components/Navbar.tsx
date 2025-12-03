import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Github, Terminal, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                <Terminal size={20} strokeWidth={3} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Afri<span className="text-emerald-600 dark:text-emerald-400">Code</span> Hub
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link 
              to="/explore" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/explore' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Explore
            </Link>

            {/* GitHub Repo Link */}
             <a 
               href="https://github.com/princekouame/africode-hub" 
               target="_blank"
               rel="noopener noreferrer"
               className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
             >
               <Github size={14} />
               <span>Star</span>
             </a>

            {user ? (
                <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-4">
                     <Link 
                        to="/dashboard"
                        className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                     >
                        <LayoutDashboard size={18} />
                        <span className="hidden sm:inline">Dashboard</span>
                     </Link>
                     <button
                        onClick={signOut}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Sign Out"
                     >
                        <LogOut size={18} />
                     </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsAuthOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg transition-colors shadow-sm"
                >
                    <User size={16} />
                    <span>Join</span>
                </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;