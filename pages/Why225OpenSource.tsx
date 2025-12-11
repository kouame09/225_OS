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
                        <ArrowLeft size={16} /> Back to Home
                    </Link>

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                            Why <span className="text-transparent bg-clip-text bg-emerald-600">225 Open Source?</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                            Beyond solving GitHub's filtering problem, we're building something bigger: a movement to put Ivorian tech on the global map.
                        </p>
                    </div>

                    <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-8">
                        <section>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                    <Lightbulb size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Vision: From Invisible to Inevitable</h2>
                            </div>
                            <p className="text-lg leading-relaxed mb-4">
                                Right now, when people think of tech innovation, they think Silicon Valley, Tel Aviv, Bangalore, or Shenzhen. <strong className="text-slate-900 dark:text-white font-semibold">Abidjan is not on that list. Yet.</strong>
                            </p>
                            <p className="text-lg leading-relaxed">
                                225 Open Source is our answer to this invisibility. We're creating a centralized showcase of Ivorian innovation that proves our tech professionals aren't just consuming technology, we're creating it. Every project added is a statement: <em className="text-slate-900 dark:text-white">"We build. We innovate. We matter."</em>
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                                    <TrendingUp size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Economic Impact: Building Careers, Not Just Code</h2>
                            </div>
                            <p className="text-lg leading-relaxed mb-4">
                                In Côte d'Ivoire, talented developers struggle to prove their skills to international companies. A PDF resume means nothing when competing globally. But a <strong className="text-slate-900 dark:text-white font-semibold">public portfolio of real contributions?</strong> That's undeniable proof.
                            </p>
                            <p className="text-lg leading-relaxed">
                                By centralizing Ivorian projects, we're creating a talent discovery engine. International companies looking for African developers can find us. Local companies can identify hidden gems. Junior developers can learn from senior ones. This isn't just about code, it's about <strong className="text-slate-900 dark:text-white font-semibold">economic opportunity</strong>.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
                                    <Shield size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Digital Sovereignty: Owning Our Future</h2>
                            </div>
                            <p className="text-lg leading-relaxed mb-4">
                                Every dollar spent on foreign SaaS is a dollar that leaves our economy. Every dependency on proprietary software is a vulnerability. <strong className="text-slate-900 dark:text-white font-semibold">Open source is our path to digital independence.</strong>
                            </p>
                            <p className="text-lg leading-relaxed">
                                When we build payment systems that understand Mobile Money, when we create agricultural tools that work offline, when we develop solutions for our specific challenges, we're not just solving problems. We're building infrastructure that <em className="text-slate-900 dark:text-white">belongs to us</em>, that we control, that we can modify and improve forever.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400">
                                    <Users size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Community: Ending the Isolation</h2>
                            </div>
                            <p className="text-lg leading-relaxed mb-4">
                                Too many Ivorian developers work in silos. A brilliant engineer in Bouaké doesn't know about the amazing project being built in Abidjan. A startup in Yopougon reinvents the wheel because they don't know someone already solved that problem.
                            </p>
                            <p className="text-lg leading-relaxed">
                                225 Open Source breaks down these walls. We're creating a <strong className="text-slate-900 dark:text-white font-semibold">unified ecosystem</strong> where collaboration replaces isolation, where knowledge flows freely, where we lift each other up instead of competing in the dark.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-2xl text-pink-600 dark:text-pink-400">
                                    <Globe size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">A Blueprint for Africa</h2>
                            </div>
                            <p className="text-lg leading-relaxed mb-4">
                                What we're building in Côte d'Ivoire isn't just for us. It's a <strong className="text-slate-900 dark:text-white font-semibold">model that any African country can replicate</strong>. Imagine "Ghana Open Source," "Senegal Open Source," "Kenya Open Source", each country showcasing its innovation, each ecosystem strengthening the others.
                            </p>
                            <p className="text-lg leading-relaxed">
                                Together, we can shift the global perception of African tech from "emerging market" to "innovation powerhouse." But it starts with one country leading the way. <em className="text-slate-900 dark:text-white">That country is Côte d'Ivoire.</em>
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 p-8 sm:p-10 rounded-3xl border border-emerald-200 dark:border-emerald-800 mt-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Heart className="text-red-500 fill-current animate-pulse" size={24} />
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
                                </div>
                                <p className="italic text-xl text-slate-700 dark:text-slate-300 font-serif mb-6">
                                    "To make Côte d'Ivoire a recognized hub of open-source innovation, proving that African developers are not just participants in the global tech ecosystem, we are leaders, creators, and pioneers."
                                </p>
                                <div className="pt-6 border-t border-emerald-200 dark:border-emerald-800">
                                    <p className="text-lg text-slate-600 dark:text-slate-400">
                                        This is bigger than a platform. It's a movement. And every project you add, every contribution you make, every collaboration you start, <strong className="text-slate-900 dark:text-white">you're part of writing history</strong>.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="text-center bg-slate-900 dark:bg-white p-10 rounded-3xl">
                            <Code className="mx-auto mb-4 text-white dark:text-slate-900" size={48} />
                            <h3 className="text-2xl font-bold text-white dark:text-slate-900 mb-4">Ready to Make History?</h3>
                            <p className="text-slate-300 dark:text-slate-600 mb-6 max-w-xl mx-auto">
                                Don't let your project be another hidden gem. Share it with the Ivorian tech community and help put Côte d'Ivoire on the global tech map.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/#hero"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all"
                                >
                                    Get Started
                                </Link>
                                <a
                                    href="https://www.buymeacoffee.com/princekouame"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white dark:border-slate-900 text-white dark:text-slate-900 rounded-xl hover:bg-white/10 dark:hover:bg-slate-900/10 transition-all"
                                >
                                    <DollarSign size={18} />
                                    Support the Project
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Why225OpenSource;