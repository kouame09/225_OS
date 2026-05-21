import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isProjectPage = location.pathname.startsWith('/project/');
  const isProductPage = location.pathname.startsWith('/launchpad/p/');
  const isPitchPage = location.pathname.startsWith('/pitchhub/p/');
  const isArticlePage = location.pathname.startsWith('/articles/');
  
  // Hide Nav/Footer if:
  // 1. It's a classic project page
  // 2. OR it's a product/pitch/article page AND the user is NOT logged in
  const hideNav = isProjectPage || ((isProductPage || isPitchPage || isArticlePage) && !user);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans">
      {!hideNav && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideNav && <Footer />}
    </div>
  );
};

export default Layout;