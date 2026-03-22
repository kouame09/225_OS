import React, { useState, useEffect, useMemo } from 'react';
import { Rocket, Plus, TrendingUp, Clock, Loader2, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getLaunchpadProducts, toggleVote } from '../services/launchpadService';
import { LaunchpadProduct } from '../types';
import ProductGrid from '../components/Launchpad/ProductGrid';
import ProductSearchModal from '../components/Launchpad/ProductSearchModal';
import { useNotification } from '../contexts/NotificationContext';
import AuthModal from '../components/AuthModal';

const Launchpad: React.FC = () => {
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const [products, setProducts] = useState<LaunchpadProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [votingIds, setVotingIds] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'trending' | 'new'>('trending');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getLaunchpadProducts(user?.id);
            setProducts(data);
        } catch (error) {
            console.error(error);
            addNotification('error', 'Erreur', 'Impossible de charger les produits.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

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

    const handleVote = async (productId: string) => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        if (votingIds.includes(productId)) return;

        const product = products.find(p => p.id === productId);
        if (!product) return;

        const originalVotedState = !!product.has_voted;
        const originalVotesCount = product.votes_count || 0;

        // Optimistic Update
        const updateProductState = (voted: boolean, count: number) => {
            setProducts(prev => prev.map(p => {
                if (p.id === productId) {
                    return { ...p, has_voted: voted, votes_count: count };
                }
                return p;
            }));
        };

        updateProductState(!originalVotedState, originalVotesCount + (!originalVotedState ? 1 : -1));

        setVotingIds(prev => [...prev, productId]);

        try {
            await toggleVote(productId, user.id, originalVotedState);
        } catch (error) {
            console.error(error);
            addNotification('error', 'Erreur', 'Action impossible pour le moment.');
            updateProductState(originalVotedState, originalVotesCount);
        } finally {
            setVotingIds(prev => prev.filter(id => id !== productId));
        }
    };

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (activeTab === 'trending') {
            return list.sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0));
        } else {
            return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
    }, [products, activeTab]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <ProductSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                products={products}
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider text-sm">
                            <Rocket size={16} />
                            <span>Launchpad</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Découvrez les pépites <span className="text-emerald-500">locales</span>
                        </h1>
                        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                            La vitrine des meilleurs produits, SaaS et applications créés par la communauté tech ivoirienne.
                        </p>
                    </div>

                    <Link
                        to="/launchpad/submit"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-slate-200 dark:shadow-none"
                    >
                        <Plus size={20} />
                        Lancer un produit
                    </Link>
                </div>

                {/* Navigation Tabs & Search */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 mb-8 gap-4">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('trending')}
                            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${activeTab === 'trending'
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                        >
                            <TrendingUp size={18} />
                            Tendance
                            {activeTab === 'trending' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('new')}
                            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${activeTab === 'new'
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                        >
                            <Clock size={18} />
                            Nouveaux
                            {activeTab === 'new' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full" />
                            )}
                        </button>
                    </div>

                    {/* Search Bar Trigger */}
                    <div className="pb-4 w-full md:w-auto">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="w-full md:w-[320px] flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Search size={18} />
                                <span>Rechercher des produits...</span>
                            </div>
                            <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 dark:border-slate-700 px-2 text-xs font-sans font-medium text-slate-400 ml-4">
                                ⌘K
                            </kbd>
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="animate-spin text-emerald-500" size={40} />
                        <p className="text-slate-500 font-medium">Décollage en cours...</p>
                    </div>
                ) : (
                    <ProductGrid
                        products={sortedProducts}
                        onVote={handleVote}
                        votingIds={votingIds}
                        onProductClick={(p) => navigate(`/launchpad/p/${p.slug}`)}
                    />
                )}
            </div>
        </div>
    );
};

export default Launchpad;
