/**
 * iOS-Style Spring Animations Configuration
 * 
 * This file defines spring physics presets and animation variants
 * that make the site feel like an iOS app - buttery smooth and premium.
 * 
 * Key Principles:
 * - Spring physics (stiffness/damping) instead of duration-based
 * - Layered motion with stagger children
 * - Fast in, slow out curves (natural feel)
 * - Transform + opacity only (GPU accelerated)
 * - Performance tier detection for mobile optimization
 */

import { getSpring, getStaggerDelay, shouldAnimate, shouldInfiniteAnimate } from './performanceTier';

// iOS Spring Physics Presets
// Based on Apple's Human Interface Guidelines for spring animations
export const springs = {
     // Snappy - Instant feedback for buttons and small elements
     // Stiffness: 400 (snappy), Damping: 30 (minimal oscillation)
     snappy: getSpring('snappy'),

     // Smooth - Cards, panels, moderate movement
     // Stiffness: 300 (balanced), Damping: 25 (natural feel)
     smooth: getSpring('smooth'),

     // Bouncy - Badges, popups, playful elements
     // Stiffness: 500 (very snappy), Damping: 20 (more bounce)
     bouncy: getSpring('bouncy'),

     // Gentle - Page transitions, large elements
     // Stiffness: 200 (soft), Damping: 20 (gentle movement)
     gentle: getSpring('gentle'),

     // Molasses - Hero sections, large parallax elements
     // Stiffness: 150 (very soft), Damping: 18 (slow, smooth)
     molasses: getSpring('molasses'),

     // iOS Share Sheet style - Slide up from bottom
     sheet: { stiffness: 300, damping: 30, mass: 1 },

     // iOS Modal style - Scale in from center
     modal: { stiffness: 300, damping: 25, mass: 1 },

     // iOS Popover style - Quick, snappy entrance
     popover: { stiffness: 400, damping: 30, mass: 0.8 },
};

// Animation Variants - Reusable animation states
// These follow iOS animation patterns exactly
export const variants = {
     // Fade Up - Elements slide up from below with fade
     // iOS pattern: Content appears from bottom with fade
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
     // iOS signature: Scale + opacity combo
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
     // iOS pattern: Sequential entrance with staggered children
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
     // iOS-inspired: Lift with shadow depth
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
     // iOS pattern: Instant scale 0.96, spring back
     tapEffect: {
          initial: { scale: 1 },
          tap: { scale: 0.96 },
          whileTap: { scale: 0.96 },
          whileHover: { scale: 1.02 },
     },

     // Pulse - Breathing animation for CTAs
     // Only animate on high-end devices
     pulse: {
          initial: { scale: 1 },
          animate: shouldInfiniteAnimate() ? {
               scale: [1, 1.05, 1],
               transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          } : {},
     },

     // Float - Gentle up/down movement
     // iOS pattern: Subtle floating for hero elements
     // Only animate on high-end devices
     float: {
          initial: { y: 0 },
          animate: shouldInfiniteAnimate() ? {
               y: [-10, 0, -10],
               transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          } : {},
     },

     // Blur In - Text starts blurred, becomes sharp
     // iOS pattern: Text clarity animation
     blurIn: {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: {
               opacity: 1,
               filter: 'blur(0px)',
               transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
          },
     },

     // Shine - CTA button shine effect
     // Only animate on high-end devices
     shine: {
          initial: { left: '-100%' },
          animate: shouldInfiniteAnimate() ? {
               left: '100%',
               transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          } : {},
     },

     // Pop - Scale bounce effect
     // iOS pattern: Scale 0 → 1.1 → 1
     pop: {
          initial: { scale: 0 },
          animate: {
               scale: [0, 1.1, 1],
               transition: { type: 'spring', ...springs.bouncy },
          },
     },

     // Slide Up Sheet - Bottom sheet entrance
     // iOS pattern: Slide up from bottom with spring
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
     // iOS pattern: Scale from 0.9 to 1 with fade
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
     // Fast spring - For buttons and small interactions
     fastSpring: { type: 'spring', ...springs.snappy },

     // Smooth spring - For cards and panels
     smoothSpring: { type: 'spring', ...springs.smooth },

     // Gentle spring - For page transitions
     gentleSpring: { type: 'spring', ...springs.gentle },

     // Bouncy spring - For badges and popups
     bouncySpring: { type: 'spring', ...springs.bouncy },

     // Molasses spring - For hero elements
     molassesSpring: { type: 'spring', ...springs.molasses },

     // Ease curves - For non-spring animations
     easeIn: { ease: [0.4, 0, 1, 1] },
     easeOut: { ease: [0, 0, 0.2, 1] },
     easeInOut: { ease: [0.4, 0, 0.2, 1] },
     backEase: { ease: [0.34, 1.56, 0.64, 1] },
};

// Stagger Delays - For sequential animations
export const staggerDelays = {
     // Fast stagger - 8 items in 0.64s
     fast: 0.08,
     // Medium stagger - 10 items in 1s
     medium: 0.1,
     // Slow stagger - 12 items in 1.2s
     slow: 0.12,
};

// Animation Delays - For specific timing needs
export const animationDelays = {
     // No delay - Immediate
     none: 0,
     // Fast - 100ms
     fast: 0.1,
     // Medium - 200ms
     medium: 0.2,
     // Slow - 300ms
     slow: 0.3,
     // Very slow - 500ms
     verySlow: 0.5,
};

// Export everything for easy imports
export default {
     springs,
     variants,
     animationConfig,
     staggerDelays,
     animationDelays,
};
