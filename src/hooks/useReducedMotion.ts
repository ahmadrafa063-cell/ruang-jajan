/**
 * useReducedMotion Hook
 * 
 * Respects user's reduced motion preferences.
 * 
 * Features:
 * - Detects prefers-reduced-motion
 * - Provides reduced motion state
 * - Updates on preference change
 * 
 * Usage:
 * const { reducedMotion, animationConfig } = useReducedMotion();
 */

import { useEffect, useState } from 'react';

// Hook return type
export interface UseReducedMotionReturn {
     reducedMotion: boolean;
     animationConfig: {
          duration?: number;
          ease?: string;
          type?: string;
          stiffness?: number;
          damping?: number;
     };
     transitionConfig: {
          duration?: number;
          ease?: string;
     };
}

// Main hook
export function useReducedMotion(): UseReducedMotionReturn {
     // State
     const [reducedMotion, setReducedMotion] = useState(false);

     // Check reduced motion preference
     const checkReducedMotion = () => {
          if (typeof window === 'undefined') return;

          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
          setReducedMotion(prefersReducedMotion.matches);

          // Update on change
          const handleChange = (event: MediaQueryListEvent) => {
               setReducedMotion(event.matches);
          };

          prefersReducedMotion.addEventListener('change', handleChange);
          return () => {
               prefersReducedMotion.removeEventListener('change', handleChange);
          };
     };

     // Initial check
     useEffect(() => {
          const cleanup = checkReducedMotion();
          return cleanup;
     }, []);

     // Animation config based on reduced motion
     const getAnimationConfig = (preset: string) => {
          if (reducedMotion) {
               return { duration: 0 };
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

     // Animation config for reduced motion
     const getReducedMotionConfig = () => {
          if (reducedMotion) {
               return { duration: 0 };
          }
          return { type: 'spring', stiffness: 300, damping: 25 };
     };

     // Transition config
     const getTransitionConfig = () => {
          if (reducedMotion) {
               return { duration: 0 };
          }
          return { duration: 0.3, ease: 'easeInOut' };
     };

     return {
          reducedMotion,
          animationConfig: getReducedMotionConfig(),
          transitionConfig: getTransitionConfig(),
     };
}

// Hook for conditional animation
export function useConditionalAnimation(
     enabled: boolean,
     config?: {
          duration?: number;
          ease?: string;
          type?: string;
          stiffness?: number;
          damping?: number;
     }
) {
     const { reducedMotion } = useReducedMotion();

     if (reducedMotion || !enabled) {
          return { duration: 0 };
     }

     return config || { type: 'spring', stiffness: 300, damping: 25 };
}

// Hook for stagger delay
export function useStaggerDelay(
     index: number,
     baseDelay: number = 0.08,
     enabled: boolean = true
): number {
     const { reducedMotion } = useReducedMotion();

     if (reducedMotion || !enabled) {
          return 0;
     }

     return index * baseDelay;
}

// Export everything
export default {
     useReducedMotion,
     useConditionalAnimation,
     useStaggerDelay,
};
