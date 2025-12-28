import React from 'react';

interface BadgeProps {
  text: string;
  onClick?: () => void;
  active?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ text, onClick, active = false }) => {
  return (
    <span 
      onClick={onClick}
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer border
        ${active 
          ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white' 
          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}
      `}
    >
      {text}
    </span>
  );
};

export default Badge;