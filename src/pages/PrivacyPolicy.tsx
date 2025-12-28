import React, { useEffect } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-12 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <Lock className="text-slate-700 dark:text-slate-300" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Politique de confidentialité</h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-sm text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
              Dernière mise à jour : {new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">1. Informations que nous collectons</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              225 Open Source est une plateforme publique. Les projets affichés ici sont agrégés à partir de dépôts GitHub publics.
              Lorsque vous soumettez un projet, nous récupérons les métadonnées publiques (nom du dépôt, description, étoiles, forks, langage) via l'API GitHub.
              Nous ne stockons pas de mots de passe, de données de dépôts privés ou d'informations de contact personnelles au-delà de ce qui est publiquement disponible sur votre profil GitHub.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">2. Collecte de données et authentification</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Nous collectons et stockons les données suivantes <strong>exclusivement pour l'authentification et les fonctionnalités de la plateforme</strong> :
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-4 space-y-2">
              <li><strong>Adresse e-mail</strong> : Utilisée pour la création de compte et la connexion</li>
              <li><strong>Informations du profil GitHub</strong> : Lorsque vous vous connectez avec GitHub, nous collectons votre nom d'utilisateur GitHub, votre photo de profil et votre e-mail (si public)</li>
              <li><strong>Données du projet</strong> : Informations sur les projets open source que vous ajoutez à la plateforme</li>
              <li><strong>Préférence de thème</strong> : Votre préférence pour le mode clair/sombre est stockée localement dans votre navigateur</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              <strong>Nous n'utilisons PAS</strong> de cookies de suivi, d'outils d'analyse tiers pour la publicité, et nous ne vendons pas vos données à des tiers. Toutes les données collectées sont utilisées uniquement pour fournir et améliorer l'expérience de la plateforme 225 Open Source.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">3. Liens externes</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Notre site web contient des liens vers des sites externes (par exemple, GitHub). Si vous cliquez sur un lien tiers, vous serez redirigé vers ce site. Notez que ces sites externes ne sont pas exploités par nous, et nous vous conseillons de consulter leurs politiques de confidentialité.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">4. Contactez-nous</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse <a href="mailto:hello@princekouame.com" className="text-emerald-600 hover:underline">hello@princekouame.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;