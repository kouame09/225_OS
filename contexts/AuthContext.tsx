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
    let isMounted = true;
    let initialSessionLoaded = false;

    // Function to handle profile check logic
    const checkUserProfile = async (currentUser: User) => {
      try {
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
          if (isMounted) {
            setSession(null);
            setUser(null);
          }
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
            if (isMounted) {
              setSession(null);
              setUser(null);
            }
          } else if (insertError.code !== '23505') {
            console.error("Profile creation error:", insertError);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      }
    };

    // Get the initial session on component mount
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!isMounted) return;

        initialSessionLoaded = true;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error("Error getting session:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initSession();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;

      // Skip INITIAL_SESSION if we already loaded it
      if (_event === 'INITIAL_SESSION' && initialSessionLoaded) {
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);

      // Only perform profile checks on explicit SIGNED_IN events
      if (_event === 'SIGNED_IN' && session?.user) {
        await checkUserProfile(session.user);
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
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