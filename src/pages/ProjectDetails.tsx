import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ArrowLeft,
  Github,
  Star,
  GitFork,
  Calendar,
  Code,
  Share2,
  Check,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { getProjectBySlug } from '../services/projectService';
import { Project } from '../types';
import Badge from '../components/Badge';

const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (slug) {
        try {
          const foundProject = await getProjectBySlug(slug);
          if (foundProject) {
            setProject(foundProject);
          } else {
            navigate('/');
          }
        } catch (e) {
          navigate('/');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProject();
  }, [slug, navigate]);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (!project) return;

    const shareData = {
      title: `${project.name} sur 225 Open Source`,
      text: `Découvrez ${project.name} par ${project.author}. ${project.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="animate-spin text-emerald-500" /></div>;
  if (!project) return null;

  return (
    <div className="min-h-screen pb-20 bg-slate-50 dark:bg-slate-950">

      {/* Minimalist Back Button - Top Left - Only for authenticated users */}
      {user && (
        <button
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 z-30 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm"
          aria-label="Retour aux projets"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      {/* Page Background Ambience (Blurred) */}
      <div className="h-96 w-full bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
        <div className="absolute inset-0 opacity-30">
          {project.imageUrl && (
            <img src={project.imageUrl} className="w-full h-full object-cover blur-2xl scale-110" alt="" />
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-64 relative z-20">

        {/* Unified Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">

          {/* 1. Hero Banner Image */}
          <div className="w-full h-64 sm:h-96 bg-slate-100 dark:bg-slate-800 relative group">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-700 dark:text-slate-600 font-bold text-7xl opacity-20 select-none">
                {project.name.substring(0, 2)}
              </div>
            )}
            {/* Gradient Overlay for visual depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
          </div>

          <div className="p-6 sm:p-10 flex flex-col gap-8">

            {/* 2. Header Info */}
            <div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    {project.name}
                  </h1>
                  <div className="flex items-center gap-2 text-lg text-slate-500 dark:text-slate-400 font-medium">
                    <span>par <span className="text-slate-900 dark:text-slate-200 font-semibold">{project.author}</span></span>
                  </div>
                </div>

                {/* Stats Badges */}
                <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-800/50">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{project.stars}</span> <span className="hidden sm:inline">étoiles</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    <GitFork size={16} />
                    <span className="font-bold">{project.forks}</span> <span className="hidden sm:inline">forks</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    <Code size={16} />
                    <span className="font-medium">{project.language}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

            {/* 3. Description (About) */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">À propos de ce projet</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* 4. Stacks */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Technologies utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {project.stacks.map(stack => (
                  <Badge key={stack} text={stack} />
                ))}
              </div>
            </div>

            {/* 5. Actions */}
            <div className="mt-2 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-xl font-semibold transition-all shadow-md group"
                >
                  <Github size={20} />
                  <span>Voir sur GitHub</span>
                  <ExternalLink size={16} className="opacity-50 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-all"
                >
                  {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
                  <span>{copied ? 'Lien copié' : 'Partager le projet'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-slate-400 text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>Dernière mise à jour le : {formatDate(project.updatedAt)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA for unauthenticated users (Bottom) */}
        {!user && (
          <div className="mt-12 p-8 bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-xl text-white flex flex-col items-center text-center gap-6 relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-bold mb-3">Vous aimez ce projet ?</h3>
              <p className="text-slate-300 text-lg mb-2">
                Rejoignez 225 Open Source pour découvrir plus de projets, contribuer aux projets locaux et partager votre propre travail.
              </p>
            </div>
            <Link
              to="/"
              className="relative z-10 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Créer un compte gratuit
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectDetails;