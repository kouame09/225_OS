import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LaunchpadProduct } from '../../types';
import { getUserLaunchpadProducts, toggleVote } from '../../services/launchpadService';
import ProductCard from '../Launchpad/ProductCard';
import { Loader2, Rocket } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import AuthModal from '../AuthModal';

interface ProfileLaunchpadProps {
    userId: string;
}

const ProfileLaunchpad: React.FC<ProfileLaunchpadProps> = ({ userId }) => {
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const [products, setProducts] = useState<LaunchpadProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [votingIds, setVotingIds] = useState<string[]>([]);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const userProducts = await getUserLaunchpadProducts(userId);
                setProducts(userProducts);
            } catch (err) {
                console.error("Failed to fetch user products", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProducts();
        }
    }, [userId]);

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
            addNotification('error', 'Erreur', 'Action impossible.');
            updateProductState(originalVotedState, originalVotesCount);
        } finally {
            setVotingIds(prev => prev.filter(id => id !== productId));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            <div className="flex items-center gap-2 mb-6">
                <Rocket className="text-emerald-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Launchpad ({products.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onVote={handleVote}
                        isVoting={votingIds.includes(product.id)}
                        onClick={() => navigate(`/launchpad/p/${product.slug}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfileLaunchpad;
