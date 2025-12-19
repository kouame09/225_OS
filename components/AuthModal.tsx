import React, { useState } from 'react';
import { X, Mail, Lock, Github, ArrowRight, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup' | 'forgot';
}

type AuthView = 'login' | 'signup' | 'forgot';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState<AuthView>(initialView);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setError(null);
    setSuccessMessage(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const switchView = (newView: AuthView) => {
    resetForm();
    setView(newView);
  };

  const getAuthErrorMessage = (error: any): string => {
    // Handle specific Supabase error messages
    if (error?.message) {
      const message = error.message.toLowerCase();
      
      // Email/Password errors
      if (message.includes('invalid login credentials')) {
        return 'Invalid email or password';
      }
      if (message.includes('invalid email')) {
        return 'Invalid email address';
      }
      if (message.includes('email not confirmed')) {
        return 'Please confirm your email address before signing in';
      }
      if (message.includes('weak password')) {
        return 'Password must be at least 6 characters long';
      }
      if (message.includes('user already registered')) {
        return 'An account already exists with this email address';
      }
      if (message.includes('signup disabled')) {
        return 'Sign up is temporarily disabled';
      }
      
      // Network/Server errors
      if (message.includes('network') || message.includes('fetch')) {
        return 'Connection problem. Check your internet and try again';
      }
      if (message.includes('timeout')) {
        return 'Server is taking too long to respond. Please try again in a moment';
      }
      if (message.includes('too many requests')) {
        return 'Too many attempts. Please wait a few minutes before trying again';
      }
    }
    
    // Handle specific view errors
    if (view === 'signup' && error?.message?.includes('password')) {
      return 'Passwords do not match';
    }
    
    // Default fallback messages
    switch (view) {
      case 'login':
        return 'Sign in failed. Please check your credentials';
      case 'signup':
        return 'Account creation failed. Please check your information';
      case 'forgot':
        return 'Failed to send reset link';
      default:
        return 'An error occurred. Please try again';
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (view === 'login') {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;

        // Check for manual approval
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_approved')
          .eq('id', signInData.user.id)
          .single();

        if (profileError || !profile || !profile.is_approved) {
          await supabase.auth.signOut();
          throw new Error('Your account has not been approved yet. Please wait for an administrator to validate your profile.');
        }

        onClose();
      } else if (view === 'signup') {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;

        // Create a profile for new user
        if (signUpData.user) {
          const { error: profileError } = await supabase.from('profiles').insert({ 
            id: signUpData.user.id, 
            email: signUpData.user.email,
            is_approved: false,
            created_at: new Date().toISOString()
          });
          if (profileError) throw profileError;
        }

        setSuccessMessage('Account created! Please wait for an administrator to approve your account.');
      } else if (view === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setSuccessMessage('Password reset link sent to your email.');
      }
    } catch (err: any) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw error;
    } catch (err: any) {
      setError(getAuthErrorMessage(err));
    }
  };

  // Helper for title text
  const getTitle = () => {
    switch (view) {
      case 'login': return 'Welcome back';
      case 'signup': return 'Join the community';
      case 'forgot': return 'Reset Password';
    }
  };

  const getDescription = () => {
    switch (view) {
      case 'login': return 'Enter your details to access your account';
      case 'signup': return 'Connect with African tech professionals today';
      case 'forgot': return 'Enter your email to receive reset instructions';
    }
  };

  return (
    <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Scrollable Container */}
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

          {/* Modal Panel */}
          <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-xl transition-all sm:my-8 w-full max-w-md ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-200">

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {getTitle()}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {getDescription()}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle size={16} className="shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleAuth}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    />
                  </div>
                </div>

                {view !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                      {view === 'login' && (
                        <button
                          type="button"
                          onClick={() => switchView('forgot')}
                          className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                {view === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      {view === 'login' && 'Sign In'}
                      {view === 'signup' && 'Create Account'}
                      {view === 'forgot' && 'Send Reset Link'}
                      {view !== 'forgot' && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </>
                  )}
                </button>
              </form>

              {view === 'forgot' ? (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => switchView('login')}
                    className="flex items-center justify-center gap-2 w-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-sm font-medium"
                  >
                    <ArrowLeft size={16} />
                    Back to Login
                  </button>
                </div>
              ) : (
                <>
                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
                    <span className="text-xs text-slate-400 font-medium uppercase">Or continue with</span>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGithubLogin}
                    disabled={loading}
                    className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Github size={20} />
                    <span>GitHub</span>
                  </button>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                      onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
                      className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      {view === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;