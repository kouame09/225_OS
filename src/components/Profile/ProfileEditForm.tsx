import React, { useState, useRef } from 'react';
import { UserProfile } from '../../types';
import { updateProfile, uploadProfileImage } from '../../services/profileService';
import { useNotification } from '../../contexts/NotificationContext';
import { Save, Loader2, Camera, X, Plus } from 'lucide-react';

interface ProfileEditFormProps {
    initialProfile: UserProfile;
    onSave: () => void;
    userId: string;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ initialProfile, onSave, userId }) => {
    const [formData, setFormData] = useState<Partial<UserProfile>>({
        full_name: initialProfile.full_name || '',
        headline: initialProfile.headline || '',
        bio: initialProfile.bio || '',
        location: initialProfile.location || '',
        website: initialProfile.website || '',
        github: initialProfile.github || '',
        linkedin: initialProfile.linkedin || '',
        twitter: initialProfile.twitter || '',
        facebook: initialProfile.facebook || '',
        avatar_url: initialProfile.avatar_url || '',
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(initialProfile.avatar_url || null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addNotification } = useNotification();

    const avatarInputRef = useRef<HTMLInputElement>(null);

    const MAX_AVATAR_SIZE = 500 * 1024;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_AVATAR_SIZE) {
            addNotification('error', 'Fichier trop lourd', `La taille maximale pour l'avatar est de ${MAX_AVATAR_SIZE / 1024} Ko.`);
            if (e.target) e.target.value = '';
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
        if (avatarInputRef.current) avatarInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let avatarUrl = formData.avatar_url;

            if (avatarFile) {
                const { url, error } = await uploadProfileImage(userId, avatarFile, 'avatar');
                if (error) throw new Error(`Avatar upload failed: ${error}`);
                if (url) avatarUrl = url;
            }

            const { error } = await updateProfile(userId, {
                ...formData,
                avatar_url: avatarUrl
            });

            if (error) {
                addNotification('error', 'Erreur', 'Impossible de mettre à jour le profil.');
            } else {
                addNotification('success', 'Succès', 'Profil mis à jour avec succès !');
                onSave();
            }
        } catch (err: any) {
            console.error(err);
            addNotification('error', 'Erreur', err.message || 'Une erreur inattendue est survenue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Photo de profil (Max 500 Ko)</h3>

                <div className="flex flex-col items-center">
                    {avatarPreview ? (
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 shadow-md">
                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="text-white" size={24} />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                                className="absolute -top-1 -right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20 shadow-lg border-2 border-white dark:border-slate-900"
                                title="Supprimer la photo"
                            >
                                <X size={14} />
                            </button>
                            <input
                                type="file"
                                ref={avatarInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <div
                            className="w-32 h-32 rounded-full border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all"
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            <Plus size={28} className="text-emerald-500 mb-1" />
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Ajouter</span>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={avatarInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Informations de base</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom complet</label>
                        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="Prince Kouamé" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre / Headline</label>
                        <input type="text" name="headline" value={formData.headline} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="Développeur Fullstack React/Node" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Localisation</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="Abidjan, Côte d'Ivoire" />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                            <span className="text-xs text-gray-500">{(formData.bio?.length || 0)} / 500</span>
                        </div>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} maxLength={500} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none" placeholder="Parlez-nous un peu de vous..." />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Liens Sociaux</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Web</label>
                        <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="https://mon-site.com" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Github (URL)</label>
                            <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800" placeholder="https://github.com/username" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn (URL)</label>
                            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800" placeholder="https://linkedin.com/in/username" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter (URL)</label>
                            <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800" placeholder="https://twitter.com/username" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook (URL)</label>
                            <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800" placeholder="https://facebook.com/username" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-emerald-500/20"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Enregistrement...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Enregistrer les modifications
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ProfileEditForm;
