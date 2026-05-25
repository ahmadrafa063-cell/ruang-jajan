/**
 * AnimationProvider Component
 * 
 * Context provider for animation configuration and performance tiers.
 * 
 * Features:
 * - Detects device performance tier
 * - Provides animation config to children
 * - Handles reduced motion globally
 * - Optimizes animations based on device capabilities
 * 
 * Usage:
 * <AnimationProvider>
 *   <App />
 * </AnimationProvider>
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
     isLowEndDevice,
     prefersReducedMotion,
     isTouchDevice,
     isIOS,
     isAndroid,
} from '../lib/deviceDetect';
import {
     getPerformanceTier,
     shouldAnimate,
     shouldParallax,
     shouldBlur,
     shouldInfiniteAnimate,
     PerformanceTier,
} from '../lib/performanceTier';

// Animation config type
export interface AnimationConfig {
     type?: 'spring' | 'tween' | 'keyframes';
     duration?: number;
     delay?: number;
     ease?: string | number[];
     stiffness?: number;
     damping?: number;
     mass?: number;
     velocity?: number;
}

// Animation presets
export interface AnimationPresets {
     snappy: AnimationConfig;
     smooth: AnimationConfig;
     bouncy: AnimationConfig;
     gentle: AnimationConfig;
     molasses: AnimationConfig;
}

// Performance tier
export type PerformanceTier = 'high' | 'medium' | 'low';

// Context type
interface AnimationContextType {
     performanceTier: PerformanceTier;
     reducedMotion: boolean;
     isTouch: boolean;
     isIOS: boolean;
     isAndroid: boolean;
     getAnimationConfig: (preset: string) => AnimationConfig;
     getTransition: (preset: string) => AnimationConfig;
     shouldAnimate: boolean;
     shouldStagger: boolean;
     shouldParallax: boolean;
     shouldBlur: boolean;
     shouldGlow: boolean;
}

// Default context
const defaultContext: AnimationContextType = {
     performanceTier: 'high',
     reducedMotion: false,
     isTouch: false,
     isIOS: false,
     isAndroid: false,
     getAnimationConfig: () => ({ type: 'spring', stiffness: 300, damping: 25 }),
     getTransition: () => ({ duration: 0.3, ease: 'easeInOut' }),
     shouldAnimate: true,
     shouldStagger: true,
     shouldParallax: true,
     shouldBlur: true,
     shouldGlow: true,
};

// Create context
const AnimationContext = createContext<AnimationContextType>(defaultContext);

// Provider component
export function AnimationProvider({ children }: { children: React.ReactNode }) {
     // State
     const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('high');
     const [reducedMotion, setReducedMotion] = useState(false);
     const [isTouch, setIsTouch] = useState(false);
     const [isIOSDevice, setIsIOS] = useState(false);
     const [isAndroidDevice, setIsAndroid] = useState(false);
     const [mounted, setMounted] = useState(false);

     // Update performance tier
     const updatePerformanceTier = () => {
          // Check reduced motion first (highest priority)
          const reduced = prefersReducedMotion();
          setReducedMotion(reduced);

          // Check touch device
          const touch = isTouchDevice();
          setIsTouch(touch);

          // Check platform
          setIsIOS(isIOS());
          setIsAndroid(isAndroid());

          // Get performance tier from cached detection
          const tier = getPerformanceTier();
          setPerformanceTier(tier);
     };

     // Initial update after hydration
     useEffect(() => {
          setMounted(true);
          updatePerformanceTier();
     }, []);

     // Update on resize
     useEffect(() => {
          const handleResize = () => {
               updatePerformanceTier();
          };

          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
     }, []);

     // Get animation config
     const getAnimationConfig = (preset: string): AnimationConfig => {
          if (reducedMotion) {
               return { duration: 0 };
          }

          if (performanceTier === 'low') {
               return { duration: 0.3, ease: 'easeInOut' };
          }

          switch (preset) {
               case 'snappy':
                    return { type: 'spring', stiffness: 400, damping: 30 };
               case 'smooth':
                    return { type: 'spring', stiffness: 300, damping: 25 };
               case 'bouncy':
                    return { type: 'spring', stiffness: 500, damping: 20 };
               case 'gentle':
                    return { type: 'spring', stiffness: 200, damping: 20 };
               case 'molasses':
                    return { type: 'spring', stiffness: 150, damping: 18 };
               default:
                    return { type: 'spring', stiffness: 300, damping: 25 };
          }
     };

     // Get transition config
     const getTransition = (preset: string): AnimationConfig => {
          if (reducedMotion) {
               return { duration: 0 };
          }

          if (performanceTier === 'low') {
               return { duration: 0.3, ease: 'easeInOut' };
          }

          return getAnimationConfig(preset);
     };

     // Determine what to animate
     const shouldAnimate = performanceTier !== 'low' && !reducedMotion && mounted;
     const shouldStagger = performanceTier !== 'low' && !reducedMotion && mounted;
     const shouldParallax = performanceTier === 'high' && !reducedMotion && mounted;
     const shouldBlur = performanceTier !== 'low' && !reducedMotion && mounted;
     const shouldGlow = performanceTier === 'high' && !reducedMotion && mounted;

     // Context value
     const contextValue: AnimationContextType = {
          performanceTier,
          reducedMotion,
          isTouch,
          isIOS: isIOSDevice,
          isAndroid: isAndroidDevice,
          getAnimationConfig,
          getTransition,
          shouldAnimate,
          shouldStagger,
          shouldParallax,
          shouldBlur,
          shouldGlow,
     };

     return (
          <AnimationContext.Provider value={contextValue}>
               {children}
          </AnimationContext.Provider>
     );
}

// Custom hook
export function useAnimation() {
     const context = useContext(AnimationContext);
     if (!context) {
          throw new Error('useAnimation must be used within AnimationProvider');
     }
     return context;
}

// Export everything
export default {
     AnimationProvider,
     useAnimation,
     AnimationContext,
};
