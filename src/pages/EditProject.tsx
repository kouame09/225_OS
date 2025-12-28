import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Save, X } from 'lucide-react';
import { getProjectBySlug, updateProject } from '../services/projectService';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Project } from '../types';

const EditProject: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();
    const { user, loading: authLoading } = useAuth();
    const { addNotification } = useNotification();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [project, setProject] = useState<Project | null>(null);

    // Form States
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [stacks, setStacks] = useState<string[]>([]);
    const [stackInput, setStackInput] = useState('');

    // Fetch project data
    useEffect(() => {
        const fetchProject = async () => {
            if (!slug) {
                navigate('/dashboard');
                return;
            }

            try {
                const foundProject = await getProjectBySlug(slug);
                if (!foundProject) {
                    setError('Projet non trouvé');
                    addNotification('error', 'Projet non trouvé', 'Le projet demandé n\'a pas pu être trouvé');
                    setTimeout(() => navigate('/dashboard'), 2000);
                    return;
                }

                // Check if user owns this project
                if (foundProject.userId !== user?.id) {
                    setError('Vous n\'avez pas la permission de modifier ce projet');
                    addNotification('error', 'Accès refusé', 'Vous n\'avez pas la permission de modifier ce projet');
                    setTimeout(() => navigate('/dashboard'), 2000);
                    return;
                }

                setProject(foundProject);
                setName(foundProject.name);
                setAuthor(foundProject.author);
                setDescription(foundProject.description);
                setStacks(foundProject.stacks);
            } catch (err) {
                setError('Échec du chargement du projet');
                addNotification('error', 'Échec du chargement', 'Impossible de charger les données du projet');
                setTimeout(() => navigate('/dashboard'), 2000);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchProject();
        } else if (!authLoading && !user) {
            navigate('/');
        }
    }, [slug, user, authLoading, navigate, addNotification]);

    const handleAddStack = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && stackInput.trim()) {
            e.preventDefault();
            if (!stacks.includes(stackInput.trim())) {
                setStacks([...stacks, stackInput.trim()]);
            }
            setStackInput('');
        }
    };

    const removeStack = (tag: string) => {
        setStacks(stacks.filter(s => s !== tag));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project || !user) return;

        setSubmitting(true);
        setError(null);

        try {
            await updateProject(project.id, { name, author, description, stacks });
            addNotification('success', 'Projet mis à jour !', `"${name}" a été mis à jour avec succès`);
            navigate('/dashboard');
        } catch (err: any) {
            setError('Échec de la mise à jour du projet : ' + err.message);
            addNotification('error', 'Échec de la mise à jour', 'Impossible de mettre à jour le projet : ' + err.message);
            setSubmitting(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
                <Loader2 className="animate-spin text-emerald-500" />
            </div>
        );
    }

    if (error && !project) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <p className="text-slate-500">Redirection...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-2xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Modifier le projet</h1>
                    <p className="text-slate-600 dark:text-slate-400">Mettez à jour les informations de votre projet.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Nom du projet
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Auteur / Organisation
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Description (Max 200 caract.)
                            </label>
                            <textarea
                                required
                                maxLength={200}
                                rows={3}
                                className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <p className="mt-1 text-xs text-slate-500 text-right">{description.length}/200</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Tech Stack & Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2 p-2 border border-slate-200 dark:border-slate-800 rounded-lg min-h-[42px] bg-slate-50 dark:bg-slate-900/50">
                                {stacks.map(stack => (
                                    <span key={stack} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                                        {stack}
                                        <button type="button" onClick={() => removeStack(stack)} className="ml-1.5 text-emerald-600 dark:text-emerald-300 hover:text-emerald-800">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    className="flex-grow min-w-[120px] bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-md px-2 py-1 text-sm dark:text-white"
                                    placeholder="Tapez et appuyez sur Entrée..."
                                    value={stackInput}
                                    onChange={(e) => setStackInput(e.target.value)}
                                    onKeyDown={handleAddStack}
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all disabled:opacity-70"
                            >
                                {submitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                Enregistrer les modifications
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProject;
