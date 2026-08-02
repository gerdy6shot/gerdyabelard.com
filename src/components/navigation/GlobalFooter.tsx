import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const GlobalFooter: React.FC = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin') || location.pathname === '/') {
    return null;
  }

  return (
    <footer className="bg-[#08080a] border-t border-[#1c1c24] py-16 text-[#a1a1aa] selection:bg-[#c5a059] selection:text-[#08080a]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand Signature */}
        <div className="space-y-1">
          <span className="font-serif-display text-lg tracking-[0.2em] text-[#f4f3ef] uppercase block">
            GERDY ABELARD
          </span>
          <span className="text-[10px] font-mono text-[#8a8a8a] tracking-[0.25em] uppercase block">
            DIRECTOR & AUTHOR
          </span>
        </div>

        {/* Minimal Signature Navigation */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs tracking-[0.2em] uppercase text-[#8a8a8a]">
          <Link to="/work" className="hover:text-[#f4f3ef] transition-colors">Work</Link>
          <Link to="/film" className="hover:text-[#f4f3ef] transition-colors">Film</Link>
          <Link to="/photography" className="hover:text-[#f4f3ef] transition-colors">Photography</Link>
          <Link to="/archive" className="hover:text-[#f4f3ef] transition-colors">Archive</Link>
          <Link to="/comviewmedia" className="hover:text-[#f4f3ef] transition-colors">COMVIEWMEDIA</Link>
          <Link to="/inquire" className="text-[#c5a059] hover:text-[#f4f3ef] transition-colors">Inquiry</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-[#181820] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#8a8a8a] tracking-[0.25em] uppercase">
        <p>&copy; {new Date().getFullYear()} GERDY ABELARD. ALL RIGHTS RESERVED.</p>
        <p>COMVIEWMEDIA</p>
      </div>
    </footer>
  );
};
