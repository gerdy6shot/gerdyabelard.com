import React from 'react';
import { motion } from 'motion/react';
import { PageTitle } from '../../components/PageTitle';
import { GlassPanel } from '../../components/GlassPanel';
import { Clock, Calendar, Check, Sliders } from 'lucide-react';

export const AdminAvailability: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#22222c]">
        <PageTitle
          eyebrow="STUDIO OS // AVAILABILITY"
          title="TIME MANAGEMENT"
          subtitle="Configure availability..."
        />
        <button className="px-4 py-2.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-colors flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          <span>Save Schedule</span>
        </button>
      </div>

      <GlassPanel className="p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            <span>WEEKLY HOURS MATRIX</span>
          </div>
          <span className="text-[10px] font-mono text-[#4ade80] uppercase">Sync Enabled</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map((day) => (
            <div key={day} className="p-4 bg-[#0a0a0d] border border-[#22222c] space-y-2">
              <div className="text-xs font-mono text-[#f4f3ef] uppercase tracking-wider">{day}</div>
              <div className="text-[11px] font-mono text-[#c5a059]">09:00 AM – 06:00 PM</div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#4ade80]">
                <Check className="w-3 h-3" />
                <span>ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
};
