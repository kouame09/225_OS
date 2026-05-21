import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { getUserArticles } from '../../services/articleService';
import { Loader2, BookOpen, Calendar, Clock } from 'lucide-react';

interface ProfileArticlesProps {
    userId: string;
}

const ProfileArticles: React.FC<ProfileArticlesProps> = ({ userId }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const userArticles = await getUserArticles(userId);
                setArticles(userArticles.filter(a => a.status === 'published'));
            } catch (err) {
                console.error("Failed to fetch user articles", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchArticles();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    if (articles.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
                <BookOpen className="text-emerald-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Articles ({articles.length})</h2>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {articles.map((article) => {
                        const readTime = Math.ceil((article.content || '').split(/\s+/).filter(Boolean).length / 200) || 1;
                        return (
                            <Link
                                key={article.id}
                                to={`/articles/${article.slug}`}
                                className="group px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4"
                            >
                                {article.image_url ? (
                                    <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                        <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                                    </div>
                                ) : (
                                    <div className="shrink-0 w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
                                        <BookOpen size={20} />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-emerald-500 transition-colors truncate">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                                        {article.summary}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-[11px] font-medium text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {readTime} min
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProfileArticles;
