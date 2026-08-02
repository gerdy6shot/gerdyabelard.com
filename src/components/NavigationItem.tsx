import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: string | number;
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  icon: Icon,
  label,
  badge,
  onClick,
}) => {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center justify-between px-4 py-3 text-xs font-mono tracking-[0.15em] uppercase transition-all duration-300 relative ${
          isActive
            ? 'bg-[#18181c] text-[#f4f3ef] border-l-2 border-[#c5a059]'
            : 'text-[#8a8a8a] hover:text-[#f4f3ef] hover:bg-[#141418]'
        }`
      }
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-[#c5a059] group-hover:scale-110 transition-transform" />
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <span className="text-[10px] font-mono text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 border border-[#c5a059]/30">
          {badge}
        </span>
      )}
    </NavLink>
  );
};
