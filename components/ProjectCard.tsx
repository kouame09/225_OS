import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Star, GitFork, ExternalLink, Github } from 'lucide-react';
import Badge from './Badge';

interface ProjectCardProps {
  project: Project;
  onTagClick?: (tag: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onTagClick }) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">

      {/* Card Header / Image Area - Link to Details */}
      <Link to={`/project/${project.slug}`} className="block h-48 bg-slate-50 dark:bg-slate-800 overflow-hidden relative border-b border-slate-100 dark:border-slate-800 cursor-pointer">
        {project.imageUrl ? (
          <div className="w-full h-full p-3 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            <span className="text-4xl font-bold text-slate-300 dark:text-slate-700 uppercase">
              {project.name.substring(0, 2)}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="flex items-center gap-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-amber-500 shadow-sm border border-slate-200 dark:border-slate-700">
            <Star size={12} fill="currentColor" />
            <span>{project.stars}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700">
            <GitFork size={12} />
            <span>{project.forks}</span>
          </div>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Link to={`/project/${project.slug}`}>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {project.name}
              </h3>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              by {project.author}
            </p>
          </div>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="View on GitHub"
          >
            <Github size={20} />
          </a>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stacks.slice(0, 3).map((stack) => (
              <Badge key={stack} text={stack} onClick={() => onTagClick && onTagClick(stack)} />
            ))}
            {project.stacks.length > 3 && (
              <span className="text-xs text-slate-400 py-0.5">+{project.stacks.length - 3}</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>Updated {formatDate(project.updatedAt)}</span>
            <Link
              to={`/project/${project.slug}`}
              className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;