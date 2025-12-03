import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Project } from '../types';
import { getUserProjects, deleteProject } from '../services/projectService';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Plus, Trash2, Github, ExternalLink, Star, GitFork } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    // Stats
    const totalProjects = projects.length;
    const totalStars = projects.reduce((acc, curr) => acc + curr.stars, 0);
    const totalForks = projects.reduce((acc, curr) => acc + curr.forks, 0);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        const fetchMyProjects = async () => {
            if (user) {
                try {
                    const data = await getUserProjects(user.id);
                    setProjects(data);
                } catch (error) {
                    console.error("Failed to load projects", error);
                } finally {
                    setIsLoadingProjects(false);
                }
            }
        };
        if (user) fetchMyProjects();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setIsDeleting(id);
            try {
                await deleteProject(id);
                setProjects(prev => prev.filter(p => p.id !== id));
            } catch (error) {
                alert('Failed to delete project');
            } finally {
                setIsDeleting(null);
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="animate-spin text-slate-400" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Welcome back, Geek! 👋
                        </p>
                    </div>
                    <Link
                        to="/add"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 transition-all"
                    >
                        <Plus size={20} />
                        Add Project
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Projects</div>
                        <div className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{totalProjects}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Stars</div>
                        <div className="text-4xl font-bold text-amber-500 mt-2 flex items-center gap-2">
                            {totalStars} <Star size={24} fill="currentColor" />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Forks</div>
                        <div className="text-4xl font-bold text-slate-700 dark:text-slate-300 mt-2 flex items-center gap-2">
                            {totalForks} <GitFork size={24} />
                        </div>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Projects</h2>
                    </div>

                    {isLoadingProjects ? (
                        <div className="p-12 flex justify-center">
                            <Loader2 className="animate-spin text-emerald-500" size={32} />
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                                <thead className="bg-slate-50 dark:bg-slate-950/50 uppercase text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <tr>
                                        <th className="px-6 py-4">Project Name</th>
                                        <th className="px-6 py-4 hidden sm:table-cell">Stack</th>
                                        <th className="px-6 py-4 text-center">Stars</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {projects.map((project) => (
                                        <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                                    {project.name}
                                                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                                        <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                                <div className="text-xs mt-1 truncate max-w-[200px]">{project.description}</div>
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell">
                                                <div className="flex gap-1 flex-wrap max-w-[200px]">
                                                    {project.stacks.slice(0, 3).map(s => (
                                                        <span key={s} className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {project.stars}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    disabled={isDeleting === project.id}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete Project"
                                                >
                                                    {isDeleting === project.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <Github className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No projects yet</h3>
                            <p className="text-slate-500 mt-2 mb-6">Import your first repository to get started.</p>
                            <Link
                                to="/add"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium"
                            >
                                Import Repository
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;