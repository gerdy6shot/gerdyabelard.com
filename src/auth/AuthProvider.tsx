import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminProfile, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminProfile = async (currentUser: User) => {
    try {
      if (!isSupabaseConfigured) {
        // Fallback for development preview when Supabase credentials aren't wired up
        const isDemoAdmin = currentUser.email?.endsWith('@gerdyabelard.com') || currentUser.email === 'gerdyabelard@gmail.com';
        if (isDemoAdmin) {
          const fallbackProfile: AdminProfile = {
            id: currentUser.id,
            user_id: currentUser.id,
            email: currentUser.email || 'admin@gerdyabelard.com',
            full_name: 'Gerdy Abelard',
            role: 'super_admin',
            active: true
          };
          setAdminProfile(fallbackProfile);
          setIsAdmin(true);
          return;
        }
      }

      // Query public.admin_profiles table
      const { data, error: fetchErr } = await supabase
        .from('admin_profiles')
        .select('*')
        .or(`user_id.eq.${currentUser.id},email.eq.${currentUser.email}`)
        .maybeSingle();

      if (fetchErr) {
        console.warn('Error fetching admin_profile:', fetchErr.message);
        // Check if user has admin email as backup authorization check
        if (currentUser.email === 'gerdyabelard@gmail.com' || currentUser.email?.endsWith('@gerdyabelard.com')) {
          setAdminProfile({
            id: currentUser.id,
            user_id: currentUser.id,
            email: currentUser.email || 'admin@gerdyabelard.com',
            full_name: 'Gerdy Abelard',
            role: 'super_admin',
            active: true
          });
          setIsAdmin(true);
          return;
        }
        setIsAdmin(false);
        setAdminProfile(null);
        return;
      }

      if (data && data.active && (data.role === 'admin' || data.role === 'super_admin')) {
        setAdminProfile(data as AdminProfile);
        setIsAdmin(true);
      } else {
        setAdminProfile(null);
        setIsAdmin(false);
      }
    } catch (err: any) {
      console.error('Failed to verify admin status:', err);
      setIsAdmin(false);
      setAdminProfile(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Check active session on mount
    const initAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user || null);
          if (initialSession?.user) {
            await fetchAdminProfile(initialSession.user);
          } else {
            setIsAdmin(false);
            setAdminProfile(null);
          }
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return;

      setSession(currentSession);
      setUser(currentSession?.user || null);

      if (currentSession?.user) {
        setIsLoading(true);
        await fetchAdminProfile(currentSession.user);
        setIsLoading(false);
      } else {
        setAdminProfile(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return { error: authError };
      }

      if (data.user) {
        await fetchAdminProfile(data.user);
      }

      return { error: null };
    } catch (err: any) {
      const authErr = new Error(err.message || 'An unexpected error occurred during authentication');
      setError(authErr.message);
      return { error: authErr };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setAdminProfile(null);
    setIsAdmin(false);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchAdminProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        adminProfile,
        isLoading,
        isAdmin,
        error,
        signInWithPassword,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
