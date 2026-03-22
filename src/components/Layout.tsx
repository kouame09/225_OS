import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/project/');
  const isProductPage = location.pathname.startsWith('/launchpad/p/');
  const hideNav = isProjectPage || isProductPage;

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