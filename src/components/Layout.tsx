/**
 * Layout Component
 * 
 * Performance-optimized layout with proper animation orchestration.
 * 
 * Features:
 * - Single AnimatePresence for route transitions
 * - Performance tier-aware animations
 * - CSS animations for simple effects
 * - Framer Motion ONLY for route transitions
 */

import React, { useMemo } from 'react';
import { MotionConfig, motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { Toaster } from './ui/sonner';
import { useLocation } from 'react-router-dom';
import { useDeviceType } from '../hooks/useDeviceType';
import { CustomCursor } from './CustomCursor';
import { AnimationProvider } from './AnimationProvider';
import { useAnimation } from './AnimationProvider';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isTouch, prefersReducedMotion } = useDeviceType();
  const { performanceTier, shouldAnimate: canAnimate } = useAnimation();

  // Memoized route transition config
  const routeTransition = useMemo(() => ({
    initial: canAnimate ? { opacity: 0, y: 4 } : { opacity: 1, y: 0 },
    animate: canAnimate ? { opacity: 1, y: 0 } : {},
    exit: canAnimate ? { opacity: 0, y: -4 } : {},
    transition: {
      type: 'spring',
      stiffness: performanceTier === 'high' ? 200 : 150,
      damping: performanceTier === 'high' ? 20 : 25,
      mass: 1,
    },
  }), [canAnimate, performanceTier]);

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
                {...routeTransition}
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
