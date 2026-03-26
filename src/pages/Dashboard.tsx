import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Project } from '../types';
import { getUserProjects, deleteProject } from '../services/projectService';
import { getUserLaunchpadProducts } from '../services/launchpadService';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Plus, Trash2, Github, ExternalLink, Star, GitFork, Eye, Pencil, User, Rocket, ArrowBigUp, MessageCircle } from 'lucide-react';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import AnnouncementManager from '../components/AnnouncementManager';

const Dashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);

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
        let isMounted = true;

        const fetchMyProjects = async () => {
            if (!user?.id) return;

            try {
                setIsLoadingProjects(true);
                const data = await getUserProjects(user.id);
                if (isMounted) {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to load projects", error);
                if (isMounted) {
                    addNotification('error', 'Échec du chargement', 'Impossible de charger vos projets');
                }
            } finally {
                if (isMounted) {
                    setIsLoadingProjects(false);
                }
            }
        };

        if (user?.id) {
            fetchMyProjects();
        } else {
            // If no user, ensure loading is off
            setIsLoadingProjects(false);
        }

        return () => {
            isMounted = false;
        };
        // Depend ONLY on user.id to avoid refetching when user object ref changes but id is same
    }, [user?.id, addNotification]);

    // Fetch user's launchpad products count
    useEffect(() => {
        const fetchProductsCount = async () => {
            if (!user?.id) return;
            try {
                const products = await getUserLaunchpadProducts(user.id);
                setTotalProducts(products.length);
                const votes = products.reduce((acc, p) => acc + (p.votes_count || 0), 0);
                setTotalVotes(votes);
            } catch (error) {
                console.error('Failed to load products count', error);
            }
        };
        if (user?.id) fetchProductsCount();
    }, [user?.id]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleDeleteClick = (project: Project) => {
        setProjectToDelete(project);
    };

    const confirmDelete = async () => {
        if (!projectToDelete) return;

        setIsDeleting(projectToDelete.id);
        try {
            await deleteProject(projectToDelete.id);
            setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
            addNotification('success', 'Projet supprimé', `"${projectToDelete.name}" a été supprimé avec succès`);

            // Adjust current page if necessary
            const totalPages = Math.ceil((projects.length - 1) / projectsPerPage);
            if (currentPage > totalPages && totalPages > 0) {
                setCurrentPage(totalPages);
            }
        } catch (error) {
            addNotification('error', 'Échec de la suppression', `Impossible de supprimer "${projectToDelete.name}"`);
        } finally {
            setIsDeleting(null);
            setProjectToDelete(null);
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

    const isAdmin = user?.email === 'princekouame7@gmail.com';

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="animate-spin text-slate-400" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Heureux de te revoir, geek ! 👋
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            to="/edit-profile"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                            <User size={20} />
                            <span className="hidden sm:inline">Mon Profil</span>
                        </Link>
                        <Link
                            to="/add"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 transition-all"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Ajouter un projet</span>
                        </Link>
                        {isAdmin && (
                            <Link
                                to="/admin/announcements"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/30 transition-all"
                            >
                                <Rocket size={20} />
                                <span className="hidden sm:inline">Gérer les annonces</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Community Banner */}
                <div className="bg-emerald-600/10 dark:bg-emerald-600/5 border border-emerald-500/20 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                            <MessageCircle size={22} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-emerald-900 dark:text-emerald-400 font-bold">Rejoignez le Gbonhi ! 🇨🇮</h3>
                            <p className="text-emerald-700/70 dark:text-emerald-500/60 text-sm">Discutez avec les autres builders sur WhatsApp.</p>
                        </div>
                    </div>
                    <a
                        href="https://chat.whatsapp.com/CjWNZ6lTyrc4m0Yweizi99?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-emerald-500/20 text-center"
                    >
                        Rejoindre le groupe
                    </a>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Projets</div>
                        <div className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{totalProjects}</div>
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <Github size={14} className="text-slate-400" />
                            <span className="text-xs text-slate-400 dark:text-slate-500">dépôts importés</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Produits</div>
                        <div className="text-4xl font-bold text-emerald-500 mt-2 flex items-center gap-2">
                            {totalProducts} <Rocket size={24} />
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <ArrowBigUp size={16} className="text-emerald-400" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{totalVotes}</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">votes récoltés</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Étoiles</div>
                        <div className="text-4xl font-bold text-amber-500 mt-2 flex items-center gap-2">
                            {totalStars} <Star size={24} fill="currentColor" />
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <Star size={14} className="text-amber-400" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">~{totalProjects > 0 ? (totalStars / totalProjects).toFixed(1) : 0}</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">par projet</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Forks</div>
                        <div className="text-4xl font-bold text-slate-700 dark:text-slate-300 mt-2 flex items-center gap-2">
                            {totalForks} <GitFork size={24} />
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <GitFork size={14} className="text-slate-400" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">~{totalProjects > 0 ? (totalForks / totalProjects).toFixed(1) : 0}</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">par projet</span>
                        </div>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Vos Projets</h2>
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
                                                <img
                                                    src={project.imageUrl}
                                                    alt={project.name}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300 dark:text-slate-600">${project.name.substring(0, 2).toUpperCase()}</div>`;
                                                    }}
                                                    className="w-full h-full object-cover opacity-60 rounded-lg"
                                                />
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
                                                    title="Voir sur GitHub"
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
                                                    title="Voir le projet"
                                                >
                                                    <Eye size={16} />
                                                    <span>Voir</span>
                                                </Link>
                                                <Link
                                                    to={`/edit/${project.slug}`}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors text-sm font-medium"
                                                    title="Modifier le projet"
                                                >
                                                    <Pencil size={16} />
                                                    <span>Modifier</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(project)}
                                                    disabled={isDeleting === project.id}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                                                    title="Supprimer le projet"
                                                >
                                                    {isDeleting === project.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                    <span>Supprimer</span>
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
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white">Aucun projet pour le moment</h3>
                            <p className="text-slate-500 mt-2 mb-6">Importez votre premier dépôt pour commencer.</p>
                            <Link
                                to="/add"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium"
                            >
                                Importer un dépôt
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!projectToDelete}
                onClose={() => !isDeleting && setProjectToDelete(null)}
                onConfirm={confirmDelete}
                title="Supprimer le projet"
                message={`Êtes-vous sûr de vouloir supprimer définitivement le projet "${projectToDelete?.name}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                isDangerous={true}
                isLoading={!!isDeleting}
            />
        </div>
    );
};

export default Dashboard;