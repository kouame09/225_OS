import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      if (_event === 'SIGNED_IN' && session?.user) {
        const currentUser = session.user;
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_approved')
          .eq('id', currentUser.id)
          .single();

        if (profile && !profile.is_approved) {
          await supabase.auth.signOut();
          addNotification('warning', 'Compte en attente', 'Votre compte a été créé mais est en attente d\'approbation par un administrateur.', 8000);
          setSession(null);
          setUser(null);
        } else if (!profile) {
          // First time login (manual signup or OAuth), create a profile
          const { error } = await supabase.from('profiles').insert({
            id: currentUser.id,
            email: currentUser.email,
            is_approved: false,
            created_at: new Date().toISOString()
          });

          await supabase.auth.signOut();
          if (!error) {
            addNotification('success', 'Inscription réussie', 'Votre compte a été créé et est maintenant en attente d\'approbation.', 8000);
          } else {
            addNotification('error', 'Erreur', 'Impossible de créer votre profil. Veuillez contacter le support.');
          }
          setSession(null);
          setUser(null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          addNotification('success', 'Bon retour !', `Heureux de vous revoir !`);
        }
      } else if (_event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [addNotification]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};