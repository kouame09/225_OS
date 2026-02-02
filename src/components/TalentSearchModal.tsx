import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command, User, MapPin, Briefcase } from 'lucide-react';
import { UserProfile } from '../types';
import { useNavigate } from 'react-router-dom';

interface TalentSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    profiles: UserProfile[];
}

const TalentSearchModal: React.FC<TalentSearchModalProps> = ({ isOpen, onClose, profiles }) => {
    const [query, setQuery] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Focus input when modal opens and lock body scroll
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = 'hidden';
            setQuery('');
            setFilteredProfiles([]);
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
            setFilteredProfiles([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = profiles.filter(profile =>
            (profile.username?.toLowerCase() || '').includes(lowerQuery) ||
            (profile.full_name?.toLowerCase() || '').includes(lowerQuery) ||
            (profile.headline?.toLowerCase() || '').includes(lowerQuery) ||
            (profile.bio?.toLowerCase() || '').includes(lowerQuery) ||
            (profile.location?.toLowerCase() || '').includes(lowerQuery)
        ).slice(0, 5); // Limit to top 5 results for cleaner UI

        setFilteredProfiles(results);
    }, [query, profiles]);

    // Handle Keyboard Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleProfileClick = (profile: UserProfile) => {
        onClose();
        navigate(`/profile/${profile.username}`);
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
                        placeholder="Rechercher des talents par nom, titre ou bio..."
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
                    {query.trim() === '' ? (
                        <div className="py-12 text-center">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                                <Command className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Tapez pour commencer la recherche de talents...
                            </p>
                        </div>
                    ) : filteredProfiles.length > 0 ? (
                        <div className="py-2">
                            <div className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Utilisateurs
                            </div>
                            <ul className="space-y-1 px-2">
                                {filteredProfiles.map((profile) => (
                                    <li key={profile.id}>
                                        <button
                                            onClick={() => handleProfileClick(profile)}
                                            className="group flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer w-full text-left"
                                        >
                                            {/* Avatar */}
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                                {profile.avatar_url ? (
                                                    <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <User size={20} className="text-slate-400" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                                        {profile.full_name || profile.username}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                                    {profile.headline && (
                                                        <span className="flex items-center gap-1 truncate">
                                                            <Briefcase size={10} /> {profile.headline}
                                                        </span>
                                                    )}
                                                    {profile.location && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin size={10} /> {profile.location}
                                                        </span>
                                                    )}
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
                                Aucun talent trouvé pour "{query}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-950/50 px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{profiles.length}</span> talents inscrits
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

export default TalentSearchModal;
