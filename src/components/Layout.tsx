import React from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { Toaster } from './ui/sonner';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col font-sans relative no-scrollbar">
        <Navbar />
        <main className="flex-1 pt-12 no-scrollbar">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <Toaster position="top-center" expand={false} />
      </div>
    </MotionConfig>
  );
}
