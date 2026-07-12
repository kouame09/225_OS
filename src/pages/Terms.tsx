import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-12 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <FileText className="text-slate-700 dark:text-slate-300" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">CGU</h1>
          </div>

          <div>
            <p className="text-sm text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
              Dernière mise à jour : {new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">1. Présentation de la plateforme</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              225 Open Source (ci-après "la Plateforme") est un annuaire collaboratif de projets open source initiés par des développeurs ivoiriens ou affiliés à la Côte d'Ivoire. La Plateforme permet aux utilisateurs de référencer des projets GitHub, de publier des articles, de soumettre des produits via le Launchpad, et de partager des pitches via le PitchHub.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">2. Acceptation des conditions</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              En accédant ou en utilisant la Plateforme, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la Plateforme. Nous nous réservons le droit de modifier ces conditions à tout moment ; les modifications prennent effet dès leur publication sur cette page.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">3. Inscription et compte</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              La création d'un compte est nécessaire pour soumettre un projet, publier un article ou interagir avec la Plateforme. Vous pouvez vous inscrire via votre compte GitHub ou par email. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités réalisées sous votre compte. Vous vous engagez à fournir des informations exactes et à les maintenir à jour.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">4. Contenu publié</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              En soumettant un projet, un article, un produit Launchpad ou un pitch, vous garantissez que :
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-4 space-y-2">
              <li>Vous détenez les droits nécessaires sur le contenu publié ou êtes autorisé à le partager</li>
              <li>Le contenu respecte les lois et réglementations en vigueur</li>
              <li>Le contenu n'est pas diffamatoire, obscène, frauduleux ou illégal</li>
              <li>Les projets GitHub référencés sont des dépôts publics</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Nous nous réservons le droit de supprimer tout contenu qui enfreindrait ces conditions, sans préavis.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">5. Propriété intellectuelle</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Les projets open source référencés sur la Plateforme restent la propriété de leurs auteurs respectifs et sont régis par leurs propres licences. Le contenu soumis par les utilisateurs (descriptions, articles, etc.) leur appartient. La Plateforme ne revendique aucun droit de propriété sur ces contenus au-delà de ce qui est nécessaire pour les afficher et les partager.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">6. Conduite des utilisateurs</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Vous vous engagez à ne pas :
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-4 space-y-2">
              <li>Utiliser la Plateforme à des fins frauduleuses ou illégales</li>
              <li>Tenter d'accéder sans autorisation aux comptes d'autres utilisateurs</li>
              <li>Soumettre des projets ou contenus que vous n'êtes pas autorisé à partager</li>
              <li>Perturber le fonctionnement de la Plateforme (attaques, spam, scraping abusif)</li>
              <li>Usurper l'identité d'une personne ou d'une entité</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">7. Rôle de l'API GitHub</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              La Plateforme interagit avec l'API GitHub pour récupérer les métadonnées publiques des projets (étoiles, forks, description, langage). Ces données sont mises en cache et mises à jour périodiquement. Nous ne sommes pas responsables des indisponibilités ou des limitations de l'API GitHub. L'utilisation de GitHub reste soumise à ses propres conditions d'utilisation.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">8. Limitation de responsabilité</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              225 Open Source est fournie "en l'état", sans garantie d'aucune sorte, explicite ou implicite. Nous ne garantissons pas que la Plateforme sera ininterrompue, sécurisée ou exempte d'erreurs. En aucun cas, 225 Open Source ou ses mainteneurs ne pourront être tenus responsables des dommages directs ou indirects résultant de l'utilisation de la Plateforme.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">9. Suspension et résiliation</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Nous nous réservons le droit de suspendre ou résilier votre accès à la Plateforme à tout moment, sans préavis, en cas de violation des présentes conditions ou pour toute autre raison jugée nécessaire. En cas de résiliation, vos contenus publiés pourront être supprimés, sauf disposition légale contraire.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">10. Dons et soutien financier</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              La Plateforme peut proposer des moyens de soutien financier via des services tiers (Buy Me a Coffee, etc.). Les transactions sont traitées exclusivement par ces services et sont soumises à leurs propres conditions. 225 Open Source n'est pas responsable des transactions ni des litiges pouvant survenir avec ces services tiers.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">11. Données personnelles</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              L'utilisation de vos données personnelles est régie par notre <a href="/privacy" className="text-emerald-600 hover:underline">Politique de confidentialité</a>. En utilisant la Plateforme, vous consentez à la collecte et à l'utilisation de vos données conformément à cette politique.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">12. Contact</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Pour toute question relative aux présentes CGU, veuillez nous contacter à l'adresse <a href="mailto:hello@princekouame.com" className="text-emerald-600 hover:underline">hello@princekouame.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
