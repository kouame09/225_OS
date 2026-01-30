import React, { useEffect, useState } from 'react';
import { getAllProfiles } from '../services/profileService';
import { UserProfile } from '../types';
import TalentCard from '../components/TalentCard';
import { Loader2, Users } from 'lucide-react';

const Talents: React.FC = () => {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            const data = await getAllProfiles();
            setProfiles(data);
            setLoading(false);
        };

        fetchProfiles();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen pt-20">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full text-emerald-600 dark:text-emerald-400 mb-4">
                    <Users size={24} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Talents de la Communauté
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Des profils techs qui pourraient vous intéresser.
                </p>
            </div>

            {profiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((profile) => (
                        <TalentCard key={profile.id} profile={profile} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-dark-card rounded-2xl">
                    <p className="text-xl text-gray-500">Aucun talent trouvé pour le moment.</p>
                </div>
            )}
        </div>
    );
};

export default Talents;
