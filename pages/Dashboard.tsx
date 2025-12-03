import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Project } from '../types';
import { getUserProjects, deleteProject } from '../services/projectService';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Plus, Trash2, Github, ExternalLink, Star, GitFork, Eye, Pencil } from 'lucide-react';
import Pagination from '../components/Pagination';

const Dashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

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
                    addNotification('error', 'Load failed', 'Failed to load your projects');
                } finally {
                    setIsLoadingProjects(false);
                }
            }
        };
        if (user) fetchMyProjects();
    }, [user, addNotification]);

    const handleDelete = async (id: string) => {
        const projectToDelete = projects.find(p => p.id === id);
        if (!projectToDelete) return;

        if (confirm(`Are you sure you want to delete "${projectToDelete.name}"?`)) {
            setIsDeleting(id);
            try {
                await deleteProject(id);
                setProjects(prev => prev.filter(p => p.id !== id));
                addNotification('success', 'Project deleted', `"${projectToDelete.name}" has been successfully deleted`);
                
                // Adjust current page if necessary
                const totalPages = Math.ceil((projects.length - 1) / projectsPerPage);
                if (currentPage > totalPages && totalPages > 0) {
                    setCurrentPage(totalPages);
                }
            } catch (error) {
                addNotification('error', 'Delete failed', `Failed to delete "${projectToDelete.name}"`);
            } finally {
                setIsDeleting(null);
            }
        }
    };

    // Pagination functions
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

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
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {currentProjects.map((project) => (
                                <div key={project.id} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300">
                                    {/* Card Image/Header */}
                                    <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
                                        {project.imageUrl ? (
                                            <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover opacity-60" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300 dark:text-slate-600">
                                                {project.name.substring(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                        {/* Stats Badge */}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <div className="flex items-center gap-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-amber-500 shadow-sm">
                                                <Star size={12} fill="currentColor" />
                                                <span>{project.stars}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
                                                <GitFork size={12} />
                                                <span>{project.forks}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5">
                                        {/* Project Name & GitHub Link */}
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight flex-1">
                                                {project.name}
                                            </h3>
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 ml-2"
                                                title="View on GitHub"
                                            >
                                                <Github size={18} />
                                            </a>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.stacks.slice(0, 3).map(stack => (
                                                <span key={stack} className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
                                                    {stack}
                                                </span>
                                            ))}
                                            {project.stacks.length > 3 && (
                                                <span className="px-2 py-0.5 text-xs text-slate-500">+{project.stacks.length - 3}</span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                                            <Link
                                                to={`/project/${project.slug}`}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm font-medium"
                                                title="View Project"
                                            >
                                                <Eye size={16} />
                                                <span>View</span>
                                            </Link>
                                            <Link
                                                to={`/edit/${project.slug}`}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors text-sm font-medium"
                                                title="Edit Project"
                                            >
                                                <Pencil size={16} />
                                                <span>Edit</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                disabled={isDeleting === project.id}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                                                title="Delete Project"
                                            >
                                                {isDeleting === project.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="px-6 pb-6">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={paginate}
                                        onPreviousPage={goToPreviousPage}
                                        onNextPage={goToNextPage}
                                    />
                                </div>
                            )}
                        </>
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