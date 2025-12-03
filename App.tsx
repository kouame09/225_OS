import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import ToastContainer from './components/ToastContainer';

// Pages
import Home from './pages/Home';
import AddProject from './pages/AddProject';
import ProjectDetails from './pages/ProjectDetails';
import Explore from './pages/Explore';
import WhyAfriCodeHub from './pages/WhyAfriCodeHub';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import EditProject from './pages/EditProject';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/add" element={<AddProject />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit/:slug" element={<EditProject />} />
              <Route path="/project/:slug" element={<ProjectDetails />} />
              <Route path="/why" element={<WhyAfriCodeHub />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
          <ToastContainer />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;