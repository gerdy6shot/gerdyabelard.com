import React from 'react';
import { GlassPanel } from '../GlassPanel';
import { Users, Calendar, Clock, BookmarkCheck, TrendingUp } from 'lucide-react';

export interface DashboardMetricsData {
  totalClients: number;
  totalBookings: number;
  pendingRequests: number;
  confirmedSessions: number;
  upcomingAppointments: number;
}

interface MetricPanelProps {
  metrics: DashboardMetricsData | null;
  isLoading: boolean;
}

export const MetricPanel: React.FC<MetricPanelProps> = ({ metrics, isLoading }) => {
  const items = [
    {
      label: 'TOTAL CLIENT ROSTER',
      value: metrics?.totalClients ?? 0,
      subtext: 'ACTIVE RELATIONSHIPS',
      icon: Users,
    },
    {
      label: 'TOTAL ENGAGEMENTS',
      value: metrics?.totalBookings ?? 0,
      subtext: 'RECORDED IN SYSTEM',
      icon: Calendar,
    },
    {
      label: 'PENDING INQUIRIES',
      value: metrics?.pendingRequests ?? 0,
      subtext: 'AWAITING APPROVAL',
      icon: Clock,
      highlight: (metrics?.pendingRequests ?? 0) > 0,
    },
    {
      label: 'CONFIRMED SHOOTS',
      value: metrics?.confirmedSessions ?? 0,
      subtext: 'CALENDAR LOCKED',
      icon: BookmarkCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <GlassPanel
            key={idx}
            className={`p-6 transition-all duration-300 relative group overflow-hidden ${
              item.highlight ? 'border-[#c5a059]/50 bg-[#16161c]' : ''
            }`}
          >
            <div className="flex items-center justify-between text-[#8a8a8a] mb-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#a1a1aa]">
                {item.label}
              </span>
              <Icon className="w-4 h-4 text-[#c5a059] group-hover:scale-110 transition-transform" />
            </div>

            <div className="space-y-1">
              {isLoading ? (
                <div className="h-9 w-20 bg-[#22222c] animate-pulse rounded" />
              ) : (
                <div className="font-serif-display text-3xl sm:text-4xl text-[#f4f3ef] tracking-wider">
                  {String(item.value).padStart(2, '0')}
                </div>
              )}
              <div className="text-[9px] font-mono text-[#c5a059] tracking-widest uppercase">
                {item.subtext}
              </div>
            </div>

            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#c5a059]/5 via-transparent to-transparent pointer-events-none" />
          </GlassPanel>
        );
      })}
    </div>
  );
};
