/**
 * iOS-Style Animation Variants (CSS-First Approach)
 * 
 * This file defines animation variants that are:
 * - useMemo-safe (defined outside component body)
 * - Performance tier-aware
 * - CSS-first with Framer Motion fallback
 * - Optimized for mobile performance
 * 
 * Key Principles:
 * - NEVER define animation variants inside component body
 * - Use CSS @keyframes for all animations when possible
 * - Use Framer Motion ONLY for drag/spring interactions
 * - All variants must be memoized with useMemo
 */

import { useMemo } from 'react';
import {
     getSpring,
     getStaggerDelay,
     shouldUseFramerMotion,
     shouldInfiniteAnimate,
     shouldParallax,
     shouldBlur,
     getAnimationBudget,
     PerformanceTier,
} from './performanceTier';

// iOS Spring Physics Presets (defined outside component)
export const springs = {
     snappy: { stiffness: 400, damping: 30, mass: 0.8 },
     smooth: { stiffness: 300, damping: 25, mass: 1 },
     bouncy: { stiffness: 500, damping: 20, mass: 0.7 },
     gentle: { stiffness: 200, damping: 20, mass: 1.2 },
     molasses: { stiffness: 150, damping: 18, mass: 1.5 },
     sheet: { stiffness: 300, damping: 30, mass: 1 },
     modal: { stiffness: 300, damping: 25, mass: 1 },
     popover: { stiffness: 400, damping: 30, mass: 0.8 },
};

// Animation Variants - Reusable animation states
// These are defined OUTSIDE component body for useMemo safety
export const variants = {
     // Fade Up - Elements slide up from below with fade
     fadeUp: {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
     },

     // Fade Down - Elements slide down from above with fade
     fadeDown: {
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
     },

     // Fade Left - Elements slide left with fade
     fadeLeft: {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
     },

     // Fade Right - Elements slide right with fade
     fadeRight: {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 },
     },

     // Fade In - Simple opacity fade
     fadeIn: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
     },

     // Scale In - Elements scale up from 0.92 to 1.0
     scaleIn: {
          hidden: { opacity: 0, scale: 0.92 },
          visible: { opacity: 1, scale: 1 },
     },

     // Scale Out - Elements scale down to 0.92
     scaleOut: {
          initial: { opacity: 1, scale: 1 },
          animate: { opacity: 0, scale: 0.92 },
     },

     // Slide Right - Elements slide from left to right
     slideRight: {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
     },

     // Slide Left - Elements slide from right to left
     slideLeft: {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
     },

     // Stagger Container - Children animate with delay
     stagger: {
          visible: {
               transition: { staggerChildren: getStaggerDelay(0.08) },
          },
     },

     // Stagger Item - Individual item in stagger container
     staggerItem: {
          hidden: { opacity: 0, y: 20 },
          visible: {
               opacity: 1,
               y: 0,
               transition: { type: 'spring', ...springs.smooth },
          },
     },

     // Hover Lift - Desktop hover effect
     hoverLift: {
          initial: { y: 0 },
          hover: {
               y: -8,
               transition: { type: 'spring', ...springs.snappy },
          },
     },

     // Hover Scale - Subtle scale increase on hover
     hoverScale: {
          initial: { scale: 1 },
          hover: {
               scale: 1.02,
               transition: { type: 'spring', ...springs.smooth },
          },
     },

     // Tap Effect - Touch/click response
     tapEffect: {
          initial: { scale: 1 },
          tap: { scale: 0.96 },
          whileTap: { scale: 0.96 },
          whileHover: { scale: 1.02 },
     },

     // Pulse - Breathing animation for CTAs
     pulse: {
          initial: { scale: 1 },
          animate: shouldInfiniteAnimate() ? {
               scale: [1, 1.05, 1],
               transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          } : {},
     },

     // Float - Gentle up/down movement
     float: {
          initial: { y: 0 },
          animate: shouldInfiniteAnimate() ? {
               y: [-10, 0, -10],
               transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          } : {},
     },

     // Blur In - Text starts blurred, becomes sharp
     blurIn: {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: {
               opacity: 1,
               filter: 'blur(0px)',
               transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
          },
     },

     // Shine - CTA button shine effect
     shine: {
          initial: { left: '-100%' },
          animate: shouldInfiniteAnimate() ? {
               left: '100%',
               transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          } : {},
     },

     // Pop - Scale bounce effect
     pop: {
          initial: { scale: 0 },
          animate: {
               scale: [0, 1.1, 1],
               transition: { type: 'spring', ...springs.bouncy },
          },
     },

     // Slide Up Sheet - Bottom sheet entrance
     slideUpSheet: {
          initial: { y: '100%' },
          animate: {
               y: 0,
               transition: { type: 'spring', ...springs.sheet },
          },
          exit: {
               y: '100%',
               transition: { type: 'spring', ...springs.sheet },
          },
     },

     // Scale Modal - Modal scale in from center
     scaleModal: {
          initial: { opacity: 0, scale: 0.9 },
          animate: {
               opacity: 1,
               scale: 1,
               transition: { type: 'spring', ...springs.modal },
          },
          exit: {
               opacity: 0,
               scale: 0.9,
               transition: { type: 'spring', ...springs.modal },
          },
     },
};

// Animation Config - Reusable transition objects
export const animationConfig = {
     fastSpring: { type: 'spring', ...springs.snappy },
     smoothSpring: { type: 'spring', ...springs.smooth },
     gentleSpring: { type: 'spring', ...springs.gentle },
     bouncySpring: { type: 'spring', ...springs.bouncy },
     molassesSpring: { type: 'spring', ...springs.molasses },
     easeIn: { ease: [0.4, 0, 1, 1] },
     easeOut: { ease: [0, 0, 0.2, 1] },
     easeInOut: { ease: [0.4, 0, 0.2, 1] },
     backEase: { ease: [0.34, 1.56, 0.64, 1] },
};

// Stagger Delays - For sequential animations
export const staggerDelays = {
     fast: 0.08,
     medium: 0.1,
     slow: 0.12,
};

// Animation Delays - For specific timing needs
export const animationDelays = {
     none: 0,
     fast: 0.1,
     medium: 0.2,
     slow: 0.3,
     verySlow: 0.5,
};

// Custom hook for animation variants (useMemo-safe)
export function useAnimationVariants() {
     return useMemo(() => ({
          // Fade Up
          fadeUp: {
               hidden: { opacity: 0, y: 30 },
               visible: { opacity: 1, y: 0 },
          },

          // Fade Down
          fadeDown: {
               hidden: { opacity: 0, y: -30 },
               visible: { opacity: 1, y: 0 },
          },

          // Fade Left
          fadeLeft: {
               hidden: { opacity: 0, x: -30 },
               visible: { opacity: 1, x: 0 },
          },

          // Fade Right
          fadeRight: {
               hidden: { opacity: 0, x: 30 },
               visible: { opacity: 1, x: 0 },
          },

          // Fade In
          fadeIn: {
               hidden: { opacity: 0 },
               visible: { opacity: 1 },
          },

          // Scale In
          scaleIn: {
               hidden: { opacity: 0, scale: 0.92 },
               visible: { opacity: 1, scale: 1 },
          },

          // Scale Out
          scaleOut: {
               initial: { opacity: 1, scale: 1 },
               animate: { opacity: 0, scale: 0.92 },
          },

          // Stagger Container
          stagger: {
               visible: {
                    transition: { staggerChildren: getStaggerDelay(0.08) },
               },
          },

          // Stagger Item
          staggerItem: {
               hidden: { opacity: 0, y: 20 },
               visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', ...springs.smooth },
               },
          },

          // Hover Lift
          hoverLift: {
               initial: { y: 0 },
               hover: {
                    y: -8,
                    transition: { type: 'spring', ...springs.snappy },
               },
          },

          // Hover Scale
          hoverScale: {
               initial: { scale: 1 },
               hover: {
                    scale: 1.02,
                    transition: { type: 'spring', ...springs.smooth },
               },
          },

          // Tap Effect
          tapEffect: {
               initial: { scale: 1 },
               tap: { scale: 0.96 },
               whileTap: { scale: 0.96 },
               whileHover: { scale: 1.02 },
          },

          // Pulse
          pulse: {
               initial: { scale: 1 },
               animate: shouldInfiniteAnimate() ? {
                    scale: [1, 1.05, 1],
                    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
               } : {},
          },

          // Float
          float: {
               initial: { y: 0 },
               animate: shouldInfiniteAnimate() ? {
                    y: [-10, 0, -10],
                    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
               } : {},
          },

          // Blur In
          blurIn: {
               hidden: { opacity: 0, filter: 'blur(10px)' },
               visible: {
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
               },
          },

          // Shine
          shine: {
               initial: { left: '-100%' },
               animate: shouldInfiniteAnimate() ? {
                    left: '100%',
                    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
               } : {},
          },

          // Pop
          pop: {
               initial: { scale: 0 },
               animate: {
                    scale: [0, 1.1, 1],
                    transition: { type: 'spring', ...springs.bouncy },
               },
          },

          // Slide Up Sheet
          slideUpSheet: {
               initial: { y: '100%' },
               animate: {
                    y: 0,
                    transition: { type: 'spring', ...springs.sheet },
               },
               exit: {
                    y: '100%',
                    transition: { type: 'spring', ...springs.sheet },
               },
          },

          // Scale Modal
          scaleModal: {
               initial: { opacity: 0, scale: 0.9 },
               animate: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', ...springs.modal },
               },
               exit: {
                    opacity: 0,
                    scale: 0.9,
                    transition: { type: 'spring', ...springs.modal },
               },
          },
     }), []);
}

// Custom hook for animation config (useMemo-safe)
export function useAnimationConfig() {
     return useMemo(() => ({
          fastSpring: { type: 'spring', ...springs.snappy },
          smoothSpring: { type: 'spring', ...springs.smooth },
          gentleSpring: { type: 'spring', ...springs.gentle },
          bouncySpring: { type: 'spring', ...springs.bouncy },
          molassesSpring: { type: 'spring', ...springs.molasses },
          easeIn: { ease: [0.4, 0, 1, 1] },
          easeOut: { ease: [0, 0, 0.2, 1] },
          easeInOut: { ease: [0.4, 0, 0.2, 1] },
          backEase: { ease: [0.34, 1.56, 0.64, 1] },
     }), []);
}

// Custom hook for stagger delays (useMemo-safe)
export function useStaggerDelays() {
     return useMemo(() => ({
          fast: 0.08,
          medium: 0.1,
          slow: 0.12,
     }), []);
}

// Custom hook for animation delays (useMemo-safe)
export function useAnimationDelays() {
     return useMemo(() => ({
          none: 0,
          fast: 0.1,
          medium: 0.2,
          slow: 0.3,
          verySlow: 0.5,
     }), []);
}

// Custom hook for animation budget (useMemo-safe)
export function useAnimationBudget() {
     return useMemo(() => getAnimationBudget(), []);
}

// Custom hook for performance tier (useMemo-safe)
export function usePerformanceTier() {
     return useMemo(() => getPerformanceTier(), []);
}

// Custom hook for checking if animations should be used
export function useShouldAnimate() {
     return useMemo(() => shouldUseFramerMotion(), []);
}

// Custom hook for checking if infinite animations should be used
export function useShouldInfiniteAnimate() {
     return useMemo(() => shouldInfiniteAnimate(), []);
}

// Custom hook for checking if parallax should be used
export function useShouldParallax() {
     return useMemo(() => shouldParallax(), []);
}

// Custom hook for checking if backdrop-filter should be used
export function useShouldBlur() {
     return useMemo(() => shouldBlur(), []);
}

// Export everything
export default {
     springs,
     variants,
     animationConfig,
     staggerDelays,
     animationDelays,
     useAnimationVariants,
     useAnimationConfig,
     useStaggerDelays,
     useAnimationDelays,
     useAnimationBudget,
     usePerformanceTier,
     useShouldAnimate,
     useShouldInfiniteAnimate,
     useShouldParallax,
     useShouldBlur,
};
