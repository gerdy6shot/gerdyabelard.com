import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { LogOut, User, Radio, ExternalLink, ChevronDown, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface AdminTopBarProps {
  onToggleMobileSidebar: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ onToggleMobileSidebar }) => {
  const { user, adminProfile, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roleLabel = adminProfile?.role === 'super_admin' ? 'SUPER ADMIN' : 'STUDIO ADMIN';
  const userName = adminProfile?.full_name || user?.email || 'Gerdy Abelard';

  useEffect(() => {
    if (dropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDropdownOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Cinematic Full-Page Backdrop Overlay when dropdown is open */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => setDropdownOpen(false)}
            className="fixed inset-0 bg-[#000000]/70 backdrop-blur-[2px] z-[900] pointer-events-auto"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="h-16 bg-[#0d0d10] border-b border-[#22222c] px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden text-[#8a8a8a] hover:text-[#f4f3ef] p-1.5 border border-[#22222c] bg-[#121216] transition-colors"
            aria-label="Toggle Navigation"
          >
            <span className="sr-only">Toggle Sidebar</span>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-[#15151b] border border-[#22222c] text-[10px] font-mono text-[#c5a059] uppercase tracking-widest">
              <Radio className="w-3 h-3 text-[#c5a059] animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#8a8a8a] hover:text-[#f4f3ef] transition-colors border border-transparent hover:border-[#22222c] px-2.5 py-1"
            >
              <span>Preview Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Dropdown Trigger & Popover */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-3 p-1.5 rounded-none bg-[#121216] border transition-all ${
                dropdownOpen
                  ? 'border-[#c5a059] text-[#f4f3ef] shadow-lg shadow-[#c5a059]/10'
                  : 'border-[#22222c] hover:border-[#c5a059]/50'
              }`}
              aria-expanded={dropdownOpen}
            >
              <div className="w-7 h-7 rounded-full bg-[#181820] border border-[#22222c] flex items-center justify-center text-[#c5a059]">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:block text-right pr-1">
                <div className="text-xs font-serif-display text-[#f4f3ef] tracking-wider uppercase leading-none mb-0.5">
                  {userName}
                </div>
                <div className="text-[8px] font-mono text-[#c5a059] tracking-widest uppercase">
                  {roleLabel}
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#8a8a8a] transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-180 text-[#c5a059]' : ''
                }`}
              />
            </button>

            {/* User Dropdown Popover with z-[1000] */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-3 w-72 bg-[#0d0d11] border border-[#c5a059]/40 shadow-2xl z-[1000] p-5 space-y-4 font-mono"
                >
                  <div className="pb-3 border-b border-[#22222c] space-y-1">
                    <div className="text-xs font-serif-display text-[#f4f3ef] uppercase tracking-wider">
                      {userName}
                    </div>
                    <div className="text-[9px] text-[#8a8a8a] truncate">{user?.email}</div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#c5a059]/10 border border-[#c5a059]/30 text-[9px] text-[#c5a059] uppercase tracking-widest mt-1.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{roleLabel}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <Link
                      to="/admin/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 text-[#a1a1aa] hover:text-[#f4f3ef] hover:bg-[#181820] transition-colors group"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#c5a059] group-hover:scale-110 transition-transform" />
                      <span className="uppercase tracking-wider">System Settings</span>
                    </Link>

                    <a
                      href="https://comviewmedia.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 p-2 text-[#a1a1aa] hover:text-[#f4f3ef] hover:bg-[#181820] transition-colors group"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a059] group-hover:scale-110 transition-transform" />
                      <span className="uppercase tracking-wider">Comviewmedia</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-[#22222c]">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center justify-between p-2.5 bg-[#161212] border border-[#331818] hover:border-[#ef4444]/50 hover:bg-[#221010] text-[#ef4444] text-xs uppercase tracking-wider transition-all"
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
};
