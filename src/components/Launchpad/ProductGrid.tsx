import React from 'react';
import ProductCard from './ProductCard';
import { LaunchpadProduct } from '../../types';

interface ProductGridProps {
    products: LaunchpadProduct[];
    onVote: (id: string) => void;
    votingIds: string[];
    onProductClick?: (product: LaunchpadProduct) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onVote, votingIds, onProductClick }) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400">Aucun produit trouvé pour le moment.</p>
                <p className="text-sm text-slate-400 mt-2">Soyez le premier à lancer votre projet !</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onVote={onVote}
                    isVoting={votingIds.includes(product.id)}
                    onClick={() => onProductClick && onProductClick(product)}
                />
            ))}
        </div>
    );
};

export default ProductGrid;
