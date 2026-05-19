import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Target, Lightbulb, HandHeart, ArrowRight, Sparkles, Globe, Building2, Code2, Trophy, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getSiteSetting } from '../services/siteSettingsService';

const OpenSourceDay: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await getSiteSetting('show_opensource_day');
      if (!visible) {
        navigate('/', { replace: true });
      } else {
        setIsVisible(true);
      }
    };
    checkVisibility();
  }, [navigate]);

  if (isVisible === null) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="animate-spin text-slate-400 w-8 h-8" /></div>;
  }

  if (!isVisible) return null;

  const targetAudiences = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Professionnels de la Tech",
      description: "Développeurs, ingénieurs, data scientists et experts en cybersécurité"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Passionnés d'Open Source",
      description: "Contributeurs, mainteneurs et enthousiastes du logiciel libre"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Chefs d'Entreprise",
      description: "Dirigeants orientés innovation et transformation digitale"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Grand Public",
      description: "Tous ceux qui veulent comprendre l'open source et son importance"
    }
  ];

  const objectives = [
    {
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      title: "Identifier les Défis",
      description: "Comprendre et analyser les obstacles spécifiques à l'adoption de l'open source en Côte d'Ivoire et en Afrique de l'Ouest."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-emerald-500" />,
      title: "Valoriser les Avantages",
      description: "Démontrer comment l'open source favorise l'innovation, réduit les coûts et renforce la souveraineté numérique."
    },
    {
      icon: <Trophy className="w-8 h-8 text-emerald-500" />,
      title: "Stratégie Nationale",
      description: "Montrer le caractère stratégique de l'open source dans le développement technologique du pays et de la région."
    },
    {
      icon: <HandHeart className="w-8 h-8 text-emerald-500" />,
      title: "Mobiliser les Décideurs",
      description: "Convaincre les investisseurs, décideurs politiques et administrations d'accompagner et financer l'open source local."
    }
  ];

  const stats = [
    { value: "500+", label: "Participants attendus" },
    { value: "20+", label: "Experts intervenants" },
    { value: "3", label: "Jours d'échanges" },
    { value: "1", label: "Vision commune" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen opacity-60" />
        <div className="absolute top-20 right-0 w-[600px] h-[400px] bg-steel-500/10 dark:bg-steel-500/20 rounded-full blur-[100px] -z-10 opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge Événement */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold uppercase tracking-wider mb-8">
            Événement Annuel
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Open Source Day
            <span className="block text-emerald-600 dark:text-emerald-400">2026</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mb-8 leading-relaxed">
            Le rendez-vous incontournable de l'open source en Côte d'Ivoire. 
            Un moment d'échanges, de partages et de réflexion sur l'avenir technologique de notre pays.
          </p>

          {/* Event Info */}
          <div className="flex flex-wrap gap-6 mb-12">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Dates à venir - 2026</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Abidjan, Côte d'Ivoire</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Users className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">500+ participants attendus</span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25"
          >
            S'inscrire à l'Open Source Day 2026
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                Qu'est-ce que <br />l'<span className="text-emerald-600 dark:text-emerald-400">Open Source Day</span> ?
              </h2>
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  L'Open Source Day est l'événement annuel phare de la communauté 225 Open Source. 
                  C'est un moment privilégié où professionnels, passionnés, entreprises et grand public 
                  se réunissent pour célébrer et promouvoir l'open source en Côte d'Ivoire.
                </p>
                <p>
                  Cet événement vise à sensibiliser sur l'importance stratégique de l'open source dans 
                  le développement technologique de notre pays. Aujourd'hui, nos gouvernements et administrations 
                  utilisent majoritairement des produits étrangers qui pourraient être créés ici, localement.
                </p>
                <p>
                  L'Open Source Day est l'occasion de montrer que nous avons les talents, les compétences 
                  et la créativité nécessaires pour construire des solutions technologiques souveraines.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-slate-200 dark:border-slate-800 relative">
                <img 
                  src="/Brand/os_day.webp" 
                  alt="OpeS'inscrire à l'Open Source Day 2026" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-600/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-3">
                      Édition 2026
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                      L'Avenir est <br />
                      <span className="text-emerald-400 text-shadow-glow">Open Source</span>
                    </h3>
                    <p className="text-emerald-50/80 text-sm font-medium max-w-[240px]">
                      Rejoignez le mouvement pour une souveraineté numérique locale.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-steel-500/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Qui peut participer ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              L'Open Source Day s'adresse à tous ceux qui croient en l'avenir technologique de la Côte d'Ivoire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((audience, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  {audience.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {audience.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Nos Objectifs
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Des ambitions claires pour impulser l'open source en Côte d'Ivoire
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                  {objective.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {objective.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message to Decision Makers */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 md:p-14 lg:p-20 text-center shadow-2xl relative overflow-hidden border border-slate-800 max-w-5xl mx-auto">
            {/* Grainy texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-6">
                Prêt à soutenir l'Open Source local ?
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto">
                Rejoignez le mouvement, investissez dans nos talents et construisons ensemble 
                une souveraineté technologique durable pour notre pays.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  S'inscrire à l'Open Source Day 2026
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Des questions sur l'événement ?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Contactez l'équipe organisatrice de l'Open Source Day
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors"
          >
            Nous contacter
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OpenSourceDay;
