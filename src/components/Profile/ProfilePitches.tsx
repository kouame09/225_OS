import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pitch } from '../../types';
import { getUserPitches } from '../../services/pitchService';
import { Loader2, Lightbulb, MapPin, ExternalLink } from 'lucide-react';

interface ProfilePitchesProps {
    userId: string;
}

const ProfilePitches: React.FC<ProfilePitchesProps> = ({ userId }) => {
    const [pitches, setPitches] = useState<Pitch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPitches = async () => {
            try {
                setLoading(true);
                const userPitches = await getUserPitches(userId);
                setPitches(userPitches);
            } catch (err) {
                console.error("Failed to fetch user pitches", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPitches();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    if (pitches.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="text-emerald-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">PitchHub ({pitches.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pitches.map((pitch) => (
                    <Link
                        key={pitch.id}
                        to={`/pitchhub/${pitch.slug}`}
                        className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
                    >
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-1">
                                {pitch.project_name}
                            </h3>
                            <ExternalLink size={14} className="text-slate-400 group-hover:text-emerald-500 shrink-0 transition-colors" />
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                            {pitch.pitch}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {pitch.location}
                            </span>
                            <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold text-[10px]">
                                {pitch.need}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProfilePitches;
