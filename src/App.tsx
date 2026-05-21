import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import ToastContainer from './components/ToastContainer';
import ScrollToTop from './components/ScrollToTop';
import MaintenancePage from './pages/MaintenancePage';
import { getAllSiteSettings } from './services/siteSettingsService';

// Pages
import Home from './pages/Home';
import AddProject from './pages/AddProject';
import ProjectDetails from './pages/ProjectDetails';
import Explore from './pages/Explore';
import Why225OpenSource from './pages/Why225OpenSource';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import EditProject from './pages/EditProject';
import Donation from './pages/Donation';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';

import Launchpad from './pages/Launchpad';
import SubmitProduct from './pages/SubmitProduct';
import ProductPage from './pages/ProductPage';
import PitchHub from './pages/PitchHub';
import SubmitPitch from './pages/SubmitPitch';
import PitchDetails from './pages/PitchDetails';
import EditProfile from './pages/EditProfile';
import AdminAnnouncements from './pages/AdminAnnouncements';
import OpenSourceDay from './pages/OpenSourceDay';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';
import MyArticles from './pages/MyArticles';

const ADMIN_EMAIL = 'princekouame7@gmail.com';

const AppContent: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [maintenanceMode, setMaintenanceMode] = useState<boolean | null>(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getAllSiteSettings();
      setMaintenanceMode(settings['maintenance_mode'] ?? false);
    };
    loadSettings();

    const interval = setInterval(loadSettings, 30000);
    return () => clearInterval(interval);
  }, []);

  if (maintenanceMode === null || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const isDev = import.meta.env.DEV;

  if (maintenanceMode && !isDev && !isAdmin) {
    return <MaintenancePage />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />

          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/launchpad/submit" element={<SubmitProduct />} />
          <Route path="/launchpad/edit/:slug" element={<SubmitProduct />} />
          <Route path="/launchpad/p/:slug" element={<ProductPage />} />

          <Route path="/pitchhub" element={<PitchHub />} />
          <Route path="/pitchhub/submit" element={<SubmitPitch />} />
          <Route path="/pitchhub/edit/:slug" element={<SubmitPitch />} />
          <Route path="/pitchhub/p/:slug" element={<PitchDetails />} />
          
          <Route path="/add" element={<AddProject />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit/:slug" element={<EditProject />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="/why" element={<Why225OpenSource />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/opensource-day" element={<OpenSourceDay />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route path="/my-articles" element={<MyArticles />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;