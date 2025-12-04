import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Terminal, Loader2, Lock } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SearchModal from '../components/SearchModal';
import { Project } from '../types';
import { getProjects } from '../services/projectService';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';

const Explore: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [selectedStack, setSelectedStack] = useState<string | null>(null);

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            setIsAuthOpen(true);
        }
    }, [user, authLoading]);

    useEffect(() => {
        // Only fetch if user is logged in
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchData();
        }
    }, [user, authLoading]);

    // Keyboard shortcut to open search (Cmd+K or Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                if (user) {
                    e.preventDefault();
                    setIsSearchOpen(true);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [user]);

    const allStacks = useMemo(() => {
        const stacks = new Set<string>();
        projects.forEach(p => p.stacks.forEach(s => stacks.add(s)));
        return Array.from(stacks).sort();
    }, [projects]);

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesStack = selectedStack ? project.stacks.includes(selectedStack) : true;
            return matchesStack;
        });
    }, [projects, selectedStack]);

    if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="animate-spin text-emerald-500" /></div>;

    // Show auth modal if not logged in, but don't show the restricted access UI
    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24">
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                projects={projects}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Projects Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 mt-4">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider text-sm">
                            <Terminal size={16} />
                            <span>Project Space</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Explore Projects
                        </h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl">
                            Browse through a curated list of open-source tools, libraries, and applications built by the community.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-full md:w-auto min-w-[300px] flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <Search size={18} />
                            <span>Search projects...</span>
                        </div>
                        <div className="flex gap-1">
                            <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 dark:border-slate-700 px-2 text-xs font-sans font-medium text-slate-400">
                                ⌘K
                            </kbd>
                        </div>
                    </button>
                </div>

                {/* Filters */}
                <div className="mb-10 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedStack(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${selectedStack === null
                                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'
                                }`}
                        >
                            All Stacks
                        </button>
                        {allStacks.map(stack => (
                            <button
                                key={stack}
                                onClick={() => setSelectedStack(stack === selectedStack ? null : stack)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${stack === selectedStack
                                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'
                                    }`}
                            >
                                {stack}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-emerald-500" size={32} />
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onTagClick={(tag) => setSelectedStack(tag)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
                        <Filter className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No projects found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => setSelectedStack(null)}
                            className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;