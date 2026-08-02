import React from 'react';
import { motion } from 'motion/react';
import { PageTitle } from '../../components/PageTitle';
import { GlassPanel } from '../../components/GlassPanel';
import { Settings, Shield, Key, Database, RefreshCw } from 'lucide-react';
import { useAuth } from '../../auth/useAuth';

export const AdminSettings: React.FC = () => {
  const { user, adminProfile } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#22222c]">
        <PageTitle
          eyebrow="STUDIO OS // SETTINGS"
          title="SYSTEM SETTINGS"
          subtitle="Studio configuration..."
        />
        <div className="px-3 py-1.5 bg-[#121216] border border-[#22222c] text-[10px] font-mono text-[#c5a059] uppercase">
          SUPER ADMIN ENCRYPTED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassPanel className="p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>SUPER ADMIN IDENTITY</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-[#8a8a8a] text-[10px] uppercase">Authenticated Account</label>
              <div className="p-3 bg-[#0a0a0d] border border-[#22222c] text-[#f4f3ef]">
                {user?.email || 'gerdyabelard@gmail.com'}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#8a8a8a] text-[10px] uppercase">Role Privileges</label>
              <div className="p-3 bg-[#0a0a0d] border border-[#22222c] text-[#c5a059]">
                {adminProfile?.role === 'super_admin' ? 'SUPER ADMIN // FULL SYSTEM ACCESS' : 'STUDIO OPERATOR'}
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-widest">
              <Database className="w-4 h-4" />
              <span>SUPABASE INFRASTRUCTURE</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 bg-[#0a0a0d] border border-[#22222c] space-y-2">
              <div className="flex items-center justify-between text-[#4ade80]">
                <span>RLS POLICIES</span>
                <span>ACTIVE</span>
              </div>
              <p className="text-[10px] text-[#8a8a8a] leading-relaxed">
                Row Level Security strictly isolates admin data. Public users can submit bookings; only verified admins read full rosters.
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </motion.div>
  );
};
