import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug } from '../services/articleService';
import { Article } from '../types';
import { BookOpen, Calendar, Clock, User, ChevronLeft, ArrowRight, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import { parseMarkdownToHtml } from '../utils/markdownParser';

const ArticleDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.summary,
          url: window.location.href
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error("Failed to load article in Details page", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">Chargement de la lecture...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 flex flex-col items-center justify-center text-center px-4">
        <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Article introuvable</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          L'article que vous cherchez n'existe pas ou son adresse a été modifiée.
        </p>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all"
        >
          <ChevronLeft size={18} />
          <span>Retour aux articles</span>
        </Link>
      </div>
    );
  }

  const readTime = Math.ceil((article.content || '').split(/\s+/).filter(Boolean).length / 200) || 1;
  const parsedContent = parseMarkdownToHtml(article.content);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-500 text-sm font-bold transition-all mb-8 cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Tous les articles</span>
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>

          {/* Author metadata panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${article.user_id}`} className="shrink-0">
                {article.user?.avatar_url ? (
                  <img
                    src={article.user.avatar_url}
                    alt={article.user.full_name || 'Auteur'}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center shadow-sm">
                    <User size={18} />
                  </div>
                )}
              </Link>
              <div className="flex flex-col">
                <Link
                  to={`/profile/${article.user_id}`}
                  className="font-bold text-slate-950 dark:text-white hover:text-emerald-500 transition-colors text-sm"
                >
                  {article.user?.full_name || (article.user_id === 'd9751b0d-7e14-4dd9-b715-915d324f64e3' ? 'Prince Kouamé' : 'Membre 225OS')}
                </Link>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Auteur
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {readTime} min de lecture
              </span>
            </div>
          </div>
        </header>

        {/* Large Cover Image */}
        {article.image_url && (
          <div className="w-full aspect-[2/1] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md mb-12">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Article Summary Quote */}
        <div className="p-6 bg-slate-100 dark:bg-slate-900 border-l-4 border-slate-300 dark:border-slate-700 rounded-r-2xl mb-8">
          <p className="text-slate-600 dark:text-slate-300 italic text-base leading-relaxed">
            "{article.summary}"
          </p>
        </div>

        {/* Article Body */}
        <div className="max-w-none mb-12 pb-12 border-b border-slate-200 dark:border-slate-800">
          <div 
            className="text-slate-800 dark:text-slate-200 space-y-4"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </div>

        {/* Share Section & Footer Tags */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Partager :</span>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 cursor-pointer shadow-sm transition-all"
            >
              <Share2 size={14} />
              <span>Partager</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 cursor-pointer shadow-sm transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <LinkIcon size={14} />}
              <span className={copied ? 'text-emerald-500' : ''}>{copied ? 'Copié !' : 'Copier le lien'}</span>
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title || '')}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 rounded-xl text-slate-500 hover:text-sky-500 bg-white dark:bg-slate-900 cursor-pointer shadow-sm transition-all"
            >
              <Twitter size={14} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article?.title || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 border border-slate-200 dark:border-slate-800 hover:border-blue-600/50 rounded-xl text-slate-500 hover:text-blue-600 bg-white dark:bg-slate-900 cursor-pointer shadow-sm transition-all"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArticleDetails;
