import React from 'react';
import { Navigate, useLocation, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ShieldAlert } from 'lucide-react';

interface AdminProtectedRouteProps {
  children?: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, isLoading, adminProfile } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] flex flex-col items-center justify-center p-6 space-y-6 selection:bg-[#c5a059] selection:text-[#08080a]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border border-[#22222c] border-t-[#c5a059] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-[#c5a059] animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="font-serif-display text-xl tracking-[0.15em] text-[#f4f3ef] uppercase">
            GERDY ABELARD
          </p>
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">
            Verifying Studio Credentials & Auth State...
          </p>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Signed in but not an active admin / super_admin
  if (!isAdmin || (adminProfile && !adminProfile.active)) {
    return (
      <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full p-8 bg-[#101014] border border-[#331c1c] space-y-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#221010] flex items-center justify-center text-[#ef4444]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-[0.1em]">
              Access Restricted
            </h2>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Your account <code className="text-[#c5a059]">{user.email}</code> is authenticated but lacks active administrative authorization for the GERDY ABELARD Studio OS.
            </p>
          </div>
          <div className="pt-4 border-t border-[#22222c] flex items-center justify-between text-xs font-mono text-[#a1a1aa]">
            <span>Required Role: admin</span>
            <Link to="/admin/login" className="text-[#c5a059] hover:underline uppercase tracking-wider">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
};
