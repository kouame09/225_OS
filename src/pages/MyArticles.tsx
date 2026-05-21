import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Article } from '../types';
import { getUserArticles, addArticle, updateArticle, deleteArticle } from '../services/articleService';
import { Loader2, Plus, Edit3, Trash2, BookOpen, X, Image as ImageIcon, Sparkles, LayoutGrid, Calendar, ChevronLeft, Eye, Clock, FileEdit, FileCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MarkdownEditor from '../components/MarkdownEditor';
import ConfirmModal from '../components/ConfirmModal';
import { slugify } from '../utils/slugify';
import { parseMarkdownToHtml } from '../utils/markdownParser';

const CATEGORIES = [
  "Tutoriels & Guides",
  "Astuces & Raccourcis",
  "Rex & Retours d'expérience",
  "Architecture & Clean Code",
  "Tendances & Actu Tech",
  "Conseils & Carrière"
];

const MyArticles: React.FC = () => {
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [isSaving, setIsSaving] = useState(false);

  // Delete State
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preview Modal State
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const fetchArticles = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const data = await getUserArticles(user.id);
      setArticles(data);
    } catch (error) {
      console.error(error);
      addNotification('error', 'Échec du chargement', 'Impossible de charger vos articles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchArticles();
    }
  }, [user?.id]);

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle('');
    setCategory(CATEGORIES[0]);
    setImageUrl('');
    setSummary('');
    setContent('');
    setTagsInput('');
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setImageUrl(article.image_url || '');
    setSummary(article.summary);
    setContent(article.content);
    setTagsInput(article.tags ? article.tags.join(', ') : '');
    setStatus(article.status || 'published');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      addNotification('error', 'Formulaire incomplet', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (!user?.id) return;

    setIsSaving(true);
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== '');

    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, {
          title,
          category,
          image_url: imageUrl || undefined,
          summary,
          content,
          tags,
          status
        });
        addNotification('success', status === 'draft' ? 'Brouillon enregistré' : 'Article modifié', status === 'draft' ? 'Votre article a été sauvegardé en brouillon.' : 'Votre article a été mis à jour avec succès.');
      } else {
        await addArticle({
          user_id: user.id,
          title,
          category,
          image_url: imageUrl || undefined,
          summary,
          content,
          tags,
          status
        });
        addNotification('success', status === 'draft' ? 'Brouillon créé' : 'Article publié', status === 'draft' ? 'Votre article a été sauvegardé en brouillon.' : 'Votre article a été publié avec succès.');
      }
      setIsModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error(error);
      addNotification('error', 'Erreur de sauvegarde', 'Impossible de sauvegarder votre article.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);
    try {
      await deleteArticle(articleToDelete.id);
      addNotification('success', 'Article supprimé', 'L\'article a bien été supprimé.');
      setArticles(prev => prev.filter(a => a.id !== articleToDelete.id));
      setArticleToDelete(null);
    } catch (error) {
      console.error(error);
      addNotification('error', 'Erreur', 'Impossible de supprimer cet article.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Live Auto-Generated Slug Preview
  const liveSlug = title.trim() ? slugify(title) : 'votre-titre-de-l-article';

  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content ? content.split(/\s+/).filter(Boolean).length : 0;
    return Math.ceil(words / wordsPerMinute) || 1;
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-emerald-500" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link & Header */}
        <div className="mb-10">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-500 text-sm font-bold transition-colors mb-4"
          >
            <ChevronLeft size={16} />
            <span>Retour au Dashboard</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <BookOpen className="text-emerald-500" />
                <span>Gérer mes Articles</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Créez, modifiez et partagez vos articles techniques avec le Gbonhi.
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus size={20} />
              <span>Écrire un article</span>
            </button>
          </div>
        </div>

        {/* User Articles List - Row Layout */}
        {articles.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mes Articles ({articles.length})</h2>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {articles.map((article) => {
                const readTime = getReadingTime(article.content);
                return (
                  <div
                    key={article.id}
                    className="group px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Cover Image Thumbnail */}
                      {article.image_url ? (
                        <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      ) : (
                        <div className="shrink-0 w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
                          <BookOpen size={24} />
                        </div>
                      )}

                      {/* Article Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {article.category}
                          </span>
                          {article.status === 'draft' && (
                            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                              <FileEdit size={10} />
                              Brouillon
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-emerald-500 transition-colors truncate">
                          {article.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                          {article.summary}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] font-medium text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {readTime} min
                          </span>
                          {article.tags && article.tags.length > 0 && (
                            <span className="flex items-center gap-1">
                              {article.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-slate-400">#{tag}</span>
                              ))}
                              {article.tags.length > 2 && <span className="text-slate-400">+{article.tags.length - 2}</span>}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex items-center gap-1.5">
                        <button
                          onClick={() => setPreviewArticle(article)}
                          className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all text-xs font-bold cursor-pointer"
                          title="Aperçu"
                        >
                          <Eye size={14} />
                          <span className="hidden sm:inline">Aperçu</span>
                        </button>
                        <button
                          onClick={() => openEditModal(article)}
                          className="flex items-center gap-1.5 px-3 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-lg transition-all text-xs font-bold cursor-pointer"
                          title="Modifier"
                        >
                          <Edit3 size={14} />
                          <span className="hidden sm:inline">Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(article)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <BookOpen size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aucun article publié</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
              Vous n'avez pas encore écrit d'article. Partagez vos astuces, tutoriels ou REX tech avec la communauté !
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
            >
              <Plus size={18} />
              <span>Publier mon premier article</span>
            </button>
          </div>
        )}

        {/* Modal géant plein écran pour création / modification */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-6">
            <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[90vh] sm:h-[85vh] animate-in fade-in-50 zoom-in-95 duration-300">

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {editingArticle ? 'Modifier l\'article' : 'Rédiger un nouvel article'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Form Scrollable */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Article Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Titre de l'article <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Comment maîtriser..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-base font-semibold"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="text-[10px] text-slate-400 italic">
                      Slug auto-généré : <span className="font-mono text-emerald-500 dark:text-emerald-400">{liveSlug}</span>
                    </p>
                  </div>

                  {/* Article Category */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Catégorie <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-base font-semibold cursor-pointer appearance-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status Toggle - Draft / Published */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    {status === 'draft' ? <FileEdit size={14} /> : <FileCheck size={14} />}
                    Statut de l'article
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus('published')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer ${
                        status === 'published'
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <FileCheck size={16} />
                      <span>Publié</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus('draft')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer ${
                        status === 'draft'
                          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-700 dark:text-amber-400'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <FileEdit size={16} />
                      <span>Brouillon</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    {status === 'draft'
                      ? 'Les brouillons ne sont visibles que par vous dans le dashboard.'
                      : 'L\'article sera visible publiquement sur la page Articles.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Cover URL */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <ImageIcon size={14} />
                      <span>URL de l'image de couverture</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-semibold"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Tags (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      placeholder="react, typescript, css"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-semibold"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                    />
                  </div>
                </div>

                {/* Cover Image Preview - Full Width */}
                {imageUrl && imageUrl.trim().length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block flex items-center gap-1">
                      <ImageIcon size={14} />
                      <span>Aperçu de la couverture</span>
                    </label>
                    <div className="relative w-full aspect-[21/9] sm:h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center shadow-inner group">
                      <img
                        src={imageUrl}
                        alt="Aperçu de la couverture"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex flex-col items-center gap-2 text-rose-500 dark:text-rose-400 p-6 text-center select-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                <span class="font-extrabold text-sm">Chargement de l'image impossible</span>
                                <span class="text-xs text-slate-400 font-medium">Veuillez vérifier l'adresse URL saisie</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Résumé de l'article <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Un court résumé accrocheur pour donner envie de lire votre article dans la grille d'exploration..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>

                {/* Content - Custom MarkdownEditor */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Corps de l'article (Markdown) <span className="text-red-500">*</span>
                  </label>
                  <MarkdownEditor
                    value={content}
                    onChange={setContent}
                  />
                </div>

                {/* Actions inside form */}
                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl font-bold disabled:opacity-50 transition-colors cursor-pointer ${
                      status === 'draft'
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {isSaving && <Loader2 size={16} className="animate-spin" />}
                    <span>{editingArticle ? (status === 'draft' ? 'Sauvegarder le brouillon' : 'Enregistrer les modifications') : (status === 'draft' ? 'Sauvegarder en brouillon' : 'Publier l\'article')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Article Preview Modal */}
        {previewArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-6">
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[85vh] sm:h-[80vh] animate-in fade-in-50 zoom-in-95 duration-300">
              {/* Preview Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {previewArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    {getReadingTime(previewArticle.content)} min de lecture
                  </span>
                </div>
                <button
                  onClick={() => setPreviewArticle(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                  {previewArticle.title}
                </h2>

                {previewArticle.image_url && (
                  <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-800">
                    <img
                      src={previewArticle.image_url}
                      alt={previewArticle.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}

                <div className="p-4 bg-slate-100 dark:bg-slate-800 border-l-4 border-emerald-500 rounded-r-xl mb-6">
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">
                    "{previewArticle.summary}"
                  </p>
                </div>

                {previewArticle.tags && previewArticle.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {previewArticle.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className="text-slate-800 dark:text-slate-200 space-y-4 prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(previewArticle.content) }}
                />
              </div>

              {/* Preview Footer */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">
                  Publié le {new Date(previewArticle.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setPreviewArticle(null)}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-transform cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!articleToDelete}
          onClose={() => !isDeleting && setArticleToDelete(null)}
          onConfirm={confirmDelete}
          title="Supprimer l'article"
          message={`Êtes-vous sûr de vouloir supprimer définitivement l'article "${articleToDelete?.title}" ? Cette action est irréversible.`}
          confirmText="Supprimer"
          isDangerous={true}
          isLoading={isDeleting}
        />

      </div>
    </div>
  );
};

export default MyArticles;
