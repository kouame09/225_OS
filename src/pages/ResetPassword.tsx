import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useNotification } from '../contexts/NotificationContext';
import { Lock, Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have an active session for password reset
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                addNotification('error', 'Lien invalide', 'Votre lien de réinitialisation est invalide ou a expiré.');
                navigate('/');
            }
        };
        checkSession();
    }, [navigate, addNotification]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            addNotification('error', 'Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            addNotification('success', 'Succès', 'Votre mot de passe a été mis à jour avec succès.');

            // Redirect to home after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error: any) {
            addNotification('error', 'Erreur', error.message || 'Impossible de mettre à jour le mot de passe.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        Nouveau mot de passe
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Choisissez un mot de passe sécurisé pour votre compte.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl ring-1 ring-slate-900/5 sm:rounded-2xl sm:px-10">
                        {success ? (
                            <div className="text-center py-4">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="mt-3 text-lg font-medium text-slate-900 dark:text-white">Réinitialisation réussie</h3>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    Votre mot de passe a été mis à jour. Redirection en cours...
                                </p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all"
                                >
                                    Retour à l'accueil
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleReset}>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Nouveau mot de passe
                                    </label>
                                    <div className="mt-1 relative">
                                        <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            required
                                            minLength={6}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Confirmer le mot de passe
                                    </label>
                                    <div className="mt-1 relative">
                                        <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            required
                                            minLength={6}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/30 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin h-5 w-5" />
                                        ) : (
                                            <>
                                                Mettre à jour le mot de passe
                                                <ArrowRight size={18} className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
