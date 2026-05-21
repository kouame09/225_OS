import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, BookOpen, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Article, Pitch } from '../types';
import { getArticles } from '../services/articleService';
import { getPitches } from '../services/pitchService';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'article' | 'pitch';
}

interface SearchResult {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    tags?: string[];
    author?: string;
    imageUrl?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, type }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [items, setItems] = useState<Article[] | Pitch[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const config = {
        article: {
            placeholder: 'Rechercher des articles, tutoriels, tips...',
            label: 'Articles',
            icon: <BookOpen size={14} />,
            color: 'text-emerald-500',
            fetchFn: getArticles,
            filterFn: (item: Article | Pitch, q: string) => {
                const a = item as Article;
                return (
                    a.title?.toLowerCase().includes(q) ||
                    a.summary?.toLowerCase().includes(q) ||
                    (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
                );
            },
            mapFn: (item: Article | Pitch): SearchResult => {
                const a = item as Article;
                return {
                    id: a.id,
                    title: a.title,
                    subtitle: a.summary,
                    slug: `/articles/${a.slug}`,
                    tags: a.tags,
                    author: a.user?.full_name || a.user?.username,
                    imageUrl: a.image_url,
                };
            },
        },
        pitch: {
            placeholder: 'Rechercher une idée, un projet, un mot-clé...',
            label: 'Pitches',
            icon: <Lightbulb size={14} />,
            color: 'text-amber-500',
            fetchFn: getPitches,
            filterFn: (item: Article | Pitch, q: string) => {
                const p = item as Pitch;
                return (
                    p.project_name?.toLowerCase().includes(q) ||
                    p.pitch?.toLowerCase().includes(q)
                );
            },
            mapFn: (item: Article | Pitch): SearchResult => {
                const p = item as Pitch;
                return {
                    id: p.id,
                    title: p.project_name,
                    subtitle: p.pitch,
                    slug: `/pitchhub/${p.slug}`,
                    author: p.user?.full_name || p.user?.username || p.location,
                    imageUrl: undefined,
                };
            },
        },
    };

    const currentConfig = config[type];

    useEffect(() => {
        if (isOpen && !dataLoaded) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await currentConfig.fetchFn();
                    const filtered = type === 'article'
                        ? (data as Article[]).filter(a => a.status === 'published')
                        : data;
                    setItems(filtered);
                    setDataLoaded(true);
                } catch (error) {
                    console.error('Error fetching search data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [isOpen, dataLoaded, type, currentConfig.fetchFn]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = 'hidden';
            setQuery('');
            setResults([]);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = items
            .filter(item => currentConfig.filterFn(item, lowerQuery))
            .slice(0, 8)
            .map(currentConfig.mapFn);

        setResults(filtered);
    }, [query, items, currentConfig]);

    const handleResultClick = (slug: string) => {
        onClose();
        navigate(slug);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5 transform transition-all animate-in fade-in zoom-in-95 duration-200">
                {/* Search Header */}
                <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800">
                    <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder-slate-400"
                        placeholder={currentConfig.placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 ml-2"
                    >
                        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            ESC
                        </kbd>
                        <X className="sm:hidden h-5 w-5" />
                    </button>
                </div>

                {/* Results Body */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {loading ? (
                        <div className="py-12 flex justify-center">
                            <Loader2 className="animate-spin h-8 w-8 text-emerald-500" />
                        </div>
                    ) : query.trim() === '' ? (
                        <div className="py-12 text-center">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                                <Search className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Tapez pour commencer la recherche...
                            </p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="py-2">
                            <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <span className={currentConfig.color}>{currentConfig.icon}</span>
                                {currentConfig.label}
                            </div>
                            <ul className="space-y-1 px-2">
                                {results.map((result) => (
                                    <li key={result.id}>
                                        <button
                                            onClick={() => handleResultClick(result.slug)}
                                            className="group flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer w-full text-left"
                                        >
                                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                                {result.imageUrl ? (
                                                    <img src={result.imageUrl} alt="" className="h-full w-full object-cover" />
                                                ) : type === 'article' ? (
                                                    <BookOpen size={16} className="text-slate-400" />
                                                ) : (
                                                    <Lightbulb size={16} className="text-slate-400" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                                    {result.title}
                                                </h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                    {result.subtitle}
                                                </p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Aucun résultat pour "{query}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-950/50 px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{items.length}</span> {currentConfig.label.toLowerCase()} indexés
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
