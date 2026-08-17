import React, { useEffect, useState } from 'react';
import { Heart, Globe, Shield, Lightbulb, TrendingUp, Users, Code, DollarSign, Quote, Rocket, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const Why225OpenSource: React.FC = () => {
    const [isAuthOpen, setIsAuthOpen] = React.useState(false);
    const [view, setView] = useState<'apropos' | 'manifeste'>('apropos');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialView="signup"
            />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-12 pb-24 font-sans">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        {/* Toggle À propos / Manifeste */}
                        <div className="flex bg-slate-200/55 dark:bg-slate-800/60 p-1 rounded-xl w-fit mb-8">
                            <button
                                onClick={() => setView('apropos')}
                                className={`px-5 py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer ${view === 'apropos'
                                    ? 'bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-md shadow-slate-200/50 dark:shadow-none'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                À propos
                            </button>
                            <button
                                onClick={() => setView('manifeste')}
                                className={`px-5 py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer ${view === 'manifeste'
                                    ? 'bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-md shadow-slate-200/50 dark:shadow-none'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                Manifeste
                            </button>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                            Pourquoi <span className="text-transparent bg-clip-text bg-emerald-600">225 Open Source ?</span>
                        </h1>
                    </div>

                    {view === 'apropos' ? (
                        <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-8">
                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Lightbulb size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">La vision : De l'invisible à l'inévitable</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    Actuellement, quand les gens pensent à l'innovation technologique, ils pensent à la Silicon Valley, Tel Aviv, Bangalore ou Shenzhen. <strong className="text-slate-900 dark:text-white font-semibold">Abidjan n'est pas encore sur cette liste.</strong>
                                </p>
                                <p className="text-lg leading-relaxed">
                                    225 Open Source est notre réponse à cette invisibilité. Nous créons une vitrine centralisée de l'innovation ivoirienne qui prouve que nos professionnels de la tech ne font pas que consommer de la technologie, nous la créons. Chaque projet ajouté est une déclaration : <em className="text-slate-900 dark:text-white">"Nous construisons. Nous innovons. Nous comptons."</em>
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Impact économique : Construire des carrières, pas seulement du code</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    En Côte d'Ivoire, les développeurs talentueux ont du mal à prouver leurs compétences aux entreprises internationales. Un CV PDF ne signifie rien face à la concurrence mondiale. Mais un <strong className="text-slate-900 dark:text-white font-semibold">portfolio public de contributions réelles ?</strong> C'est une preuve indéniable.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Shield size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Souveraineté numérique : Maîtriser notre avenir</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    Chaque dollar dépensé en SaaS étranger est un dollar qui quitte notre économie. Chaque dépendance à un logiciel propriétaire est une vulnérabilité. <strong className="text-slate-900 dark:text-white font-semibold">L'open source est notre voie vers l'indépendance numérique.</strong>
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Quand nous construisons des systèmes de paiement qui comprennent le Mobile Money, quand nous créons des outils agricoles qui fonctionnent hors-ligne, quand nous développons des solutions pour nos défis spécifiques, nous ne faisons pas que résoudre des problèmes. Nous construisons une infrastructure qui <em className="text-slate-900 dark:text-white">nous appartient</em>, que nous contrôlons, que nous pouvons modifier et améliorer indéfiniment.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Users size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Communauté : En finir avec l'isolement</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    Trop de développeurs ivoiriens travaillent en silos. Un ingénieur brillant à Bouaké ne connaît pas le projet incroyable en cours à Abidjan. Une startup à Yopougon réinvente la roue car elle ignore que quelqu'un a déjà résolu ce problème.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    225 Open Source brise ces murs. Nous créons un <strong className="text-slate-900 dark:text-white font-semibold">écosystème unifié</strong> où la collaboration remplace l'isolement, où la connaissance circule librement, où nous nous soutenons mutuellement au lieu de rivaliser dans l'ombre.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Globe size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Un modèle pour l'Afrique</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    Ce que nous construisons en Côte d'Ivoire n'est pas seulement pour nous. C'est un <strong className="text-slate-900 dark:text-white font-semibold">modèle que n'importe quel pays africain peut reproduire</strong>. Imaginez "Ghana Open Source", "Senegal Open Source", "Kenya Open Source", chaque pays mettant en avant son innovation, chaque écosystème renforçant les autres.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Ensemble, nous pouvons faire passer la perception mondiale de la tech africaine de "marché émergent" à "puissance d'innovation". Mais cela commence par un pays qui montre la voie. <em className="text-slate-900 dark:text-white">Ce pays est la Côte d'Ivoire.</em>
                                </p>
                            </section>

                            <section className="bg-gradient-to-br from-emerald-50 to-steel-50 dark:from-emerald-950/20 dark:to-steel-900/20 p-8 sm:p-10 rounded-3xl border border-emerald-200 dark:border-emerald-800 mt-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Heart className="text-red-500 fill-current animate-pulse" size={24} />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notre Mission</h3>
                                    </div>
                                    <p className="italic text-xl text-slate-700 dark:text-slate-300 font-serif mb-6">
                                        "Faire de la Côte d'Ivoire un hub reconnu de l'innovation open-source, prouvant que les développeurs africains ne sont pas de simples participants à l'écosystème tech mondial, nous sommes des leaders, des créateurs et des pionniers."
                                    </p>
                                    <div className="pt-6 border-t border-emerald-200 dark:border-emerald-800">
                                        <p className="text-lg text-slate-600 dark:text-slate-400">
                                            C'est plus grand qu'une plateforme. C'est un mouvement. Et chaque projet que vous ajoutez, chaque contribution que vous faites, chaque collaboration que vous commencez, <strong className="text-slate-900 dark:text-white">vous participez à l'écriture de l'histoire</strong>.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="text-center bg-slate-900 dark:bg-white p-10 rounded-3xl">
                                <Code className="mx-auto mb-4 text-white dark:text-slate-900" size={48} />
                                <h3 className="text-2xl font-bold text-white dark:text-slate-900 mb-4">Prêt à écrire l'histoire ?</h3>
                                <p className="text-slate-300 dark:text-slate-600 mb-6 max-w-xl mx-auto">
                                    Ne laissez pas votre projet être une autre pépite cachée. Partagez-le avec la communauté tech ivoirienne et aidez à mettre la Côte d'Ivoire sur la carte technologique mondiale.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        to="/#hero"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all"
                                    >
                                        Commencer
                                    </Link>
                                    <Link
                                        to="/donate"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white dark:border-slate-900 text-white dark:text-slate-900 rounded-xl hover:bg-white/10 dark:hover:bg-slate-900/10 transition-all"
                                    >
                                        <DollarSign size={18} />
                                        Soutenir le projet
                                    </Link>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="space-y-12 text-slate-700 dark:text-slate-300 leading-8">

                            {/* Author Card */}
                            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-1 border-emerald-200 dark:border-emerald-800 flex-shrink-0 shadow-lg">
                                        <img
                                            src="/author.jpg"
                                            alt="Prince Kouamé"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Prince Kouamé</h3>
                                        <p className="text-emerald-600 dark:text-emerald-400 font-semibold">Software & Product engineering </p>
                                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                                            Initiateur de 225 Open Source
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Vision personnelle */}
                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Quote size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pourquoi j'ai lancé 225 Open Source</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    Je suis parti d'un constat simple : <strong className="text-slate-900 dark:text-white font-semibold">nous, développeurs ivoiriens, sommes invisibles.</strong> Pas parce que nous manquons de talent, mais parce qu'il n'existait aucun espace qui nous rassemble et nous mette en lumière.
                                </p>
                                <p className="text-lg leading-relaxed mb-4">
                                    Sur GitHub, des milliers de projets ivoiriens existent, bien conçus, bien architecturés, certains avec des centaines d'étoiles. Mais ils sont noyés dans un océan de 200 millions de repos mondiaux. Aucun filtre par pays, aucune vitrine locale, aucune communauté visible.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    J'ai créé 225 Open Source parce que je crois profondément que <strong className="text-slate-900 dark:text-white font-extrabold italic">notre génération de développeurs ivoiriens et plus largement de profils tech a le niveau, les idées et la détermination pour rivaliser avec n'importe quel écosystème tech au monde.</strong> Mais pour cela, il faut d'abord exister. Il faut être visible. Il faut être compté.
                                </p>
                            </section>

                            {/* Pour la communauté */}
                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Users size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ce que cela apporte à la tech ivoirienne</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    225 Open Source n'est pas une plateforme de plus. C'est <strong className="text-slate-900 dark:text-white font-semibold">un rassembleur</strong>. Un endroit où chaque prfil tech ivoirien peut dire : "Je fais partie de quelque chose de plus grand que moi."
                                </p>
                                <p className="text-lg leading-relaxed mb-4">
                                    Concrètement, cela signifie : finir avec l'isolement. Un développeur à Korhogo peut découvrir ce qu'un autre construit à Cocody. Un data scientist peut trouver le designer UI/UX dont il a besoin pour son projet. Un junior peut s'inspirer des projets des seniors et apprendre en lisant leur code.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    C'est un <strong className="text-slate-900 dark:text-white font-semibold">écosystème de collaboration</strong> où nous ne sommes plus des talents cachés, mais une communauté unie, fière de ce qu'elle construit et déterminée à le montrer au monde.
                                </p>
                            </section>

                            {/* Pour l'économie numérique */}
                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Zap size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">L'impact sur l'économie numérique ivoirienne</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    L'économie numérique ivoirienne a un potentiel énorme. Mais elle souffre d'un problème de <strong className="text-slate-900 dark:text-white font-semibold">crédibilité et de visibilité internationale</strong>. Quand une entreprise étrangère cherche à externaliser ou recruter, elle ne pense pas spontanément à la Côte d'Ivoire.
                                </p>
                                <p className="text-lg leading-relaxed mb-4">
                                    225 Open Source change cela. En agrégeant les contributions open source ivoiriennes, nous créons <strong className="text-slate-900 dark:text-white font-semibold">une preuve collective de notre excellence technique</strong>. Les recruteurs, les investisseurs, les partenaires internationaux peuvent désormais voir concrètement ce que nous savons faire.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    C'est un cercle vertueux : plus nos talents sont visibles, plus ils attirent d'opportunités économiques. Plus il y a d'opportunités, plus l'écosystème se renforce. Plus l'écosystème se renforce, plus la Côte d'Ivoire devient une destination tech incontournable. <em className="text-slate-900 dark:text-white">Chaque contribution open source est un investissement dans notre économie numérique nationale.</em>
                                </p>
                            </section>

                            {/* Pour les startups */}
                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                        <Rocket size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Un levier pour les startups ivoiriennes</h2>
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    Pour une startup, la crédibilité technique est un avantage concurrentiel décisif. 225 Open Source offre aux startups ivoiriennes une <strong className="text-slate-900 dark:text-white font-semibold">vitrine gratuite et puissante</strong> pour démontrer leur expertise à travers les projets open source qu'elles publient.
                                </p>
                                <p className="text-lg leading-relaxed mb-4">
                                    C'est aussi un <strong className="text-slate-900 dark:text-white font-semibold">terrain de rencontre unique</strong> entre porteurs de projets et talents techniques. Un entrepreneur peut parcourir les profils des développeurs, voir leurs contributions réelles, et trouver le co-fondateur technique idéal. Un investisseur peut évaluer la qualité d'une équipe à travers son code plutôt que des promesses.
                                </p>
                                <p className="text-lg leading-relaxed mb-4">
                                    Il y a aussi un aspect essentiel : <strong className="text-slate-900 dark:text-white font-semibold">ne pas réinventer la roue.</strong> Combien de startups ivoiriennes dépensent des ressources considérables à reconstruire des solutions qui existent déjà ? À travers 225 Open Source, un entrepreneur peut découvrir qu'un module de paiement Mobile Money, une bibliothèque de gestion agricole ou un outil logistique a déjà été développé par un autre Ivoirien.
                                </p>
                                <p className="text-lg leading-relaxed mb-4">
                                    Au lieu de partir de zéro, on part d'une <strong className="text-slate-900 dark:text-white font-semibold">base existante, testée et améliorée par la communauté</strong>. On gagne des mois de développement, on réduit les coûts, et on peut se concentrer sur ce qui rend chaque projet unique. C'est ça, la puissance de l'open source : accélérer la création en s'appuyant sur ce qui a déjà été construit.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Je veux que 225 Open Source devienne <em className="text-slate-900 dark:text-white">la première chose que les investisseurs consultent</em> avant d'investir dans une startup ivoirienne. Parce qu'il n'y a pas de meilleur indicateur de la qualité d'une équipe que le travail qu'elle produit et partage avec le monde.
                                </p>
                            </section>

                            {/* Final statement */}
                            <section className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <Award className="mx-auto mb-4 text-emerald-400" size={40} />
                                    <p className="text-xl text-slate-300 leading-relaxed italic font-serif max-w-2xl mx-auto">
                                        "Les solutions numériques pour répondre aux défis de la Côte d’Ivoire ne viendront pas d’ailleurs. C’est à nous de les inventer. Personne ne connaît mieux que nous les réalités de notre environnement."
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-slate-800">
                                        <p className="text-emerald-400 font-bold">— Prince Kouamé</p>
                                        <p className="text-slate-500 text-sm mt-1">Initiateur de 225 Open Source</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Why225OpenSource;
