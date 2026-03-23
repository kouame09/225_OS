import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Rocket, Loader2, Save, X, Globe, Image as ImageIcon, Layout, ArrowLeft, Mail, Smartphone } from 'lucide-react';
import { addLaunchpadProduct, getLaunchpadProductBySlug, updateLaunchpadProduct } from '../services/launchpadService';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const SubmitProduct: React.FC = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const { addNotification } = useNotification();

    const [submitting, setSubmitting] = useState(false);

    // Form States
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [appStoreUrl, setAppStoreUrl] = useState('');
    const [playStoreUrl, setPlayStoreUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const { slug } = useParams<{ slug: string }>();
    const isEditMode = !!slug;

    // Protect Route
    useEffect(() => {
        if (!loading && !user) {
            navigate('/launchpad');
            addNotification('warning', 'Accès restreint', 'Vous devez être connecté pour lancer un produit.');
        }
    }, [loading, user, navigate]);

    // Fetch Product for Edit Mode
    useEffect(() => {
        if (isEditMode && slug) {
            const fetchProduct = async () => {
                const product = await getLaunchpadProductBySlug(slug);
                if (product) {
                    if (product.maker_id !== user?.id) {
                        navigate('/launchpad');
                        addNotification('error', 'Accès refusé', 'Vous ne pouvez pas modifier ce produit.');
                        return;
                    }
                    setName(product.name);
                    setTagline(product.tagline);
                    setDescription(product.description);
                    setUrl(product.url);
                    setAppStoreUrl(product.app_store_url || '');
                    setPlayStoreUrl(product.play_store_url || '');
                    setImageUrl(product.image_url);
                    setContactEmail(product.contact_email || '');
                } else {
                    navigate('/launchpad');
                    addNotification('error', 'Produit introuvable', 'Le produit que vous souhaitez modifier n\'existe pas.');
                }
            };
            fetchProduct();
        }
    }, [isEditMode, slug, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (!name || !tagline || !description || (!url && !appStoreUrl && !playStoreUrl) || !imageUrl) {
            addNotification('error', 'Champs manquants', 'Veuillez remplir tous les champs obligatoires (incluant au moins un lien).');
            return;
        }

        setSubmitting(true);

        try {
            if (isEditMode && slug) {
                // We need the ID to update. The GET by slug should have it.
                const currentProduct = await getLaunchpadProductBySlug(slug);
                if (!currentProduct) throw new Error("Produit introuvable");

                await updateLaunchpadProduct(currentProduct.id, {
                    name,
                    tagline,
                    description,
                    url,
                    image_url: imageUrl,
                    contact_email: contactEmail,
                    app_store_url: appStoreUrl,
                    play_store_url: playStoreUrl
                });
                addNotification('success', 'Produit mis à jour !', `Vos modifications pour "${name}" ont été enregistrées.`);
            } else {
                await addLaunchpadProduct({
                    name,
                    tagline,
                    description,
                    url,
                    image_url: imageUrl,
                    maker_id: user.id,
                    contact_email: contactEmail,
                    app_store_url: appStoreUrl,
                    play_store_url: playStoreUrl
                });
                addNotification('success', 'Produit lancé !', `"${name}" est maintenant en orbite dans le Launchpad.`);
            }
            navigate('/launchpad');
        } catch (e: any) {
            console.error(e);
            addNotification('error', isEditMode ? 'Échec de la mise à jour' : 'Échec du lancement', e.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-2xl mx-auto">

                <Link
                    to="/launchpad"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 group transition-colors"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Retour au Launchpad</span>
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                        {isEditMode ? 'Modifier votre produit' : 'Lancer votre produit'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        {isEditMode ? 'Mettez à jour les informations de votre création.' : 'Présentez votre création à la communauté tech ivoirienne.'}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-6">

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Nom du produit
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Layout className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Lumoojob"
                                        className="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Accroche (Tagline)
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="La description courte qui donne envie de cliquer"
                                    maxLength={80}
                                    className="block w-full px-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    value={tagline}
                                    onChange={(e) => setTagline(e.target.value)}
                                />
                                <p className="mt-2 text-xs text-slate-400 text-right font-medium">{tagline.length}/80</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Lien du produit (URL) - Requis si aucun store n'est renseigné
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Globe className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://monproduit.com"
                                        className="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    URL App Store (Facultatif)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Smartphone className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://apps.apple.com/..."
                                        className="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={appStoreUrl}
                                        onChange={(e) => setAppStoreUrl(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    URL Play Store (Facultatif)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Smartphone className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://play.google.com/store/..."
                                        className="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={playStoreUrl}
                                        onChange={(e) => setPlayStoreUrl(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    URL de la capture d'écran / Logo
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <ImageIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://image-url.com/shot.png"
                                        className="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </div>
                                {imageUrl && (
                                    <div className="mt-4 p-2 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase ml-2">Aperçu</p>
                                        <img
                                            src={imageUrl}
                                            alt="Aperçu"
                                            className="max-h-40 rounded-xl mx-auto shadow-md"
                                            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Format+image+invalide')}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Email de contact (Facultatif)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Ex: hello@monproduit.com"
                                        className="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                    />
                                </div>
                                <p className="mt-2 text-xs text-slate-400 font-medium">Pour que les utilisateurs puissent vous joindre directement via le bouton "Discuter".</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Description détaillée
                            </label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Racontez l'histoire de votre produit, pourquoi vous l'avez créé et ce qu'il apporte de nouveau..."
                                className="block w-full px-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 group"
                            >
                                {submitting ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        {isEditMode ? <Save size={20} /> : <Rocket size={20} className="group-hover:-translate-y-1 transition-transform" />}
                                        <span>{isEditMode ? 'Enregistrer les modifications' : 'Lancer le produit au Launchpad'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitProduct;
