import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  globalMessage: string | null;
  setGlobalMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);
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
          setGlobalMessage('Your account has been created but is pending approval. Please wait for an administrator to review it.');
          setSession(null);
          setUser(null);
        } else if (!profile) {
          // First time login with OAuth, create a profile
          const { error } = await supabase.from('profiles').insert({ 
            id: currentUser.id, 
            email: currentUser.email,
            is_approved: false
          });
          await supabase.auth.signOut();
          if (!error) {
            setGlobalMessage('Your account has been created and is now pending approval.');
          }
          setSession(null);
          setUser(null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } else if (_event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut, globalMessage, setGlobalMessage }}>
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