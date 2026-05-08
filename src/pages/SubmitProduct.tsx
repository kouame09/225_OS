import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Rocket, Loader2, Save, X, Globe, Image as ImageIcon, Layout, ArrowLeft, Mail, Smartphone, Upload } from 'lucide-react';
import { addLaunchpadProduct, getLaunchpadProductBySlug, updateLaunchpadProduct, uploadProductImage } from '../services/launchpadService';
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                addNotification('error', 'Type de fichier invalide', 'Veuillez sélectionner une image (PNG, JPG, etc.)');
                return;
            }
            // Check file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                addNotification('error', 'Fichier trop lourd', 'L\'image ne doit pas dépasser 2Mo pour économiser de la bande passante.');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (!name || !tagline || !description || (!url && !appStoreUrl && !playStoreUrl) || (!imageUrl && !imageFile)) {
            addNotification('error', 'Champs manquants', 'Veuillez remplir tous les champs obligatoires (incluant au moins un lien et une image).');
            return;
        }

        setSubmitting(true);
        console.log("Démarrage de la soumission...", { name, hasFile: !!imageFile, imageUrl });

        try {
            let finalImageUrl = imageUrl;
            if (imageFile) {
                console.log("Upload de l'image en cours...");
                finalImageUrl = await uploadProductImage(imageFile);
                console.log("Image uploadée avec succès:", finalImageUrl);
            }

            if (!finalImageUrl) {
                throw new Error("Une image est requise.");
            }
            if (isEditMode && slug) {
                // We need the ID to update. The GET by slug should have it.
                const currentProduct = await getLaunchpadProductBySlug(slug);
                if (!currentProduct) throw new Error("Produit introuvable");

                await updateLaunchpadProduct(currentProduct.id, {
                    name,
                    tagline,
                    description,
                    url,
                    image_url: finalImageUrl,
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
                    image_url: finalImageUrl,
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
            console.log("Soumission terminée.");
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
                                    Capture d'écran / Logo du produit (Requis)
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 dark:border-slate-800 border-dashed rounded-3xl hover:border-emerald-500/50 transition-all bg-slate-50/50 dark:bg-slate-950/50 group">
                                    <div className="space-y-1 text-center">
                                        {(imagePreview || imageUrl) ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={imagePreview || imageUrl}
                                                    alt="Aperçu"
                                                    className="max-h-48 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => { 
                                                        setImageFile(null); 
                                                        setImagePreview(null); 
                                                        setImageUrl(''); 
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-4 group-hover:scale-110 transition-transform">
                                                    <Upload className="h-8 w-8 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                                </div>
                                                <div className="flex text-sm text-slate-600 dark:text-slate-400">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-bold text-emerald-600 hover:text-emerald-500 focus-within:outline-none transition-colors">
                                                        <span>Télécharger un fichier</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                                                    </label>
                                                    <p className="pl-1">ou glisser-déposer</p>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-2 font-medium">
                                                    PNG, JPG, GIF jusqu'à 2Mo
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
