import React from 'react';
import { UserProfile } from '../../types';
import { MapPin, Globe, Github, Linkedin, Twitter, Facebook, Link as LinkIcon, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileHeaderProps {
    profile: UserProfile;
    isOwnProfile?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isOwnProfile }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
            {/* Banner */}
            <div className="h-48 md:h-64 bg-gray-200 dark:bg-slate-800 relative">
                {profile.banner_url ? (
                    <img
                        src={profile.banner_url}
                        alt="Profile Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-emerald-600 flex items-center justify-center relative overflow-hidden">
                        {/* Watermark */}
                        <div className="relative z-10 flex flex-col items-center opacity-30 select-none">
                            <span className="text-3xl md:text-5xl font-black text-white tracking-tighter italic">225 OPEN SOURCE</span>
                            <span className="text-xs md:text-sm font-bold text-white/50 tracking-widest uppercase">Communauté Tech Ivoirienne</span>
                        </div>
                    </div>
                )}

                {isOwnProfile && (
                    <Link
                        to="/edit-profile"
                        className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 p-2 rounded-full cursor-pointer hover:bg-white dark:hover:bg-black transition border border-gray-200 dark:border-slate-700"
                        title="Edit Profile"
                    >
                        <Edit2 size={18} className="text-gray-700 dark:text-gray-300" />
                    </Link>
                )}
            </div>

            <div className="px-6 md:px-8 pb-8 relative">
                <div className="flex flex-col md:flex-row items-start md:items-end mb-4 md:mb-6">
                    {/* Avatar */}
                    <div className="relative -mt-16 md:-mt-20">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-gray-200 dark:bg-slate-700 shadow-md">
                            <img
                                src={profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'User')}&background=cbd5e1&color=475569`}
                                alt={profile.full_name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Name & Headline layout adjustments */}
                    <div className="mt-8 md:mt-4 md:ml-6 flex-1 min-w-0 pb-2 flex flex-col justify-end">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
                            {profile.full_name || profile.username || 'Utilisateur'}
                        </h1>
                        {profile.headline && (
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                                {profile.headline}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                            {profile.location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={16} />
                                    <span>{profile.location}</span>
                                </div>
                            )}

                            {profile.website && (
                                <a
                                    href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                                >
                                    <LinkIcon size={16} />
                                    <span className="truncate max-w-[200px]">{profile.website.replace(/^https?:\/\//, '')}</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 md:mt-0 md:mb-3 flex gap-3">
                        {profile.github && (
                            <a
                                href={profile.github.startsWith('http') ? profile.github : `https://github.com/${profile.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
                                title="GitHub"
                            >
                                <Github size={20} />
                            </a>
                        )}
                        {profile.linkedin && (
                            <a
                                href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://linkedin.com/in/${profile.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
                                title="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                        )}
                        {profile.twitter && (
                            <a
                                href={profile.twitter.startsWith('http') ? profile.twitter : `https://twitter.com/${profile.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
                                title="Twitter / X"
                            >
                                <Twitter size={20} />
                            </a>
                        )}
                        {profile.facebook && (
                            <a
                                href={profile.facebook.startsWith('http') ? profile.facebook : `https://facebook.com/${profile.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
                                title="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
