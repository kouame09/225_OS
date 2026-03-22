import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Terminal, Loader2, Lock, ChevronLeft, ChevronRight, Megaphone, Gift } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SearchModal from '../components/SearchModal';
import Pagination from '../components/Pagination';
import { Project } from '../types';
import { getProjects } from '../services/projectService';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import { Announcement } from '../types';
import { getAnnouncements } from '../services/announcementService';

const Explore: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [selectedStack, setSelectedStack] = useState<string | null>(null);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
    const [isAutoScrollPausedPromos, setIsAutoScrollPausedPromos] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);

    const activePromos = useMemo(() => announcements.filter(a => a.type === 'promo' && a.is_active), [announcements]);
    const activeEvents = useMemo(() => announcements.filter(a => a.type === 'event' && a.is_active), [announcements]);
    const hasActivePromo = activePromos.length > 0;

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
                // Fetch projects and announcements in parallel
                const [projectsData, announcementsData] = await Promise.all([
                    getProjects(),
                    getAnnouncements()
                ]);

                setProjects(projectsData);
                setAnnouncements(announcementsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                setIsLoadingAnnouncements(false);
            }
        };

        if (!authLoading && user) {
            fetchData();
        }
    }, [user, authLoading]);

    // Auto-scroll events carousel
    useEffect(() => {
        if (activeEvents.length <= 1 || isAutoScrollPaused || hasActivePromo) return;

        const interval = setInterval(() => {
            setCurrentEventIndex((prev) => (prev + 1) % activeEvents.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeEvents.length, isAutoScrollPaused, hasActivePromo]);

    // Auto-scroll promos carousel
    useEffect(() => {
        if (activePromos.length <= 1 || isAutoScrollPausedPromos) return;

        const interval = setInterval(() => {
            setCurrentPromoIndex((prev) => (prev + 1) % activePromos.length);
        }, 6000); // Promos slide slightly slower

        return () => clearInterval(interval);
    }, [activePromos.length, isAutoScrollPausedPromos]);

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

    // Pagination logic
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProjects, currentPage]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStack, projects]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Carousel navigation
    const nextEvent = () => {
        setCurrentEventIndex((prev) => (prev + 1) % activeEvents.length);
        setIsAutoScrollPaused(true);
        setTimeout(() => setIsAutoScrollPaused(false), 10000); // Resume after 10 seconds
    };

    const prevEvent = () => {
        setCurrentEventIndex((prev) => (prev - 1 + activeEvents.length) % activeEvents.length);
        setIsAutoScrollPaused(true);
        setTimeout(() => setIsAutoScrollPaused(false), 10000); // Resume after 10 seconds
    };

    const goToEvent = (index: number) => {
        setCurrentEventIndex(index);
        setIsAutoScrollPaused(true);
        setTimeout(() => setIsAutoScrollPaused(false), 10000);
    };

    const goToPromo = (index: number) => {
        setCurrentPromoIndex(index);
        setIsAutoScrollPausedPromos(true);
        setTimeout(() => setIsAutoScrollPausedPromos(false), 10000);
    };

    const nextPromo = () => {
        setCurrentPromoIndex((prev) => (prev + 1) % activePromos.length);
        setIsAutoScrollPausedPromos(true);
        setTimeout(() => setIsAutoScrollPausedPromos(false), 10000);
    };

    const prevPromo = () => {
        setCurrentPromoIndex((prev) => (prev - 1 + activePromos.length) % activePromos.length);
        setIsAutoScrollPausedPromos(true);
        setTimeout(() => setIsAutoScrollPausedPromos(false), 10000);
    };

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

                {/* Promo or Tech Events Carousel */}
                {!isLoadingAnnouncements && (
                    hasActivePromo ? (
                        /* PREMIUM PROMO DESIGN — Clean light card */
                        <div 
                            className="mb-12 group"
                            onMouseEnter={() => setIsAutoScrollPausedPromos(true)}
                            onMouseLeave={() => setIsAutoScrollPausedPromos(false)}
                        >
                            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-50"></div>
                                <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                                    {/* Left: Text content */}
                                    <div className="flex-1 text-center md:text-left">
                                        {/* Badge */}
                                        {activePromos[currentPromoIndex]?.tag && (
                                            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full mb-3">
                                                <Megaphone size={13} className="text-emerald-600 dark:text-emerald-400" />
                                                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">{activePromos[currentPromoIndex].tag}</span>
                                            </div>
                                        )}

                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-3 leading-tight uppercase">
                                            {activePromos[currentPromoIndex]?.title}
                                        </h2>

                                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mb-5 leading-relaxed">
                                            {activePromos[currentPromoIndex]?.description}
                                        </p>

                                        {/* CTA Buttons */}
                                        <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
                                            {activePromos[currentPromoIndex]?.registerUrl && activePromos[currentPromoIndex].registerUrl !== '#' && (
                                                <a
                                                    href={activePromos[currentPromoIndex].registerUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.03] active:scale-95 text-sm"
                                                >
                                                    Inscrivez-vous
                                                    <ChevronRight size={16} />
                                                </a>
                                            )}
                                            {activePromos[currentPromoIndex]?.learnMoreUrl && activePromos[currentPromoIndex].learnMoreUrl !== '#' && (
                                                <a
                                                    href={activePromos[currentPromoIndex].learnMoreUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-300 font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm"
                                                >
                                                    En savoir plus
                                                    <ChevronRight size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Tilted product image */}
                                    {activePromos[currentPromoIndex]?.image_url && (
                                        <div className="hidden md:flex w-48 lg:w-56 flex-shrink-0 justify-center items-center">
                                            <div className="relative">
                                                <div className="absolute -inset-3 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-3xl blur-xl"></div>
                                                <img
                                                    key={activePromos[currentPromoIndex].id}
                                                    src={activePromos[currentPromoIndex].image_url}
                                                    alt={activePromos[currentPromoIndex].title}
                                                    className="relative w-full h-auto max-h-44 object-contain rounded-2xl transform rotate-2 group-hover:rotate-0 transition-all duration-700 animate-in fade-in zoom-in-95"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Carousel dots */}
                                {activePromos.length > 1 && (
                                    <>
                                        {/* Navigation Arrows — Floating on hover */}
                                        <button 
                                            onClick={prevPromo}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-slate-400 hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex active:scale-95 border border-slate-100 dark:border-slate-800"
                                            title="Précédent"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button 
                                            onClick={nextPromo}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-slate-400 hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex active:scale-95 border border-slate-100 dark:border-slate-800"
                                            title="Suivant"
                                        >
                                            <ChevronRight size={20} />
                                        </button>

                                        {/* Indicators */}
                                        <div className="flex justify-center gap-2 pb-5">
                                            {activePromos.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => goToPromo(index)}
                                                    className={`w-2 h-2 rounded-full transition-all ${
                                                        index === currentPromoIndex
                                                            ? 'bg-emerald-500 w-6'
                                                            : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* REGULAR EVENT CAROUSEL */
                        activeEvents.length > 0 && (
                            <div
                                className="mb-8 bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 md:p-10 pb-16 md:pb-14 text-white relative overflow-hidden shadow-xl border border-slate-800"
                                onMouseEnter={() => setIsAutoScrollPaused(true)}
                                onMouseLeave={() => setIsAutoScrollPaused(false)}
                            >
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                                {/* Event Content */}
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                                <span className="text-emerald-300 font-semibold text-sm uppercase tracking-wider">Événement à venir</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm pl-4 md:pl-0">
                                                <span className="hidden md:inline">•</span>
                                                <span>{activeEvents[currentEventIndex]?.date}</span>
                                                <span>•</span>
                                                <span>{activeEvents[currentEventIndex]?.location}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">{activeEvents[currentEventIndex]?.title}</h3>
                                        <p className="text-slate-300 text-sm md:text-base max-w-2xl">
                                            {activeEvents[currentEventIndex]?.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {activeEvents[currentEventIndex]?.learnMoreUrl && activeEvents[currentEventIndex]?.learnMoreUrl !== '#' && (
                                            <a
                                                href={activeEvents[currentEventIndex].learnMoreUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/30 text-center"
                                            >
                                                En savoir plus
                                            </a>
                                        )}
                                        {activeEvents[currentEventIndex]?.registerUrl && activeEvents[currentEventIndex]?.registerUrl !== '#' && (
                                            <a
                                                href={activeEvents[currentEventIndex].registerUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-slate-800/70 transition-colors border border-emerald-600/30 text-center"
                                            >
                                                S'inscrire
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Carousel Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                    {activeEvents.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToEvent(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentEventIndex
                                                ? 'bg-emerald-400 w-8'
                                                : 'bg-slate-600 hover:bg-slate-500'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    )
                )}

                {/* Projects Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 mt-4">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider text-sm">
                            <Terminal size={16} />
                            <span>Espace Projets</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Explorer les Projets
                        </h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl">
                            Parcourez une liste organisée d'outils, bibliothèques et applications open-source créés par la communauté.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-full md:w-auto min-w-[300px] flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <Search size={18} />
                            <span>Rechercher des projets...</span>
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
                            Tous
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
                ) : paginatedProjects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginatedProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onTagClick={(tag) => setSelectedStack(tag)}
                                />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            onPreviousPage={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            onNextPage={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        />
                    </>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
                        <Filter className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Aucun projet trouvé</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Essayez d'ajuster vos filtres ou votre recherche.</p>
                        <button
                            onClick={() => setSelectedStack(null)}
                            className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                        >
                            Effacer les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;