import React, { useEffect, useState, useMemo } from 'react';
import { getAllProfiles } from '../services/profileService';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import TalentCard from '../components/TalentCard';
import TalentSearchModal from '../components/TalentSearchModal';
import Pagination from '../components/Pagination';
import { Loader2, Users, Search } from 'lucide-react';

const Talents: React.FC = () => {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const fetchProfiles = async () => {
            const data = await getAllProfiles();
            setProfiles(data);
            setLoading(false);
        };

        fetchProfiles();
    }, []);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Pagination logic
    const totalPages = Math.ceil(profiles.length / ITEMS_PER_PAGE);
    const paginatedProfiles = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return profiles.slice(start, start + ITEMS_PER_PAGE);
    }, [profiles, currentPage]);

    // Keyboard shortcut to open search (Cmd+K or Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen pt-20">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24">
            <TalentSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                profiles={profiles}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider text-sm">
                            <Users size={16} />
                            <span>Communauté</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Talents de la <span className="text-emerald-500">Communauté</span>
                        </h1>
                        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                            Découvrez les développeurs, data scientists, experts en sécurité... qui font bouger l'écosystème tech ivoirien.
                        </p>
                    </div>

                    <Link
                        to="/edit-profile"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-slate-200 dark:shadow-none"
                    >
                        <span>Mettre à jour mon profil</span>
                    </Link>
                </div>

                {/* Search Bar Trigger */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 mb-8 gap-4">
                    <div className="flex gap-8">
                        <div className="pb-4 text-sm font-bold text-slate-900 dark:text-white relative">
                            Tous les profils
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full" />
                        </div>
                    </div>

                    <div className="pb-4 w-full md:w-auto">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="w-full md:w-[320px] flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Search size={18} />
                                <span>Rechercher des talents...</span>
                            </div>
                            <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 dark:border-slate-700 px-2 text-xs font-sans font-medium text-slate-400 ml-4">
                                ⌘K
                            </kbd>
                        </button>
                    </div>
                </div>

                {paginatedProfiles.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedProfiles.map((profile) => (
                                <TalentCard key={profile.id} profile={profile} />
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
                    <div className="text-center py-12 bg-gray-50 dark:bg-slate-900 rounded-2xl">
                        <p className="text-xl text-gray-500">Aucun talent trouvé pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Talents;
