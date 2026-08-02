import React from 'react';
import { Radio, Shield, Clock, Terminal } from 'lucide-react';
import { useAuth } from '../../auth/useAuth';

interface DashboardHeaderProps {
  lastSyncedAt?: Date | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastSyncedAt }) => {
  const { user, adminProfile } = useAuth();
  const userName = adminProfile?.full_name || 'GERDY ABELARD';
  const roleLabel = adminProfile?.role === 'super_admin' ? 'SUPER ADMIN // OWNER' : 'STUDIO OPERATOR';

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#22222c]">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase px-2.5 py-1 bg-[#c5a059]/10 border border-[#c5a059]/20">
            STUDIO OS v8.3 • COMMAND CENTER
          </span>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#8a8a8a] uppercase">
            <Radio className="w-3 h-3 text-[#c5a059] animate-pulse" />
            <span>DIRECTOR ONLINE</span>
          </div>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-5xl text-[#f4f3ef] uppercase tracking-[0.1em]">
          {userName}
        </h1>

        <p className="text-xs font-mono text-[#8a8a8a] tracking-wider uppercase max-w-2xl leading-relaxed">
          Operational control room for COMVIEWMEDIA, film production, commercial photography, and brand strategic direction.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="p-3 bg-[#111116] border border-[#22222c] space-y-1 min-w-[160px]">
          <div className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-widest flex items-center justify-between">
            <span>Identity</span>
            <Shield className="w-3 h-3 text-[#c5a059]" />
          </div>
          <div className="text-xs font-mono text-[#f4f3ef] uppercase truncate">{user?.email}</div>
          <div className="text-[9px] font-mono text-[#c5a059] uppercase tracking-wider">{roleLabel}</div>
        </div>

        <div className="p-3 bg-[#111116] border border-[#22222c] space-y-1 min-w-[160px]">
          <div className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-widest flex items-center justify-between">
            <span>Data Sync</span>
            <Clock className="w-3 h-3 text-[#c5a059]" />
          </div>
          <div className="text-xs font-mono text-[#f4f3ef] uppercase">
            {lastSyncedAt ? lastSyncedAt.toLocaleTimeString() : 'REAL-TIME'}
          </div>
          <div className="text-[9px] font-mono text-[#22c55e] uppercase tracking-wider">SUPABASE ACTIVE</div>
        </div>
      </div>
    </div>
  );
};
