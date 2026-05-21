import React, { useState, useEffect, useMemo } from 'react';
import { Lightbulb, Plus, Search, Filter, ExternalLink, MapPin, Loader2, Trash2, Edit3, ArrowRight, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPitches, deletePitch } from '../services/pitchService';
import { Pitch } from '../types';
import { useNotification } from '../contexts/NotificationContext';
import AuthModal from '../components/AuthModal';
import SearchModal from '../components/SearchModal';

const PitchHub: React.FC = () => {
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const [pitches, setPitches] = useState<Pitch[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterNeed, setFilterNeed] = useState<string>('all');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getPitches();
            setPitches(data);
        } catch (error) {
            console.error(error);
            addNotification('error', 'Erreur', 'Impossible de charger les pitches.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const needs = [
        { id: 'all', label: 'Tous les besoins' },
        { id: 'Co-fondateur', label: 'Co-fondateur' },
        { id: 'Latefounder', label: 'Latefounder' },
        { id: 'Investisseur', label: 'Investisseur' },
        { id: 'Lead Technique', label: 'Lead Technique' },
        { id: 'Mentor / Conseils', label: 'Mentor / Conseils' },
        { id: 'Associé', label: 'Associé' }
    ];

    const filteredPitches = useMemo(() => {
        return pitches.filter(p => {
            const matchesFilter = filterNeed === 'all' || p.need === filterNeed;
            return matchesFilter;
        });
    }, [pitches, filterNeed]);

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Supprimer le pitch pour "${name}" ?`)) return;

        setIsDeleting(id);
        try {
            await deletePitch(id);
            setPitches(prev => prev.filter(p => p.id !== id));
            addNotification('success', 'Pitch supprimé', 'Votre pitch a été retiré.');
        } catch (error) {
            addNotification('error', 'Erreur', 'Impossible de supprimer le pitch.');
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <SearchModal type="pitch" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider text-sm">
                            <Lightbulb size={16} />
                            <span>PitchHub</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Partagez vos <span className="text-emerald-500">idées</span>
                        </h1>
                        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
                            L'endroit où les idées rencontrent les talents. Publiez votre pitch, exprimez votre besoin et trouvez vos futurs partenaires.
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
                            to="/pitchhub/submit"
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-slate-200 dark:shadow-none"
                        >
                            <Plus size={20} />
                            Publier un Pitch
                        </Link>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="relative min-w-[200px]">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white appearance-none cursor-pointer"
                            value={filterNeed}
                            onChange={(e) => setFilterNeed(e.target.value)}
                        >
                            {needs.map(n => (
                                <option key={n.id} value={n.id}>{n.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="animate-spin text-emerald-500" size={40} />
                        <p className="text-slate-500 font-medium">Chargement du Hub...</p>
                    </div>
                ) : filteredPitches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPitches.map((pitch) => (
                            <div key={pitch.id} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col">
                                <div className="p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                                            {pitch.need}
                                        </div>
                                        {user?.id === pitch.user_id && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => navigate(`/pitchhub/edit/${pitch.slug}`)}
                                                    className="text-slate-400 hover:text-emerald-500 transition-colors p-1"
                                                    title="Modifier"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(pitch.id, pitch.project_name)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                    disabled={isDeleting === pitch.id}
                                                    title="Supprimer"
                                                >
                                                    {isDeleting === pitch.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                                        {pitch.project_name}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 line-clamp-4 text-sm leading-relaxed mb-6">
                                        {pitch.pitch}
                                    </p>

                                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Posté par</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                {pitch.user?.full_name || pitch.user?.username || 'Membre de la communauté'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                                        <MapPin size={14} className="text-rose-500" />
                                        <span>{pitch.location}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {pitch.link && (
                                            <a
                                                href={pitch.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white dark:bg-slate-900 rounded-lg text-slate-400 hover:text-emerald-500 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
                                                title="Lien ressource"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                        <Link
                                            to={`/pitchhub/p/${pitch.slug}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:scale-105 transition-all shadow-md shadow-emerald-500/20"
                                        >
                                            <span>Voir détails</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Lightbulb size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucun pitch trouvé</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            Nous n'avons trouvé aucune idée correspondant à votre recherche. Pourquoi ne pas publier la vôtre ?
                        </p>
                        <Link
                            to="/pitchhub/submit"
                            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform"
                        >
                            <Plus size={20} />
                            Publier le premier pitch
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PitchHub;
