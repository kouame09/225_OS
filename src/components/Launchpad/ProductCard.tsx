import React from 'react';
import { LaunchpadProduct } from '../../types';
import { ArrowBigUp, ExternalLink, MessageSquare, Link as LinkIcon } from 'lucide-react';

// Keep only the first 2 words, add "..." if longer
const truncateName = (name: string, maxWords = 2): string => {
    const words = name.trim().split(/\s+/);
    if (words.length <= maxWords) return name;
    return words.slice(0, maxWords).join(' ') + '...';
};

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
            className="group flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 cursor-pointer h-32 md:h-36"
        >

            {/* Thumbnail - Flush to the left for perfect alignment */}
            <div className="w-32 md:w-40 h-full flex-shrink-0 bg-slate-100 dark:bg-slate-800 overflow-hidden border-r border-slate-100 dark:border-slate-800">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-black text-slate-200 dark:text-slate-700">
                        {product.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col justify-center p-4 md:p-6 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                    <h3 className="font-black text-base md:text-lg text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 transition-colors leading-tight">
                        {product.name}
                    </h3>
                    {product.url && (
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-300 hover:text-emerald-500 transition-colors shrink-0 mt-1"
                        >
                            <ExternalLink size={14} />
                        </a>
                    )}
                </div>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-2 font-medium">
                    {product.tagline}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <span>par </span>
                        <span className="text-slate-700 dark:text-slate-200">
                            {truncateName(product.maker?.full_name || product.maker?.username || 'Membre de la communauté')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Vote Button */}
            <div className="flex flex-col items-center justify-center pr-4 md:pr-6">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onVote && onVote(product.id);
                    }}
                    disabled={isVoting}
                    className={`group/vote flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 transition-all duration-300 ${product.has_voted
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-emerald-200 dark:hover:border-emerald-800/40'
                        }`}
                >
                    <ArrowBigUp
                        size={28}
                        fill={product.has_voted ? 'currentColor' : 'none'}
                        className={product.has_voted ? 'animate-bounce-subtle' : 'group-hover/vote:-translate-y-1 transition-transform'}
                    />
                    <span className="text-xs md:text-sm font-black leading-none mt-1">
                        {product.votes_count}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
