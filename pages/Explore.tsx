import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Terminal, Loader2, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

    // Tech Events Data
    const techEvents = [
        {
            id: 1,
            title: "Abidjan Tech Summit 2025",
            description: "Join the biggest tech event in Côte d'Ivoire. Connect with developers, startups, and tech enthusiasts from March 15-17.",
            date: "Mar 15-17, 2025",
            location: "Abidjan, Côte d'Ivoire",
            learnMoreUrl: "#",
            registerUrl: "#"
        },
        {
            id: 2,
            title: "AI & Machine Learning Workshop",
            description: "Hands-on workshop covering the latest in AI and ML technologies. Perfect for developers looking to level up their skills.",
            date: "Apr 20-21, 2025",
            location: "Yamoussoukro",
            learnMoreUrl: "#",
            registerUrl: "#"
        },
        {
            id: 3,
            title: "Startup Pitch Night",
            description: "Present your startup ideas to investors and mentors. Network with fellow entrepreneurs and get valuable feedback.",
            date: "May 8, 2025",
            location: "Grand-Bassam",
            learnMoreUrl: "#",
            registerUrl: "#"
        },
        {
            id: 4,
            title: "Web3 & Blockchain Conference",
            description: "Explore the future of decentralized web. Learn about blockchain, crypto, and Web3 technologies from industry experts.",
            date: "Jun 10-12, 2025",
            location: "Abidjan",
            learnMoreUrl: "#",
            registerUrl: "#"
        }
    ];

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

    // Auto-scroll carousel
    useEffect(() => {
        if (isAutoScrollPaused) return;
        
        const interval = setInterval(() => {
            setCurrentEventIndex((prev) => (prev + 1) % techEvents.length);
        }, 5000); // Change event every 5 seconds

        return () => clearInterval(interval);
    }, [techEvents.length, isAutoScrollPaused]);

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

    // Carousel navigation
    const nextEvent = () => {
        setCurrentEventIndex((prev) => (prev + 1) % techEvents.length);
        setIsAutoScrollPaused(true);
        setTimeout(() => setIsAutoScrollPaused(false), 10000); // Resume after 10 seconds
    };

    const prevEvent = () => {
        setCurrentEventIndex((prev) => (prev - 1 + techEvents.length) % techEvents.length);
        setIsAutoScrollPaused(true);
        setTimeout(() => setIsAutoScrollPaused(false), 10000); // Resume after 10 seconds
    };

    const goToEvent = (index: number) => {
        setCurrentEventIndex(index);
        setIsAutoScrollPaused(true);
        setTimeout(() => setIsAutoScrollPaused(false), 10000); // Resume after 10 seconds
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

                {/* Tech Events Carousel */}
                <div 
                    className="mb-8 bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl border border-slate-800"
                    onMouseEnter={() => setIsAutoScrollPaused(true)}
                    onMouseLeave={() => setIsAutoScrollPaused(false)}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                    {/* Event Content */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-emerald-300 font-semibold text-sm uppercase tracking-wider">Featured Event</span>
                                <span className="text-slate-500 text-sm">• {techEvents[currentEventIndex].date}</span>
                                <span className="text-slate-500 text-sm">• {techEvents[currentEventIndex].location}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-2">{techEvents[currentEventIndex].title}</h3>
                            <p className="text-slate-300 text-sm md:text-base max-w-2xl">
                                {techEvents[currentEventIndex].description}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={techEvents[currentEventIndex].learnMoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/30 text-center"
                            >
                                Learn More
                            </a>
                            <a
                                href={techEvents[currentEventIndex].registerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-slate-800/70 transition-colors border border-emerald-600/30 text-center"
                            >
                                Register Now
                            </a>
                        </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {techEvents.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToEvent(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentEventIndex
                                        ? 'bg-emerald-400 w-8'
                                        : 'bg-slate-600 hover:bg-slate-500'
                                }`}
                            />
                        ))}
                    </div>
                </div>

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