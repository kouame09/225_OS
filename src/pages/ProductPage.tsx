import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, ExternalLink, ArrowBigUp, MapPin, Calendar, User, ArrowLeft, Loader2, MessageSquare, Mail, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { getLaunchpadProductBySlug, toggleVote, deleteLaunchpadProduct } from '../services/launchpadService';
import { LaunchpadProduct } from '../types';
import AuthModal from '../components/AuthModal';

const ProductPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const [product, setProduct] = useState<LaunchpadProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [isVoting, setIsVoting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const isOwner = user?.id === product?.maker_id;

    const fetchProduct = useCallback(async () => {
        if (!slug) return;
        setLoading(true);
        try {
            const data = await getLaunchpadProductBySlug(slug, user?.id);
            if (!data) {
                addNotification('error', 'Oups', 'Produit introuvable.');
                navigate('/launchpad');
                return;
            }
            setProduct(data);
            // Dynamic title
            document.title = `${data.name} - Launchpad | 225 Open Source`;
        } catch (error) {
            console.error(error);
            addNotification('error', 'Erreur', 'Impossible de charger le produit.');
        } finally {
            setLoading(false);
        }
    }, [slug, user, addNotification, navigate]);

    useEffect(() => {
        fetchProduct();
        return () => {
            document.title = '225 Open Source';
        };
    }, [fetchProduct]);

    const handleVote = async () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        if (!product || isVoting) return;

        const originalVotedState = !!product.has_voted;
        const originalVotesCount = product.votes_count || 0;

        // Optimistic Update
        setProduct(prev => prev ? {
            ...prev,
            has_voted: !originalVotedState,
            votes_count: originalVotesCount + (!originalVotedState ? 1 : -1)
        } : null);

        setIsVoting(true);
        try {
            await toggleVote(product.id, user.id, originalVotedState);
        } catch (error) {
            console.error(error);
            addNotification('error', 'Erreur', 'Action impossible.');
            // Rollback
            setProduct(prev => prev ? {
                ...prev,
                has_voted: originalVotedState,
                votes_count: originalVotesCount
            } : null);
        } finally {
            setIsVoting(false);
        }
    };

    const handleDelete = async () => {
        if (!product || !isOwner) return;

        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ? Cette action est irréversible.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteLaunchpadProduct(product.id);
            addNotification('success', 'Produit supprimé', `"${product.name}" a été retiré du Launchpad.`);
            navigate('/launchpad');
        } catch (error) {
            console.error(error);
            addNotification('error', 'Erreur', 'Impossible de supprimer le produit.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
                <p className="text-slate-500 font-medium animate-pulse">Chargement de la pépite...</p>
            </div>
        );
    }

    if (!product) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24 relative">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            {/* Fixed Back Button - Only for internal users */}
            {user && (
                <button
                    onClick={() => navigate('/launchpad')}
                    className="fixed top-6 left-6 z-50 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-lg group"
                    aria-label="Retour au Launchpad"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                {/* Main Content Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">

                    {/* Hero Image Section */}
                    <div className="relative h-64 sm:h-80 md:h-[400px] w-full bg-slate-100 dark:bg-slate-800">
                        {isOwner && (
                            <div className="absolute top-4 right-4 z-30 flex gap-2">
                                <Link
                                    to={`/launchpad/edit/${product.slug}`}
                                    className="p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-lg border border-slate-200 dark:border-slate-800"
                                    title="Modifier"
                                >
                                    <Edit size={20} />
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-slate-600 dark:text-slate-400 hover:text-red-500 transition-all shadow-lg border border-slate-200 dark:border-slate-800 disabled:opacity-50"
                                    title="Supprimer"
                                >
                                    {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                                </button>
                            </div>
                        )}
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-8xl font-black text-slate-200 dark:text-slate-700">
                                {product.name.charAt(0)}
                            </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
                    </div>

                    {/* Meta/Action Section */}
                    <div className="px-6 pb-12 sm:px-12 -mt-16 relative">
                        <div className="flex flex-col gap-8">

                            {/* Left Column: Title & Info */}
                            <div className="flex-grow">
                                <div className="mb-4">
                                    <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                        {product.name}
                                    </h1>
                                    <p className="text-xl text-emerald-600 dark:text-emerald-400 font-medium">
                                        {product.tagline}
                                    </p>
                                </div>


                                <div className="prose prose-lg dark:prose-invert max-w-none mt-10">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Actions Row */}
                                <div className="flex flex-wrap items-center gap-4 mt-10">
                                    <button
                                        onClick={handleVote}
                                        disabled={isVoting}
                                        className={`flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${product.has_voted
                                            ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500 shadow-emerald-500/10'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                                            }`}
                                    >
                                        <ArrowBigUp
                                            size={24}
                                            fill={product.has_voted ? 'currentColor' : 'none'}
                                            className={product.has_voted ? 'animate-bounce-subtle' : ''}
                                        />
                                        <span>{product.has_voted ? 'Voté' : 'Voter'}</span>
                                        <div className={`ml-2 px-2 py-0.5 rounded-full text-xs ${product.has_voted ? 'bg-emerald-200/50' : 'bg-white/20'
                                            }`}>
                                            {product.votes_count}
                                        </div>
                                    </button>

                                    <a
                                        href={product.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                                    >
                                        <span>Visiter le produit</span>
                                        <ExternalLink size={16} />
                                    </a>

                                    <button
                                        onClick={() => {
                                            if (product.contact_email) {
                                                window.location.href = `mailto:${product.contact_email}?subject=À propos de ${product.name} sur 225 Launchpad`;
                                            } else {
                                                addNotification('info', 'Contact indisponible', "Le maker n'a pas renseigné d'email de contact.");
                                            }
                                        }}
                                        className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-2xl border-2 border-emerald-500/20 hover:border-emerald-500/50 transition-all"
                                    >
                                        <Mail size={18} />
                                        <span>Discuter</span>
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-6 mt-12 p-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                                    <Link to={`/profile/${product.maker?.id}`} className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 overflow-hidden border-2 border-transparent group-hover:border-emerald-500 transition-all">
                                            {product.maker?.avatar_url ? (
                                                <img src={product.maker.avatar_url} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 font-normal uppercase tracking-wider">Créé par</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                                                {product.maker?.full_name || product.maker?.username || 'Anonyme'}
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block" />

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                            <Calendar size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 font-normal uppercase tracking-wider">Lancé le</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                {formatDate(product.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    {product.maker?.location && (
                                        <>
                                            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block" />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">
                                                    <MapPin size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-500 font-normal uppercase tracking-wider">Lieu</span>
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {product.maker.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden lg:block" />

                                    {/* Share Integration */}
                                    <div className="flex items-center gap-4 flex-grow lg:flex-grow-0 lg:ml-auto">
                                        <div className="hidden sm:block text-right">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Soutenir le maker</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Partagez ce produit !</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.href);
                                                addNotification('success', 'Lien copié', 'Vous pouvez maintenant le partager !');
                                            }}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                                        >
                                            <MessageSquare size={16} />
                                            <span>Copier le lien</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA for unauthenticated users (Bottom) */}
                {!user && (
                    <div className="mt-12 p-8 bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-xl text-white flex flex-col items-center text-center gap-6 relative overflow-hidden border border-slate-800">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl font-bold mb-3">Vous aimez ce produit ?</h3>
                            <p className="text-slate-300 text-lg mb-2">
                                Rejoignez 225 Open Source pour découvrir plus de pépites, voter pour vos projets préférés et lancer vos propres créations.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="relative z-10 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Créer un compte gratuit
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
