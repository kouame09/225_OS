import React, { useEffect } from 'react';
import { Terminal, Heart, Globe, Shield, ArrowLeft, Lightbulb, TrendingUp, Users, Code, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const Why225OpenSource: React.FC = () => {
    const [isAuthOpen, setIsAuthOpen] = React.useState(false);

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
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 text-sm font-medium">
                        <ArrowLeft size={16} /> Retour à l'accueil
                    </Link>

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                            Pourquoi <span className="text-transparent bg-clip-text bg-emerald-600">225 Open Source ?</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                            Au-delà de la résolution du problème de filtrage de GitHub, nous construisons quelque chose de plus grand : un mouvement pour mettre la tech ivoirienne sur la carte mondiale.
                        </p>
                    </div>

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
                            <p className="text-lg leading-relaxed">
                                En centralisant les projets ivoiriens, nous créons un moteur de découverte de talents. Les entreprises internationales à la recherche de développeurs africains peuvent nous trouver. Les entreprises locales peuvent identifier des pépites cachées. Les développeurs juniors peuvent apprendre des seniors. Il ne s'agit pas seulement de code, mais d'une <strong className="text-slate-900 dark:text-white font-semibold">opportunité économique</strong>.
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

                        <section className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 p-8 sm:p-10 rounded-3xl border border-emerald-200 dark:border-emerald-800 mt-12 relative overflow-hidden">
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
                </div>
            </div>
        </>
    );
};

export default Why225OpenSource;