import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, ExternalLink, Lightbulb, Loader2, Calendar, Trash2, Edit3, Briefcase, User, Link as LinkIcon } from 'lucide-react';
import { getPitchBySlug, deletePitch } from '../services/pitchService';
import { Pitch } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const PitchDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const [pitch, setPitch] = useState<Pitch | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchPitch = async () => {
            if (!slug) return;
            try {
                const data = await getPitchBySlug(slug);
                setPitch(data);
                if (data) {
                    document.title = `${data.project_name} - PitchHub | 225 Open Source`;
                }
            } catch (error) {
                console.error(error);
                addNotification('error', 'Erreur', 'Impossible de charger les détails du pitch.');
            } finally {
                setLoading(false);
            }
        };
        fetchPitch();
        return () => {
            document.title = '225 Open Source';
        };
    }, [slug, addNotification]);

    const handleDelete = async () => {
        if (!pitch) return;
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le pitch "${pitch.project_name}" ?`)) return;

        setIsDeleting(true);
        try {
            await deletePitch(pitch.id);
            addNotification('success', 'Supprimé', 'Le pitch a été retiré avec succès.');
            navigate('/pitchhub');
        } catch (error) {
            addNotification('error', 'Erreur', 'Impossible de supprimer le pitch.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        addNotification('success', 'Lien copié', 'Le lien du pitch est prêt à être partagé !');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="animate-spin text-emerald-500" size={40} />
            </div>
        );
    }

    if (!pitch) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-400">
                    <Lightbulb size={40} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pitch introuvable</h1>
                <p className="text-slate-500 mb-8 text-center max-w-md">Ce pitch n'existe plus ou l'URL est incorrecte.</p>
                <Link to="/pitchhub" className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                    Retour au PitchHub
                </Link>
            </div>
        );
    }

    const isOwner = user?.id === pitch.user_id;

    // Keep only the first 2 words, add "..." if longer
    const truncateName = (name: string, maxWords = 2): string => {
        const words = name.trim().split(/\s+/);
        if (words.length <= maxWords) return name;
        return words.slice(0, maxWords).join(' ') + '...';
    };

    // Clean author name logic
    const authorName = truncateName(pitch.user?.full_name || pitch.user?.username || 'Membre de la communauté');

    return (
        <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 relative ${user ? 'pt-20' : 'pt-10'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Navigation Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                    {user ? (
                        <Link to="/pitchhub" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors font-medium">
                            <ArrowLeft size={20} />
                            <span className="text-sm">Retour au Hub</span>
                        </Link>
                    ) : (
                        <div /> // Spacer for flex alignment if no back button
                    )}

                    <div className="flex gap-2 w-full sm:w-auto">
                        <button 
                            onClick={handleShare}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors text-xs font-bold"
                        >
                            <LinkIcon size={14} />
                            Partager
                        </button>
                        
                        {isOwner && (
                            <>
                                <button 
                                    onClick={() => navigate(`/pitchhub/edit/${pitch.slug}`)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold"
                                >
                                    <Edit3 size={14} />
                                    Modifier
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-red-100 dark:border-red-900/30 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-xs font-bold disabled:opacity-50"
                                >
                                    {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                    Supprimer
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-12 md:mb-16">
                    
                    {/* Hero Section */}
                    <div className="px-6 py-10 md:px-12 md:py-14 bg-emerald-600 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4 hidden md:block">
                            <Lightbulb size={200} className="text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-4">
                                <Briefcase size={12} />
                                <span>Besoin de : {pitch.need}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight leading-tight">
                                {pitch.project_name}
                            </h1>
                            
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-8 text-emerald-50">
                                <div className="flex items-center gap-2 font-bold text-xs md:text-sm opacity-90">
                                    <MapPin size={16} className="text-emerald-200" />
                                    <span>{pitch.location}</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-xs md:text-sm opacity-90">
                                    <Calendar size={16} className="text-emerald-200" />
                                    <span>{new Date(pitch.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 lg:p-12">
                        {/* The Problem Section */}
                        {pitch.problem && (
                            <div className="mb-10 md:mb-12">
                                <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2">
                                    <span className="w-6 md:w-10 h-[2px] bg-rose-500"></span>
                                    Le Problème
                                </h2>
                                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                                    "{pitch.problem}"
                                </p>
                            </div>
                        )}

                        {/* The Pitch Content */}
                        <div className="mb-10 md:mb-12">
                            <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2">
                                <span className="w-6 md:w-10 h-[2px] bg-emerald-500"></span>
                                Le Concept
                            </h2>
                            <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-semibold whitespace-pre-wrap italic">
                                "{pitch.pitch}"
                            </p>
                        </div>

                        {/* Info Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-10 border-t border-slate-100 dark:border-slate-800">
                            {/* Author Info (Simplified) */}
                            <div className="flex flex-col justify-center">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Posté par</h3>
                                <div className="overflow-hidden">
                                    <div className="font-black text-lg md:text-2xl text-slate-900 dark:text-white truncate">
                                        {authorName}
                                    </div>
                                    <div className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 mt-1">
                                        <User size={14} />
                                        Porteur du projet
                                    </div>
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div>
                                <div className="flex flex-col gap-3">
                                    <a 
                                        href={`mailto:${pitch.email}?subject=Contact via PitchHub: ${pitch.project_name}`}
                                        className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/20 text-sm md:text-lg"
                                    >
                                        <Mail size={18} />
                                        <span>Contacter par Email</span>
                                    </a>

                                    {pitch.link && (
                                        <a 
                                            href={pitch.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs"
                                        >
                                            <ExternalLink size={14} />
                                            <span>Consulter la ressource</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA for unauthenticated users (Bottom) */}
                {!user && (
                    <div className="p-8 md:p-12 bg-slate-900 dark:bg-slate-950 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-white flex flex-col items-center text-center gap-6 relative overflow-hidden border border-slate-800">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl md:text-4xl font-black mb-4">Rejoignez l'aventure</h3>
                            <p className="text-slate-300 text-lg md:text-xl mb-4">
                                Vous avez aussi une idée de génie ? Publiez votre pitch sur 225 Open Source et trouvez les talents pour la réaliser.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="relative z-10 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xl rounded-2xl transition-all shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-1"
                        >
                            Démarrer mon projet
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PitchDetails;
