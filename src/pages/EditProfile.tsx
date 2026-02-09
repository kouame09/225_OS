import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProfile } from '../services/profileService';
import { UserProfile } from '../types';
import ProfileEditForm from '../components/Profile/ProfileEditForm';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            const userProfile = await getProfile(user.id);

            if (userProfile) {
                setProfile(userProfile);
            } else {
                // Fallback if profile doesn't exist yet (should be created on auth, but safety first)
                setProfile({
                    id: user.id,
                    email: user.email,
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user]);

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
        <div className="container mx-auto px-4 pt-24 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center gap-2">
                    <Link to="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-600 dark:text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Retour au Dashboard</h1>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 dark:border-slate-800">
                    <ProfileEditForm
                        initialProfile={profile}
                        userId={user.id}
                        onSave={() => navigate(`/profile/${user.id}`)}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
