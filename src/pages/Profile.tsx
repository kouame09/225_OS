import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../services/profileService';
import { UserProfile } from '../types';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileAbout from '../components/Profile/ProfileAbout';
import ProfileProjects from '../components/Profile/ProfileProjects';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!id) return;
            setLoading(true);
            const data = await getProfile(id);
            setProfile(data);
            setLoading(false);
        };

        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen pt-20">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Utilisateur introuvable</h2>
                <p className="text-gray-600 dark:text-gray-400">Le profil que vous recherchez n'existe pas ou a été supprimé.</p>
            </div>
        );
    }

    const isOwnProfile = user?.id === profile.id;

    return (
        <div className="container mx-auto px-4 pt-24 pb-16">
            <div className="max-w-5xl mx-auto space-y-6">
                <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

                {profile.bio && (
                    <ProfileAbout bio={profile.bio} />
                )}

                <div className="mt-8">
                    <ProfileProjects userId={profile.id} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
