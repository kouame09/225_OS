import React from 'react';

interface ProfileAboutProps {
    bio: string;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ bio }) => {
    if (!bio) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">À propos</h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {bio}
            </div>
        </div>
    );
};

export default ProfileAbout;
