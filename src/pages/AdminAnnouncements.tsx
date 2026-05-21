import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AnnouncementManager from '../components/AnnouncementManager';
import { ChevronLeft, Loader2, Calendar, Eye, EyeOff, Wrench, AlertTriangle } from 'lucide-react';
import { getSiteSetting, updateSiteSetting } from '../services/siteSettingsService';
import { useNotification } from '../contexts/NotificationContext';

const AdminAnnouncements: React.FC = () => {
    const { user, loading } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    const [osdVisible, setOsdVisible] = useState<boolean>(true);
    const [osdLoading, setOsdLoading] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
    const [maintenanceLoading, setMaintenanceLoading] = useState(false);

    const isAdmin = user?.email === 'princekouame7@gmail.com';

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/dashboard');
        }
    }, [isAdmin, loading, navigate]);

    useEffect(() => {
        if (isAdmin) {
            loadSettings();
        }
    }, [isAdmin]);

    const loadSettings = async () => {
        const osd = await getSiteSetting('show_opensource_day');
        const maint = await getSiteSetting('maintenance_mode', false);
        setOsdVisible(osd);
        setMaintenanceMode(maint);
    };

    const toggleOSD = async () => {
        setOsdLoading(true);
        try {
            const newValue = !osdVisible;
            await updateSiteSetting('show_opensource_day', newValue);
            setOsdVisible(newValue);
            addNotification(
                'success',
                'Paramètre mis à jour',
                newValue ? "L'onglet Open Source Day est maintenant visible" : "L'onglet Open Source Day est maintenant masqué"
            );
        } catch (error) {
            addNotification('error', 'Erreur', 'Impossible de mettre à jour le paramètre');
        } finally {
            setOsdLoading(false);
        }
    };

    const toggleMaintenance = async () => {
        setMaintenanceLoading(true);
        try {
            const newValue = !maintenanceMode;
            await updateSiteSetting('maintenance_mode', newValue);
            setMaintenanceMode(newValue);
            addNotification(
                newValue ? 'warning' : 'success',
                newValue ? 'Mode maintenance activé' : 'Mode maintenance désactivé',
                newValue ? 'Le site est maintenant en maintenance' : 'Le site est de nouveau accessible'
            );
        } catch (error) {
            addNotification('error', 'Erreur', 'Impossible de mettre à jour le paramètre');
        } finally {
            setMaintenanceLoading(false);
        }
    };

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
                
                {/* Site Settings Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Maintenance Mode Toggle */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    maintenanceMode 
                                        ? 'bg-amber-100 dark:bg-amber-900/30' 
                                        : 'bg-slate-100 dark:bg-slate-800'
                                }`}>
                                    <Wrench size={20} className={maintenanceMode ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mode Maintenance</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Activer/désactiver l'accès au site</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-5">
                            {maintenanceMode && (
                                <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                    <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                    <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                                        Le site est actuellement en maintenance
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {maintenanceMode ? (
                                        <Wrench size={18} className="text-amber-500" />
                                    ) : (
                                        <Eye size={18} className="text-emerald-500" />
                                    )}
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {maintenanceMode ? 'Maintenance activée' : 'Site en ligne'}
                                    </span>
                                </div>
                                <button
                                    onClick={toggleMaintenance}
                                    disabled={maintenanceLoading}
                                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                        maintenanceMode ? 'bg-amber-500' : 'bg-emerald-500'
                                    } ${maintenanceLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                            maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Open Source Day Visibility Toggle */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                    <Calendar size={20} className="text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Open Source Day</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Visibilité de l'onglet dans la navigation</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {osdVisible ? (
                                    <Eye size={18} className="text-emerald-500" />
                                ) : (
                                    <EyeOff size={18} className="text-slate-400" />
                                )}
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {osdVisible ? "L'onglet est visible" : "L'onglet est masqué"}
                                </span>
                            </div>
                            <button
                                onClick={toggleOSD}
                                disabled={osdLoading}
                                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                    osdVisible ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                                } ${osdLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        osdVisible ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <AnnouncementManager />
            </div>
        </div>
    );
};

export default AdminAnnouncements;
