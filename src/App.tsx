import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import ToastContainer from './components/ToastContainer';
import ScrollToTop from './components/ScrollToTop';

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
import MaintenancePage from './pages/MaintenancePage';
import Donation from './pages/Donation';
import ResetPassword from './pages/ResetPassword';
import { CONFIG } from './config';

const App: React.FC = () => {
  if (CONFIG.IS_MAINTENANCE_MODE) {
    return (
      <ThemeProvider>
        <MaintenancePage />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/add" element={<AddProject />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit/:slug" element={<EditProject />} />
              <Route path="/project/:slug" element={<ProjectDetails />} />
              <Route path="/why" element={<Why225OpenSource />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donation />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;