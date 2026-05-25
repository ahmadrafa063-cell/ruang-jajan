import React from 'react';
import { MotionConfig, motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { Toaster } from './ui/sonner';
import { useLocation } from 'react-router-dom';
import { useDeviceType } from '../hooks/useDeviceType';
import { CustomCursor } from './CustomCursor';
import { AnimationProvider } from './AnimationProvider';
import { getPerformanceTier, shouldAnimate } from '../lib/performanceTier';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isTouch, prefersReducedMotion } = useDeviceType();
  const performanceTier = getPerformanceTier();
  const canAnimate = shouldAnimate();

  return (
    <AnimationProvider>
      <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'user'}>
        <div className="min-h-screen flex flex-col font-sans relative no-scrollbar">
          {/* Custom cursor for desktop only */}
          {!isTouch && <CustomCursor />}

          <Navbar />
          <main className="flex-1 pt-12 no-scrollbar overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={canAnimate ? { opacity: 0, y: 4 } : { opacity: 1, y: 0 }}
                animate={canAnimate ? { opacity: 1, y: 0 } : {}}
                exit={canAnimate ? { opacity: 0, y: -4 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: performanceTier === 'high' ? 200 : 150,
                  damping: performanceTier === 'high' ? 20 : 25,
                  mass: 1
                }}
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
    </AnimationProvider>
  );
}
