import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
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

  // Use refs to track initialization state without causing re-renders
  const isInitialized = useRef(false);
  const isMounted = useRef(true);

  // Memoize the notification function to prevent unnecessary effect re-runs
  const showNotification = useCallback((type: 'success' | 'warning' | 'error', title: string, message: string, duration?: number) => {
    addNotification(type, title, message, duration);
  }, [addNotification]);

  useEffect(() => {
    isMounted.current = true;

    // Function to handle profile check logic (same as before)
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
          showNotification('warning', 'Compte en attente', 'Votre compte est en attente d\'approbation.', 8000);
          if (isMounted.current) {
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
            showNotification('success', 'Inscription réussie', 'Votre compte est maintenant en attente d\'approbation.', 8000);
            if (isMounted.current) {
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

    // Initialize session with safety timeout
    const initSession = async () => {
      // Safety timeout to prevent infinite loading if Supabase hangs
      const timeoutId = setTimeout(() => {
        if (isMounted.current && !isInitialized.current) {
          console.warn("Auth initialization timed out, forcing load completion");
          setLoading(false);
          isInitialized.current = true;
        }
      }, 5000); // 5 seconds max wait

      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!isMounted.current) return;

        // Only update if not already handled by listener/timeout
        if (!isInitialized.current) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        clearTimeout(timeoutId);
        if (isMounted.current && !isInitialized.current) {
          isInitialized.current = true;
          setLoading(false);
        }
      }
    };

    // Start initialization
    if (!isInitialized.current) {
      initSession();
    } else {
      setLoading(false);
    }

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted.current) return;

      // Skip INITIAL_SESSION if we're handling it via getSession
      if (_event === 'INITIAL_SESSION') {
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);

      // Ensure loading is complete whenever we get an authoritative update
      if (loading) {
        setLoading(false);
        isInitialized.current = true;
      }

      // Only perform profile checks on explicit SIGNED_IN events
      if (_event === 'SIGNED_IN' && session?.user) {
        await checkUserProfile(session.user);
      }

      // Handle SIGNED_OUT event
      if (_event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      }
    });

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, [showNotification, loading]);

  const signOut = async () => {
    try {
      // Attempt generic sign out with short timeout
      await Promise.race([
        supabase.auth.signOut(),
        new Promise((_, reject) => setTimeout(() => reject('SignOut Timeout'), 1000))
      ]);
    } catch (e) {
      console.warn("Sign out timed out or failed, forcing local cleanup", e);
    } finally {
      // FORCE CLEANUP: Remove Supabase tokens manually to ensure next refresh doesn't auto-login
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
          localStorage.removeItem(key);
        }
      });

      setSession(null);
      setUser(null);
      navigate('/');
    }
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