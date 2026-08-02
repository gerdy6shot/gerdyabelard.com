import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] flex flex-col font-sans-ui selection:bg-[#c5a059] selection:text-[#08080a]">
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Desktop Fixed Left Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="fixed top-0 left-0 bottom-0 w-64 z-30">
            <AdminSidebar />
          </div>
        </div>

        {/* Mobile Slide-Over Navigation Drawer with Backdrop Overlay */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-[1000] lg:hidden flex">
              {/* Full-Page Backdrop Layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 bg-[#000000]/75 backdrop-blur-[3px] z-[900]"
                onClick={() => setMobileSidebarOpen(false)}
              />

              {/* Navigation Drawer Panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-[1000] w-64 max-w-full bg-[#0d0d10] h-full shadow-2xl border-r border-[#22222c]"
              >
                <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Operational Stage Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopBar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

          <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
};
