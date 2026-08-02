import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GlobalHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname.startsWith('/admin') || location.pathname === '/') {
    return null;
  }

  const navLinks = [
    { label: 'WORK', path: '/work', index: '01' },
    { label: 'FILM', path: '/film', index: '02' },
    { label: 'PHOTOGRAPHY', path: '/photography', index: '03' },
    { label: 'ARCHIVE', path: '/archive', index: '05' },
    { label: 'ORIGINAL IP', path: '/ip', index: '06' },
    { label: 'WRITING', path: '/writing', index: '07' },
    { label: 'VENTURES', path: '/ventures', index: '08' },
    { label: 'ABOUT', path: '/about', index: '09' },
    { label: 'INQUIRE', path: '/inquire', index: '10', highlight: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/85 backdrop-blur-xl border-b border-[#22222c] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link 
          to="/" 
          className="flex flex-col group transition-opacity hover:opacity-80 shrink-0"
          id="global-brand-logo"
        >
          <span className="font-serif-display text-base sm:text-lg tracking-[0.2em] font-medium text-[#f4f3ef]">
            GERDY ABELARD
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-[11px] tracking-[0.12em] font-medium text-[#a1a1aa]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors uppercase hover:text-[#f4f3ef] whitespace-nowrap ${
                  isActive ? 'text-[#c5a059] border-b border-[#c5a059] pb-0.5' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Compact Nav for medium-large screens (lg) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-4 text-[11px] tracking-[0.12em] font-medium text-[#a1a1aa]">
          {navLinks.filter(l => ['/work', '/film', '/photography', '/archive', '/ventures', '/about', '/inquire'].includes(l.path)).map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors uppercase hover:text-[#f4f3ef] whitespace-nowrap ${
                  isActive ? 'text-[#c5a059] border-b border-[#c5a059] pb-0.5' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/book"
            className="text-xs uppercase tracking-[0.2em] px-5 py-2.5 bg-[#f4f3ef] text-[#08080a] font-semibold hover:bg-[#c5a059] transition-all flex items-center gap-2 shadow-lg"
            id="header-inquire-btn"
          >
            Book
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 text-[#f4f3ef] hover:text-[#c5a059] transition-colors bg-[#121218] border border-[#22222c] active:scale-95"
          aria-label="Toggle Navigation Menu"
          id="mobile-menu-toggle-btn"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#c5a059]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Cinematic Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-20 bg-[#08080a]/98 backdrop-blur-2xl z-40 p-6 sm:p-8 flex flex-col justify-between border-t border-[#22222c] overflow-y-auto"
          >
            {/* Navigation Chapter List */}
            <div className="flex flex-col space-y-4 my-auto py-6">
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#8a8a8a] uppercase block mb-2">
                // GERDY ABELARD ARCHIVE
              </span>

              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-baseline justify-between py-2 border-b transition-colors ${
                        link.highlight
                          ? 'border-[#c5a059]/40 text-[#c5a059]'
                          : isActive
                          ? 'border-[#c5a059] text-[#c5a059]'
                          : 'border-[#1b1b24] text-[#f4f3ef] hover:text-[#c5a059]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#8a8a8a]">
                          {link.index}
                        </span>
                        <span className="font-serif-display text-xl sm:text-2xl tracking-[0.08em] uppercase">
                          {link.label}
                        </span>
                      </div>
                      {link.highlight ? (
                        <Sparkles className="w-4 h-4 text-[#c5a059]" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-[#22222c] space-y-4 mt-auto">
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all block shadow-xl"
              >
                Book Commission / Consultation
              </Link>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest pt-2">
                <span>COMVIEWMEDIA INC</span>
                <span>EST. 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

