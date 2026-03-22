import React from 'react';
import { Link } from 'react-router-dom';
import { LaunchpadProduct } from '../../types';
import { ArrowBigUp, ExternalLink, MessageSquare } from 'lucide-react';

interface ProductCardProps {
    product: LaunchpadProduct;
    onVote?: (id: string) => void;
    isVoting?: boolean;
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onVote, isVoting, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 p-4 gap-4 cursor-pointer"
        >

            {/* Thumbnail */}
            <div className="w-24 h-24 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-300 dark:text-slate-600">
                        {product.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {product.name}
                    </h3>
                    <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <ExternalLink size={14} />
                    </a>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mb-2">
                    {product.tagline}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <span>par </span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                            {product.maker?.full_name || product.maker?.username || 'Anonyme'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                        <MessageSquare size={12} />
                        <span>Discuter</span>
                    </div>
                </div>
            </div>

            {/* Vote Button */}
            <div className="flex flex-col items-center justify-center ml-2">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onVote && onVote(product.id);
                    }}
                    disabled={isVoting}
                    className={`group/vote flex flex-col items-center justify-center w-14 h-14 rounded-xl border-2 transition-all duration-200 ${product.has_voted
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-emerald-200 dark:hover:border-emerald-800/40'
                        }`}
                >
                    <ArrowBigUp
                        size={24}
                        fill={product.has_voted ? 'currentColor' : 'none'}
                        className={product.has_voted ? 'animate-bounce-subtle' : 'group-hover/vote:-translate-y-0.5 transition-transform'}
                    />
                    <span className="text-xs font-bold leading-none mt-0.5">
                        {product.votes_count}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
