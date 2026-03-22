import React, { useState, useEffect } from 'react';
import { Announcement } from '../types';
import { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '../services/announcementService';
import { Plus, Pencil, Trash2, Calendar, MapPin, ExternalLink, Loader2, X, Check, Image as ImageIcon, Eye, EyeOff, LayoutTemplate, Megaphone, RotateCcw } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const AnnouncementManager: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [activeTab, setActiveTab] = useState<'event' | 'promo'>('event');
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const { addNotification } = useNotification();

    const [formData, setFormData] = useState<Omit<Announcement, 'id' | 'created_at'>>({
        title: '',
        description: '',
        date: '',
        location: '',
        learnMoreUrl: '',
        registerUrl: '',
        order_index: 0,
        type: 'event',
        tag: '',
        image_url: '',
        is_active: true
    });

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        setIsLoading(true);
        try {
            const data = await getAnnouncements();
            setAnnouncements(data);
        } catch (error) {
            addNotification('error', 'Erreur', 'Impossible de charger les annonces');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (announcement?: Announcement, forcedType?: 'event' | 'promo') => {
        if (announcement) {
            setEditingAnnouncement(announcement);
            setFormData({
                title: announcement.title,
                description: announcement.description,
                date: announcement.date,
                location: announcement.location,
                learnMoreUrl: announcement.learnMoreUrl || '',
                registerUrl: announcement.registerUrl || '',
                order_index: announcement.order_index || 0,
                type: announcement.type,
                tag: announcement.tag || '',
                image_url: announcement.image_url || '',
                is_active: announcement.is_active
            });
        } else {
            setEditingAnnouncement(null);
            setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                learnMoreUrl: '',
                registerUrl: '',
                order_index: announcements.filter(a => a.type === (forcedType || activeTab)).length,
                type: forcedType || activeTab,
                tag: '',
                image_url: '',
                is_active: true
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsActionLoading(true);
        try {
            if (editingAnnouncement) {
                await updateAnnouncement(editingAnnouncement.id, formData);
                addNotification('success', 'Succès', 'Annonce mise à jour');
            } else {
                await addAnnouncement(formData);
                addNotification('success', 'Succès', 'Annonce ajoutée');
            }
            setShowModal(false);
            fetchAnnouncements();
        } catch (error) {
            addNotification('error', 'Erreur', 'Une erreur est survenue');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) return;
        setIsActionLoading(true);
        try {
            await deleteAnnouncement(id);
            addNotification('success', 'Succès', 'Annonce supprimée');
            fetchAnnouncements();
        } catch (error) {
            addNotification('error', 'Erreur', 'Impossible de supprimer l\'annonce');
        } finally {
            setIsActionLoading(false);
        }
    };

    const toggleActive = async (announcement: Announcement) => {
        const newStatus = !announcement.is_active;
        
        // Optimistic update
        setAnnouncements(prev => prev.map(a => 
            a.id === announcement.id ? { ...a, is_active: newStatus } : a
        ));

        try {
            await updateAnnouncement(announcement.id, { is_active: newStatus });
            addNotification('info', 'Statut mis à jour', `Annonce ${newStatus ? 'activée' : 'désactivée'}`);
            // No need for a full fetchAnnouncements() here as we already updated optimistically
            // But we do it in the background to be sure
            const data = await getAnnouncements();
            setAnnouncements(data);
        } catch (error) {
            // Rollback on error
            setAnnouncements(prev => prev.map(a => 
                a.id === announcement.id ? { ...a, is_active: !newStatus } : a
            ));
            addNotification('error', 'Erreur', 'Impossible de mettre à jour le statut');
        }
    };

    const filteredAnnouncements = announcements.filter(a => a.type === activeTab);
    const activeAnnouncements = filteredAnnouncements.filter(a => a.is_active);
    const draftAnnouncements = filteredAnnouncements.filter(a => !a.is_active);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gestion des Annonces</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Événements ou promotions prioritaires sur Explore</p>
                </div>
                
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-stretch md:self-auto">
                    <button
                        onClick={() => setActiveTab('event')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'event' 
                            ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >
                        <Calendar size={18} />
                        <span>Événements</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('promo')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'promo' 
                            ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >
                        <Megaphone size={18} />
                        <span>Promotions</span>
                    </button>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                    <Plus size={20} />
                    <span>Ajouter</span>
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                </div>
            ) : filteredAnnouncements.length > 0 ? (
                <div className="space-y-10">
                    {/* Active Section */}
                    {activeAnnouncements.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4 px-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Publiés ({activeAnnouncements.length})</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activeAnnouncements.map((ann) => (
                                    <AnnouncementCard key={ann.id} ann={ann} onToggle={() => toggleActive(ann)} onEdit={() => handleOpenModal(ann)} onDelete={() => handleDelete(ann.id)} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Drafts Section */}
                    {draftAnnouncements.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4 px-1">
                                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Brouillons ({draftAnnouncements.length})</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {draftAnnouncements.map((ann) => (
                                    <AnnouncementCard key={ann.id} ann={ann} onToggle={() => toggleActive(ann)} onEdit={() => handleOpenModal(ann)} onDelete={() => handleDelete(ann.id)} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4">
                        {activeTab === 'event' ? <Calendar size={32} /> : <Megaphone size={32} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Aucune {activeTab === 'event' ? 'annonce' : 'promo'} trouvée</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Commencez par en créer une pour l'écosystème.</p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm"
                    >
                        Ajouter une {activeTab === 'event' ? 'annonce' : 'promo'}
                    </button>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl text-white ${formData.type === 'event' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-lg`}>
                                    {formData.type === 'event' ? <Calendar size={18} /> : <Megaphone size={18} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">
                                        {editingAnnouncement ? 'Modifier' : 'Ajouter'} {formData.type === 'event' ? 'un événement' : 'une promotion'}
                                    </h3>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Remplissez les informations</p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-all">
                                <X size={18} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col max-h-[85vh]">
                            <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
                                {/* Type Toggle */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({...formData, type: 'event'})}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${formData.type === 'event' 
                                            ? 'bg-emerald-500/5 border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                                            : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'}`}
                                    >
                                        <Calendar size={20} />
                                        <div className="font-bold text-sm">Événement</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({...formData, type: 'promo'})}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${formData.type === 'promo' 
                                            ? 'bg-amber-500/5 border-amber-500 text-amber-600' 
                                            : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'}`}
                                    >
                                        <Megaphone size={20} />
                                        <div className="font-bold text-sm">Promotion</div>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-3">
                                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Titre</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-medium"
                                                placeholder="Titre accrocheur..."
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{formData.type === 'event' ? 'Ordre' : 'Badge'}</label>
                                            <input
                                                type="text"
                                                value={formData.type === 'event' ? formData.order_index : formData.tag}
                                                onChange={(e) => setFormData({ ...formData, [formData.type === 'event' ? 'order_index' : 'tag']: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-center text-sm"
                                                placeholder={formData.type === 'promo' ? "Ex: NOUVEAU" : "0"}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all min-h-[70px] text-sm resize-none"
                                            placeholder="Texte court..."
                                            required
                                        />
                                    </div>

                                    {formData.type === 'promo' && (
                                        <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
                                            <label className="block text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2 ml-1">Configuration Promotion</label>
                                            <div className="flex gap-3 items-center">
                                                <div className="flex-1 relative">
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
                                                        <ImageIcon size={16} />
                                                    </div>
                                                    <input
                                                        type="url"
                                                        value={formData.image_url}
                                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                                        placeholder="URL de l'image de fond..."
                                                    />
                                                </div>
                                                {formData.image_url && (
                                                    <div className="w-12 h-9 rounded-lg overflow-hidden border border-amber-500/30 flex-shrink-0 bg-slate-200">
                                                        <img src={formData.image_url} alt="Aperçu" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Date</label>
                                                <div className="relative">
                                                     <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                        <Calendar size={14} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={formData.date}
                                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                                                        placeholder="15 Mars 2025"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Lieu</label>
                                                <div className="relative">
                                                     <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                        <MapPin size={14} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                                                        placeholder="Abidjan"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Lien Action</label>
                                                <input
                                                    type="url"
                                                    value={formData.learnMoreUrl}
                                                    onChange={(e) => setFormData({ ...formData, learnMoreUrl: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Lien Inscr.</label>
                                                <input
                                                    type="url"
                                                    value={formData.registerUrl}
                                                    onChange={(e) => setFormData({ ...formData, registerUrl: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${formData.is_active 
                                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' 
                                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                                        >
                                            {formData.is_active ? <Check size={12} /> : <X size={12} />}
                                            {formData.is_active ? 'Visible sur le site' : 'Brouillon'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 bg-slate-50/50 dark:bg-slate-800/30">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all text-sm"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={isActionLoading}
                                    className={`flex-[1.5] px-6 py-3 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm ${formData.type === 'event' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'}`}
                                >
                                    {isActionLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                    <span>{editingAnnouncement ? 'Enregistrer' : `Publier`}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const AnnouncementCard: React.FC<{ 
    ann: Announcement; 
    onToggle: () => void; 
    onEdit: () => void; 
    onDelete: () => void; 
}> = ({ ann, onToggle, onEdit, onDelete }) => (
    <div className={`group relative p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border transition-all ${!ann.is_active ? 'border-dashed border-slate-300 dark:border-slate-600' : 'border-slate-100 dark:border-slate-700 hover:border-emerald-500/30 dark:hover:border-emerald-500/30'}`}>
        <div className="flex gap-4">
            {ann.type === 'promo' && ann.image_url ? (
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                    <img src={ann.image_url} alt="" className="w-full h-full object-cover" />
                </div>
            ) : (
                <div className="w-20 h-20 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 flex-shrink-0">
                    {ann.type === 'event' ? <Calendar size={32} /> : <Megaphone size={32} />}
                </div>
            )}
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    {ann.tag && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/20">
                            {ann.tag}
                        </span>
                    )}
                    <h3 className="font-bold text-slate-900 dark:text-white truncate" title={ann.title}>{ann.title}</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">{ann.description}</p>
                
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400 font-medium">
                    <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{ann.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{ann.location}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute top-2 right-2 flex items-center gap-1">
            <button
                onClick={onToggle}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    ann.is_active 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-500/10 dark:hover:text-red-400 dark:hover:border-red-500/20' 
                        : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 dark:hover:border-emerald-500/20 shadow-sm'
                }`}
                title={ann.is_active ? "Désactiver (passer en brouillon)" : "Réactiver"}
            >
                {ann.is_active ? <Eye size={13} /> : <RotateCcw size={13} />}
                <span>{ann.is_active ? 'Actif' : 'Réactiver'}</span>
            </button>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={onEdit}
                    className="p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors"
                    title="Modifier"
                >
                    <Pencil size={16} />
                </button>
                <button
                    onClick={onDelete}
                    className="p-1.5 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors"
                    title="Supprimer définitivement"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
        
        <div className="absolute top-2 left-2 pointer-events-none">
            <span className="text-[10px] font-bold bg-slate-900/60 dark:bg-black/40 text-white px-1.5 py-0.5 rounded backdrop-blur-md">
                #{ann.order_index}
            </span>
        </div>
    </div>
);

export default AnnouncementManager;
