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
      setSession(session);
      setUser(session?.user ?? null);

      if (_event === 'SIGNED_IN' && session?.user) {
        try {
          // Check if we need to verify approval
          const currentUser = session.user;
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('is_approved')
            .eq('id', currentUser.id)
            .single();

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error("Profile fetch error:", fetchError);
          }

          if (profile && !profile.is_approved) {
            await supabase.auth.signOut();
            addNotification('warning', 'Compte en attente', 'Votre compte est en attente d\'approbation.', 8000);
            setSession(null);
            setUser(null);
          } else if (!profile) {
            // First time login logic - create profile
            const { error: insertError } = await supabase.from('profiles').insert({
              id: currentUser.id,
              email: currentUser.email,
              is_approved: false,
              created_at: new Date().toISOString()
            });

            if (!insertError) {
              await supabase.auth.signOut();
              addNotification('success', 'Inscription réussie', 'Votre compte est maintenant en attente d\'approbation.', 8000);
              setSession(null);
              setUser(null);
            } else {
              if (insertError.code !== '23505') { // Ignore duplicate key
                console.error("Profile creation error:", insertError);
              }
            }
          }
        } catch (err) {
          console.error("Auth initialization error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        // Handle SIGNED_OUT, INITIAL_SESSION, TOKEN_REFRESHED, etc.
        setLoading(false);
      }
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