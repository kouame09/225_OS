import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command, User, Star, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { getProjects } from '../services/projectService';

interface SearchModalPublicProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModalPublic: React.FC<SearchModalPublicProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Fetch projects when modal opens
    useEffect(() => {
        if (isOpen && projects.length === 0) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await getProjects();
                    setProjects(data);
                } catch (error) {
                    console.error('Error fetching projects:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [isOpen, projects.length]);

    // Focus input when modal opens and lock body scroll
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = 'hidden';
            setQuery('');
            setFilteredProjects([]);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle Search Logic
    useEffect(() => {
        if (!query.trim()) {
            setFilteredProjects([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = projects.filter(project =>
            project.name.toLowerCase().includes(lowerQuery) ||
            project.author.toLowerCase().includes(lowerQuery) ||
            project.description.toLowerCase().includes(lowerQuery) ||
            project.stacks.some(stack => stack.toLowerCase().includes(lowerQuery))
        ).slice(0, 5); // Limit to top 5 results for cleaner UI

        setFilteredProjects(results);
    }, [query, projects]);

    // Handle Keyboard Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleProjectClick = (project: Project) => {
        onClose();
        navigate(`/project/${project.slug}`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5 transform transition-all animate-in fade-in zoom-in-95 duration-200">

                {/* Search Header */}
                <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800">
                    <Search className="h-5 w-5 text-slate-400 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder-slate-400"
                        placeholder="Rechercher des projets, technos ou auteurs..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="sr-only">Close</span>
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
                                <Command className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Tapez pour commencer la recherche...
                            </p>
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <div className="py-2">
                            <div className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Projets
                            </div>
                            <ul className="space-y-1 px-2">
                                {filteredProjects.map((project) => (
                                    <li key={project.id}>
                                        <button
                                            onClick={() => handleProjectClick(project)}
                                            className="group flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer w-full text-left"
                                        >
                                            {/* Thumbnail */}
                                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                                {project.imageUrl ? (
                                                    <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="font-bold text-slate-400 text-xs">{project.name.substring(0, 2)}</span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                                        {project.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                                                        <Star size={10} fill="currentColor" /> {project.stars}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="flex items-center gap-1">
                                                        <User size={10} /> {project.author}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="truncate max-w-[200px]">{project.description}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Aucun projet trouvé pour "{query}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-950/50 px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{projects.length}</span> projets indexés
                    </span>
                    <div className="hidden sm:flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1 py-0.5 font-sans">↑</kbd>
                            <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1 py-0.5 font-sans">↓</kbd>
                            pour naviguer
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1 py-0.5 font-sans">↵</kbd>
                            pour sélectionner
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModalPublic;
