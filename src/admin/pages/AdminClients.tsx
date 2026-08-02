import React from 'react';
import { motion } from 'motion/react';
import { PageTitle } from '../../components/PageTitle';
import { GlassPanel } from '../../components/GlassPanel';
import { Users, UserPlus, Search, Building } from 'lucide-react';

export const AdminClients: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#22222c]">
        <PageTitle
          eyebrow="STUDIO OS // CLIENTS"
          title="CLIENT ARCHIVE"
          subtitle="Awaiting relationships..."
        />
        <button className="px-4 py-2.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span>New Client</span>
        </button>
      </div>

      <GlassPanel className="p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-widest">
            <Users className="w-4 h-4" />
            <span>CLIENT RECORDS</span>
          </div>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase">Encrypted Contacts</span>
        </div>

        <div className="p-12 bg-[#0a0a0d] border border-[#1f1f28] text-center space-y-3">
          <Building className="w-10 h-10 text-[#c5a059] mx-auto" />
          <h3 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-wider">
            CLIENT CRM CONNECTED
          </h3>
          <p className="text-xs font-mono text-[#8a8a8a] max-w-md mx-auto">
            Client profiles created during booking flows or inquiries are recorded under <code className="text-[#c5a059]">public.clients</code>.
          </p>
        </div>
      </GlassPanel>
    </motion.div>
  );
};
