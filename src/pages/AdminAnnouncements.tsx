import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AnnouncementManager from '../components/AnnouncementManager';
import { ChevronLeft, Loader2 } from 'lucide-react';

const AdminAnnouncements: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const isAdmin = user?.email === 'princekouame7@gmail.com';

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/dashboard');
        }
    }, [isAdmin, loading, navigate]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="animate-spin text-slate-400" /></div>;

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6 font-medium"
                >
                    <ChevronLeft size={20} />
                    Retour au Dashboard
                </button>
                
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Administration</h1>
                
                <AnnouncementManager />
            </div>
        </div>
    );
};

export default AdminAnnouncements;
