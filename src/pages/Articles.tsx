import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Search, Calendar, Clock, User, ArrowRight, Loader2, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/articleService';
import { Article } from '../types';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import SearchModal from '../components/SearchModal';

const CATEGORIES = [
  "Tutoriels & Guides",
  "Astuces & Raccourcis",
  "Rex & Retours d'expérience",
  "Architecture & Clean Code",
  "Tendances & Actu Tech",
  "Conseils & Carrière"
];

const Articles: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        console.error("Failed to load articles in Articles page", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllArticles();
  }, []);

  // Filter & Search Logic
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesCategory;
    });
  }, [articles, selectedCategory]);

  // Reading time estimator helper
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content ? content.split(/\s+/).filter(Boolean).length : 0;
    return Math.ceil(words / wordsPerMinute) || 1;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <SearchModal type="article" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider text-sm">
              <BookOpen size={16} />
              <span>Articles & DevBlog</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Espace <span className="text-emerald-500">Connaissances</span>
            </h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Des tutoriels, des tips, des conseils, des retours d'expérience et les dernières actualités tech importantes partagés par les pros de la tech du pays.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold rounded-2xl hover:border-emerald-500/40 transition-all shadow-sm"
            >
              <Search size={18} />
              <span>Rechercher</span>
            </button>

            <Link
              to={user ? "/my-articles" : "#"}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  setIsAuthModalOpen(true);
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-slate-200 dark:shadow-none"
            >
              <Plus size={20} className="text-white dark:text-slate-900" />
              <span>Écrire un article</span>
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mb-10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                }`}
            >
              Tous
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
            <p className="text-slate-500 font-medium">Chargement des articles...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const readTime = getReadingTime(article.content);
              return (
                <article
                  key={article.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/[0.03] hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full"
                >

                  {/* Card Cover Image */}
                  <Link to={`/articles/${article.slug}`} className="h-36 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950 shrink-0">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `
                            <div class="text-slate-300 dark:text-slate-700">
                              <BookOpen size={48} />
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="text-slate-300 dark:text-slate-700 flex flex-col items-center gap-1">
                        <BookOpen size={48} />
                        <span className="text-[10px] font-bold tracking-widest uppercase">225OS</span>
                      </div>
                    )}

                    {/* Category Overlay Tag */}
                    <span className="absolute top-4 left-4 bg-emerald-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-md">
                      {article.category}
                    </span>
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Meta reading & date */}
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {readTime} min de lecture
                        </span>
                      </div>

                      <Link to={`/articles/${article.slug}`}>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div>
                      {/* Tags list */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {article.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Author Info & Read Link */}
                      <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                        <div className="flex items-center gap-3">
                          <Link to={`/profile/${article.user_id}`} className="shrink-0">
                            {article.user?.avatar_url ? (
                              <img
                                src={article.user.avatar_url}
                                alt={article.user.full_name || 'Auteur'}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                                <User size={14} />
                              </div>
                            )}
                          </Link>
                          <div className="flex flex-col text-left">
                          <Link to={`/profile/${article.user_id}`} className="text-xs font-bold text-slate-950 dark:text-white hover:text-emerald-500 transition-colors">
                            {article.user?.full_name || (article.user_id === 'd9751b0d-7e14-4dd9-b715-915d324f64e3' ? 'Prince Kouamé' : 'Membre 225OS')}
                          </Link>
                          <span className="text-[9px] text-slate-400 font-medium">
                            Auteur
                          </span>
                          </div>
                        </div>

                        <Link
                          to={`/articles/${article.slug}`}
                          className="flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 hover:translate-x-1 transition-transform"
                        >
                          <span>Lire</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucun article trouvé</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Nous n'avons trouvé aucun article technique correspondant à votre recherche. Soyez le premier à rédiger !
            </p>
            <Link
              to={user ? "/my-articles" : "#"}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  setIsAuthModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Plus size={18} />
              <span>Publier un article</span>
            </Link>
          </div>
        )}

      </div>

    </div>
  );
};

export default Articles;
