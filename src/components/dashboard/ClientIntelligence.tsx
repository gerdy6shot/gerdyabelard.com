import React from 'react';
import { GlassPanel } from '../GlassPanel';
import { Users, Mail, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ClientProfileItem {
  id: string;
  full_name: string;
  email: string;
  company?: string;
  total_engagements?: number;
  created_at: string;
}

interface ClientIntelligenceProps {
  clients: ClientProfileItem[];
  isLoading: boolean;
}

export const ClientIntelligence: React.FC<ClientIntelligenceProps> = ({ clients, isLoading }) => {
  return (
    <GlassPanel className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
            // CLIENT INTELLIGENCE
          </span>
          <h2 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-[0.1em] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#c5a059]" />
            Executive Client Roster
          </h2>
        </div>

        <Link
          to="/admin/clients"
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#c5a059] transition-colors flex items-center gap-2"
        >
          <span>View All Clients</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="h-16 bg-[#181820] animate-pulse border border-[#22222c]" />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="p-8 bg-[#0a0a0d] border border-[#1f1f28] text-center space-y-2">
          <p className="text-xs font-mono text-[#f4f3ef] uppercase tracking-widest">
            Awaiting Client Profiles
          </p>
          <p className="text-[10px] font-mono text-[#777785]">
            Client records created through bookings or manual entry will automatically log here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.slice(0, 4).map((client) => (
            <div
              key={client.id}
              className="p-4 bg-[#0d0d11] border border-[#22222c] hover:border-[#c5a059]/40 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-serif-display text-[#f4f3ef] uppercase tracking-wider">
                    {client.full_name}
                  </div>
                  {client.company && (
                    <div className="text-[10px] font-mono text-[#c5a059] uppercase">
                      {client.company}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-[#4ade80] bg-[#102010] border border-[#1e451e] px-2 py-0.5 uppercase">
                  <ShieldCheck className="w-3 h-3" />
                  <span>VERIFIED</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1f1f28] flex items-center justify-between text-[10px] font-mono text-[#8a8a8a]">
                <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                  <Mail className="w-3 h-3 text-[#c5a059]" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="text-[#c5a059]">
                  {client.total_engagements ?? 1} Session(s)
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  );
};
