import React, { useEffect, useState } from 'react';
import { Project } from '../../types';
import { getUserProjects } from '../../services/projectService';
import ProjectCard from '../ProjectCard';
import { Loader2 } from 'lucide-react';

interface ProfileProjectsProps {
    userId: string;
}

const ProfileProjects: React.FC<ProfileProjectsProps> = ({ userId }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const userProjects = await getUserProjects(userId);
                setProjects(userProjects);
            } catch (err) {
                console.error("Failed to fetch user projects", err);
                setError("Impossible de charger les projets.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProjects();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }


    if (projects.length === 0) {
        return (
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 text-center border border-gray-100 dark:border-dark-border">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Cet utilisateur n'a pas encore ajouté de projets.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Projets ({projects.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProfileProjects;
