import React from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-12 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <Lock className="text-slate-700 dark:text-slate-300" size={24} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-sm text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">1. Information We Collect</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    AfriCode Hub is a public platform. The projects displayed here are aggregated from public GitHub repositories.
                    When you submit a project, we fetch public metadata (repository name, description, stars, forks, language) from the GitHub API.
                    We do not store passwords, private repository data, or personal contact information beyond what is publicly available on your GitHub profile.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">2. Local Storage</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    We use your browser's Local Storage to save your theme preference (Light/Dark mode) and temporary project data for the demo. No tracking cookies or third-party analytics are used for advertising purposes.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">3. External Links</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    Our website contains links to external sites (e.g., GitHub). If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us, and we advise you to review their privacy policies.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">4. Contact Us</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@princekouame.com" className="text-emerald-600 hover:underline">hello@princekouame.com</a>.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;