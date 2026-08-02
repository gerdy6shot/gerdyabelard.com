import { User, Session } from '@supabase/supabase-js';

export interface AdminProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string | null;
  role: 'admin' | 'super_admin';
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  adminProfile: AdminProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
