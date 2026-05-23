import React from 'react';
import { MotionConfig, motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { Toaster } from './ui/sonner';
import { useLocation } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col font-sans relative no-scrollbar">
        <Navbar />
        <main className="flex-1 pt-12 no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingActions />
        <Toaster position="top-center" expand={false} />
      </div>
    </MotionConfig>
  );
}
