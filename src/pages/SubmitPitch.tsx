import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Lightbulb, ArrowLeft, Send, Loader2, Info, Globe, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { addPitch, getPitchBySlug, updatePitch } from '../services/pitchService';
import AuthModal from '../components/AuthModal';

const SubmitPitch: React.FC = () => {
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();
    const isEditMode = !!slug;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pitchId, setPitchId] = useState<string | null>(null);

    // Form states
    const [projectName, setProjectName] = useState('');
    const [problem, setProblem] = useState('');
    const [pitchContent, setPitchContent] = useState('');
    const [need, setNeed] = useState('Co-fondateur');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [link, setLink] = useState('');

    const needs = [
        'Co-fondateur',
        'Latefounder',
        'Investisseur',
        'Lead Technique',
        'Mentor / Conseils',
        'Associé',
        'Bêta-testeurs'
    ];

    useEffect(() => {
        if (isEditMode && slug) {
            const loadPitch = async () => {
                try {
                    const data = await getPitchBySlug(slug);
                    if (data) {
                        setPitchId(data.id);
                        setProjectName(data.project_name);
                        setProblem(data.problem || '');
                        setPitchContent(data.pitch);
                        setNeed(data.need);
                        setEmail(data.email);
                        setLocation(data.location);
                        setLink(data.link || '');
                    } else {
                        addNotification('error', 'Oups', 'Pitch introuvable.');
                        navigate('/pitchhub');
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            loadPitch();
        } else if (user) {
            setEmail(user.email || '');
            setLocation(user.location || '');
        }
    }, [slug, isEditMode, user, navigate, addNotification]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        if (!projectName || !pitchContent || !need || !email || !location) {
            addNotification('error', 'Champs requis', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Format link: add https:// if missing but only if not empty
        let formattedLink = link.trim();
        if (formattedLink && !formattedLink.startsWith('http')) {
            formattedLink = `https://${formattedLink}`;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                project_name: projectName,
                problem: problem || null,
                pitch: pitchContent,
                need: need,
                email: email,
                location: location,
                link: formattedLink || null // Use null instead of undefined for DB
            };

            if (isEditMode && pitchId) {
                await updatePitch(pitchId, payload);
                addNotification('success', 'Pitch mis à jour', 'Vos modifications ont été enregistrées.');
            } else {
                await addPitch({
                    ...payload,
                    user_id: user.id
                } as any);
                addNotification('success', 'Pitch publié !', 'Votre idée est maintenant visible sur PitchHub.');
            }
            navigate('/pitchhub');
        } catch (error: any) {
            console.error('SubmitPitch Error:', error);
            addNotification('error', 'Erreur', error.message || 'Impossible de soumettre votre pitch.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="animate-spin text-emerald-500" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Back Link */}
                <Link to="/pitchhub" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors mb-8 font-medium">
                    <ArrowLeft size={18} />
                    Retour au Hub
                </Link>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {/* Form Header */}
                    <div className="px-8 py-10 bg-emerald-600 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                            <Lightbulb size={180} className="text-white" />
                        </div>
                        <div className="relative z-10">
                            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                                {isEditMode ? 'Modifier votre Pitch' : 'Propulsez votre idée'}
                            </h1>
                            <p className="text-emerald-100 text-lg opacity-90">
                                {isEditMode ? 'Ajustez votre message pour captiver les bonnes personnes.' : 'Partagez l\'essentiel de votre projet et trouvez les bons partenaires.'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Project Name */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                Nom du projet <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Comment s'appelle votre idée ?"
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                        </div>

                        {/* The Problem */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                    Le Problème (Pourquoi ce projet ?)
                                </label>
                                <span className={`text-xs font-medium ${problem.length > 250 ? 'text-rose-500' : 'text-slate-400'}`}>
                                    {problem.length} / 300
                                </span>
                            </div>
                            <textarea
                                placeholder="Quel problème votre projet résout-il ? Décrivez brièvement le pain point ou le besoin auquel vous répondez. (Ex: Les développeurs locaux ont du mal à trouver des projets pertinents dans leur région)"
                                className="w-full h-28 px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white resize-none"
                                value={problem}
                                onChange={(e) => setProblem(e.target.value.slice(0, 300))}
                            />
                        </div>

                        {/* The Pitch */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                    Le Pitch (L'essentiel) <span className="text-rose-500">*</span>
                                </label>
                                <span className={`text-xs font-medium ${pitchContent.length > 450 ? 'text-rose-500' : 'text-slate-400'}`}>
                                    {pitchContent.length} / 500
                                </span>
                            </div>
                                <textarea
                                    placeholder="Exemple : Une plateforme qui connecte les développeurs locaux avec des projets innovants. (Expliquez votre concept en quelques phrases, sans donner les détails techniques et stratégiques)."
                                className="w-full h-40 px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white resize-none"
                                value={pitchContent}
                                onChange={(e) => setPitchContent(e.target.value.slice(0, 500))}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Need Select */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                    Votre besoin principal <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white cursor-pointer appearance-none"
                                    value={need}
                                    onChange={(e) => setNeed(e.target.value)}
                                >
                                    {needs.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>

                            {/* Email Contact */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                    Email de contact <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Votre adresse email"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Location */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                    Localisation <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Ex: Abidjan, Côte d'Ivoire"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Optional Link */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                    Lien ressource (Facultatif)
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Site, Document, Deck..."
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-600 text-white font-black text-xl rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 group"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <span>{isEditMode ? 'Enregistrer les modifications' : 'Propulser mon Pitch'}</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitPitch;
