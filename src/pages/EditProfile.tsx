import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { getProfile, updateProfile, uploadProfileImage } from '../services/profileService';
import { UserProfile } from '../types';
import { Loader2, ArrowLeft, Save, Camera, X, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<UserProfile>>({
        full_name: '',
        headline: '',
        bio: '',
        location: '',
        website: '',
        github: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        avatar_url: '',
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            const userProfile = await getProfile(user.id);
            if (userProfile) {
                setProfile(userProfile);
                setFormData({
                    full_name: userProfile.full_name || '',
                    headline: userProfile.headline || '',
                    bio: userProfile.bio || '',
                    location: userProfile.location || '',
                    website: userProfile.website || '',
                    github: userProfile.github || '',
                    linkedin: userProfile.linkedin || '',
                    twitter: userProfile.twitter || '',
                    facebook: userProfile.facebook || '',
                    avatar_url: userProfile.avatar_url || '',
                });
                setAvatarPreview(userProfile.avatar_url || null);
            } else {
                setProfile({ id: user.id, email: user.email });
            }
            setLoading(false);
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const maxSize = 500 * 1024;
        if (file.size > maxSize) {
            addNotification('error', 'Fichier trop lourd', `La taille maximale pour l'avatar est de ${maxSize / 1024} Ko.`);
            e.target.value = '';
            return;
        }
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        setFormData(prev => ({ ...prev, avatar_url: '' }));
    };

    const handleRemoveFile = () => {
        setAvatarFile(null);
        setAvatarPreview(null);
        setFormData(prev => ({ ...prev, avatar_url: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;
        setIsSubmitting(true);
        try {
            let avatarUrl = formData.avatar_url;
            if (avatarFile) {
                const { url, error } = await uploadProfileImage(user.id, avatarFile, 'avatar');
                if (error) throw new Error(`Avatar upload failed: ${error}`);
                if (url) avatarUrl = url;
            }
            const { error } = await updateProfile(user.id, { ...formData, avatar_url: avatarUrl });
            if (error) {
                addNotification('error', 'Erreur', 'Impossible de mettre à jour le profil.');
            } else {
                addNotification('success', 'Succès', 'Profil mis à jour avec succès !');
            }
        } catch (err: any) {
            addNotification('error', 'Erreur', err.message || 'Une erreur inattendue est survenue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen pt-20">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    if (!user || !profile) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <p className="text-xl text-gray-600">Veuillez vous connecter pour modifier votre profil.</p>
                <Link to="/" className="text-primary hover:underline mt-4 inline-block">Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-500 text-sm font-bold transition-all mb-8 cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    <span>Retour au Dashboard</span>
                </Link>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-8">Modifier mon profil</h1>

                {/* Profile Info Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Avatar */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Photo de profil</h3>
                        <div className="flex justify-center">
                            {avatarPreview ? (
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
                                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => document.getElementById('avatar-input')?.click()}>
                                        <Camera className="text-white" size={28} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="absolute -top-1 -right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20 shadow-lg border-2 border-white dark:border-slate-900"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="w-32 h-32 rounded-full border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all"
                                    onClick={() => document.getElementById('avatar-input')?.click()}
                                >
                                    <Plus size={28} className="text-emerald-500 mb-1" />
                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Ajouter</span>
                                </div>
                            )}
                            <input id="avatar-input" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Informations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                <input
                                    type="text"
                                    value={user.email || ''}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed text-sm"
                                />
                                <p className="text-[10px] text-slate-400 mt-1">L'email ne peut pas être modifié</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom complet</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm"
                                    placeholder="Prince Kouamé"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Titre / Headline</label>
                                <input
                                    type="text"
                                    name="headline"
                                    value={formData.headline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm"
                                    placeholder="Développeur Fullstack"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Localisation</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm"
                                    placeholder="Abidjan, Côte d'Ivoire"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={3}
                                    maxLength={500}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm resize-none"
                                    placeholder="Parlez-nous un peu de vous..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Liens Sociaux</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Site Web</label>
                                <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm" placeholder="https://mon-site.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Github</label>
                                <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm" placeholder="https://github.com/..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">LinkedIn</label>
                                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm" placeholder="https://linkedin.com/in/..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Twitter</label>
                                <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm" placeholder="https://twitter.com/..." />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            <span>Enregistrer les modifications</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
