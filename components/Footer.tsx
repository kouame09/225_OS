import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">225 Open Source</p>
          <p className="text-slate-500 text-sm mt-1">
            Dirigé par{' '}
            <a
              href="https://www.princekouame.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white underline font-medium"
            >
              Prince Kouamé
            </a>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link to="/why" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pourquoi 225OS ?</Link>
          <Link to="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Confidentialité</Link>
          <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://www.linkedin.com/company/222opensource" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://github.com/kouame09/225_OS" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
          <div className="text-slate-400 text-sm">
            &copy;225 Open Source <span className="inline-block w-px h-3.5 bg-slate-400 mx-2 align-middle"></span> {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;