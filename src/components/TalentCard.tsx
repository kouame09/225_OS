import React from 'react';
import { UserProfile } from '../types';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

interface TalentCardProps {
    profile: UserProfile;
}

const TalentCard: React.FC<TalentCardProps> = ({ profile }) => {
    return (
        <Link
            to={`/profile/${profile.id}`}
            className="group block bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300"
        >
            <div className="h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 relative">
                {profile.banner_url && (
                    <img
                        src={profile.banner_url}
                        alt=""
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                )}
            </div>

            <div className="px-5 pb-5 relative">
                <div className="flex justify-between items-end -mt-10 mb-3">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
                            <img
                                src={profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'User')}&background=random`}
                                alt={profile.full_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
                        {profile.full_name || 'Utilisateur 225'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-3 h-5">
                        {profile.headline || 'Membre de la communauté'}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                            {profile.location && (
                                <>
                                    <MapPin size={12} className="mr-1" />
                                    <span className="truncate max-w-[100px]">{profile.location}</span>
                                </>
                            )}
                        </div>

                        <span className="inline-flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                            Voir profil <ArrowRight size={12} className="ml-1" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TalentCard;
