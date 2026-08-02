import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { safeRedirect } from '../utils/safeRedirect';
import { useAuth } from '../auth/useAuth';
import { Shield, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { signInWithPassword, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Validate redirect target to prevent open-redirect/XSS attack vectors
  const from = safeRedirect((location.state as any)?.from?.pathname, '/admin');

  // If already logged in as admin, redirect to admin dashboard
  React.useEffect(() => {
    if (user && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setLocalError(null);
    setIsSubmitting(true);

    const { error } = await signInWithPassword(email, password);

    setIsSubmitting(false);

    if (error) {
      setLocalError(error.message || 'Invalid login credentials. Please verify email and password.');
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] flex flex-col justify-between selection:bg-[#c5a059] selection:text-[#08080a] relative overflow-hidden">
      
      {/* Background Atmosphere & Subtle Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c5a059]/20 via-transparent to-transparent" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#22222c_1px,transparent_1px),linear-gradient(to_bottom,#22222c_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top Header branding */}
      <header className="relative z-10 p-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="font-serif-display text-xl tracking-[0.2em] text-[#f4f3ef] uppercase group-hover:text-[#c5a059] transition-colors">
            GERDY ABELARD
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase px-2 py-0.5 border border-[#c5a059]/30 bg-[#c5a059]/10">
            STUDIO OS
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-mono uppercase tracking-[0.2em] text-[#a1a1aa] hover:text-[#f4f3ef] transition-colors"
        >
          &larr; Public Site
        </Link>
      </header>

      {/* Central Login Card */}
      <main className="relative z-10 my-auto px-6 py-12 max-w-md w-full mx-auto">
        <div className="bg-[#101014]/90 border border-[#22222c] p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
          
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#15151a] border border-[#22222c] flex items-center justify-center text-[#c5a059]">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-serif-display text-3xl text-[#f4f3ef] uppercase tracking-[0.12em]">
              PRIVATE STUDIO ACCESS
            </h1>
            <p className="text-xs font-mono tracking-[0.25em] text-[#a1a1aa] uppercase">
              Gerdy Abelard Studio Command
            </p>
          </div>

          {localError && (
            <div className="p-4 bg-[#201010] border border-[#441a1a] text-red-300 text-xs leading-relaxed space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-red-400 block font-semibold">
                Authentication Failure
              </span>
              <p>{localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#a1a1aa]">
                Studio Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gerdyabelard.com"
                  required
                  className="w-full bg-[#08080a] border border-[#22222c] focus:border-[#c5a059] px-4 py-3.5 text-sm text-[#f4f3ef] placeholder-[#444452] outline-none transition-colors pl-11"
                />
                <Mail className="w-4 h-4 text-[#a1a1aa] absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#a1a1aa]">
                  Secret Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#08080a] border border-[#22222c] focus:border-[#c5a059] px-4 py-3.5 text-sm text-[#f4f3ef] placeholder-[#444452] outline-none transition-colors pl-11"
                />
                <Lock className="w-4 h-4 text-[#a1a1aa] absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#f4f3ef] text-[#08080a] font-sans-ui text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#c5a059] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-[#08080a] border-t-transparent animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Enter Studio OS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Footnote */}
          <div className="pt-6 border-t border-[#22222c] text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Protected by Supabase Auth & RLS</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-8 text-center text-xs font-mono text-[#444452] uppercase tracking-widest">
        &copy; {new Date().getFullYear()} GERDY ABELARD • ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};
