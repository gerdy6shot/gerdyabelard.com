import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Film,
  Calendar,
  BookmarkCheck,
  Users,
  Briefcase,
  Clock,
  Settings,
  Sparkles,
  ExternalLink,
  Shield,
  X,
} from 'lucide-react';
import { NavigationItem } from '../components/NavigationItem';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const mainNav = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/projects', icon: Film, label: 'Director Vault' },
    { to: '/admin/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/admin/bookings', icon: BookmarkCheck, label: 'Bookings' },
    { to: '/admin/clients', icon: Users, label: 'Clients' },
    { to: '/admin/services', icon: Briefcase, label: 'Services' },
    { to: '/admin/availability', icon: Clock, label: 'Availability' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const ventures = [
    { name: 'COMVIEWMEDIA', url: 'https://comviewmedia.com', category: 'Film & Production' },
    { name: 'OVERHAULTRAIN', url: '#', category: 'Performance OS' },
    { name: 'ROCE DE LIBERTAD', url: '#', category: 'Humanitarian IP' },
  ];

  return (
    <aside className="w-64 bg-[#0d0d10] border-r border-[#22222c] h-full flex flex-col justify-between select-none">
      <div>
        {/* Top Header */}
        <div className="p-6 border-b border-[#22222c] flex items-center justify-between">
          <Link to="/admin" className="space-y-1 block group" onClick={onCloseMobile}>
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-lg tracking-[0.15em] text-[#f4f3ef] group-hover:text-[#c5a059] transition-colors uppercase">
                GERDY ABELARD
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                STUDIO OS • PROD
              </span>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-[#8a8a8a] hover:text-[#f4f3ef] p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Primary Navigation */}
        <div className="py-4 space-y-1">
          <div className="px-4 py-2 text-[9px] font-mono text-[#555562] uppercase tracking-[0.3em]">
            // Command Navigation
          </div>
          <nav className="space-y-0.5">
            {mainNav.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                onClick={onCloseMobile}
              />
            ))}
          </nav>
        </div>

        {/* Studio Ecosystem / Ventures Section */}
        <div className="px-4 pt-6 pb-2 space-y-3 border-t border-[#1c1c24]">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#555562] uppercase tracking-[0.3em]">
            <span>// Venture Ecosystem</span>
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
          </div>
          <div className="space-y-2">
            {ventures.map((v) => (
              <a
                key={v.name}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2.5 bg-[#121216] border border-[#22222c] hover:border-[#c5a059]/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-[#f4f3ef] group-hover:text-[#c5a059] transition-colors uppercase">
                    {v.name}
                  </div>
                  <div className="text-[8px] font-mono text-[#777785]">{v.category}</div>
                </div>
                <ExternalLink className="w-3 h-3 text-[#555562] group-hover:text-[#c5a059] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Security Badge */}
      <div className="p-4 border-t border-[#22222c] bg-[#08080a]">
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#8a8a8a]">
          <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="uppercase tracking-wider">Encrypted Session</span>
        </div>
      </div>
    </aside>
  );
};
