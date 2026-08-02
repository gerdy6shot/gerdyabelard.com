import React from 'react';
import { motion } from 'motion/react';
import { PageTitle } from '../../components/PageTitle';
import { GlassPanel } from '../../components/GlassPanel';
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from 'lucide-react';

export const AdminCalendar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#22222c]">
        <PageTitle
          eyebrow="STUDIO OS // CALENDAR"
          title="PRODUCTION CALENDAR"
          subtitle="Awaiting scheduling intelligence..."
        />
        <button className="px-4 py-2.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Block</span>
        </button>
      </div>

      <GlassPanel className="p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-widest">
            <CalendarIcon className="w-4 h-4" />
            <span>CALENDAR VIEW // MONTHLY SYNC</span>
          </div>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase">Timezone: EST (UTC-5)</span>
        </div>

        <div className="p-12 bg-[#0a0a0d] border border-[#1f1f28] text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#16161c] border border-[#22222c] flex items-center justify-center text-[#c5a059]">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-wider">
            SYSTEM SCHEDULE ACTIVE
          </h3>
          <p className="text-xs font-mono text-[#8a8a8a] max-w-md mx-auto">
            Calendar synchronization is live with Supabase availability rules. Production sessions will render on the timeline as bookings are confirmed.
          </p>
        </div>
      </GlassPanel>
    </motion.div>
  );
};
