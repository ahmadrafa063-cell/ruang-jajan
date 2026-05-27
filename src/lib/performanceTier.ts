/**
 * Performance Tier Detection System
 * 
 * Detects device capability BEFORE any animation initializes.
 * Caches result in sessionStorage for performance.
 * 
 * Tiers:
 * - 'high': Desktop + iPhone 12+ + Flagship Android
 * - 'mid': iPhone SE + Mid-range Android
 * - 'low': Budget Android, Android 8-9, slow connection
 * 
 * Animation Budget (max simultaneous animations):
 * - High: 6 animations
 * - Mid: 4 animations
 * - Low: 2 animations (CSS transitions only)
 */

// Performance tier type
export type PerformanceTier = 'high' | 'mid' | 'low';

// Animation budget per tier
export interface AnimationBudget {
     maxSimultaneous: number;
     maxInfinite: number;
     useParallax: boolean;
     useBackdropFilter: boolean;
}

// Cache key for sessionStorage
const CACHE_KEY = 'performanceTier';

// Animation budget configuration
export const ANIMATION_BUDGET: Record<PerformanceTier, AnimationBudget> = {
     high: {
          maxSimultaneous: 6,
          maxInfinite: 3,
          useParallax: true,
          useBackdropFilter: true,
     },
     mid: {
          maxSimultaneous: 4,
          maxInfinite: 1,
          useParallax: false,
          useBackdropFilter: false,
     },
     low: {
          maxSimultaneous: 2,
          maxInfinite: 0,
          useParallax: false,
          useBackdropFilter: false,
     },
};

// Get cached performance tier
export function getCachedPerformanceTier(): PerformanceTier | null {
     if (typeof window === 'undefined') return null;

     try {
          const cached = sessionStorage.getItem(CACHE_KEY);
          if (cached) {
               return cached as PerformanceTier;
          }
     } catch (e) {
          // sessionStorage might not be available
     }

     return null;
}

// Set cached performance tier
export function setCachedPerformanceTier(tier: PerformanceTier): void {
     if (typeof window === 'undefined') return;

     try {
          sessionStorage.setItem(CACHE_KEY, tier);
     } catch (e) {
          // sessionStorage might not be available
     }
}

// Detect performance tier
export function detectPerformanceTier(): PerformanceTier {
     if (typeof window === 'undefined') return 'high';

     // Check for reduced motion preference (highest priority)
     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return 'low';
     }

     // Check for data saver mode
     const connection = (navigator as any).connection;
     if (connection && (connection.saveData || connection.effectiveType === 'slow-2g')) {
          return 'low';
     }

     // Check for slow connections
     if (connection && ['slow-2g', '2g', '3g'].includes(connection.effectiveType || '')) {
          return 'low';
     }

     // Check hardware concurrency (CPU cores)
     const cores = navigator.hardwareConcurrency || 4;
     if (cores <= 2) {
          return 'low';
     }
     if (cores <= 4) {
          return 'mid';
     }

     // Check device memory (RAM)
     const deviceMemory = (navigator as any).deviceMemory;
     if (deviceMemory && deviceMemory <= 2) {
          return 'low';
     }
     if (deviceMemory && deviceMemory <= 4) {
          return 'mid';
     }

     // Default to high for desktop and modern devices
     const isMobile = window.innerWidth < 768;
     if (isMobile) {
          return 'mid';
     }

     return 'high';
}

// Get performance tier (with caching)
export function getPerformanceTier(): PerformanceTier {
     const cached = getCachedPerformanceTier();
     if (cached) {
          return cached;
     }

     const tier = detectPerformanceTier();
     setCachedPerformanceTier(tier);

     return tier;
}

// Get animation budget for current tier
export function getAnimationBudget(): AnimationBudget {
     const tier = getPerformanceTier();
     return ANIMATION_BUDGET[tier];
}

// Check if device is high-end
export function isHighEnd(): boolean {
     return getPerformanceTier() === 'high';
}

// Check if device is mid-range
export function isMidRange(): boolean {
     return getPerformanceTier() === 'mid';
}

// Check if device is low-end
export function isLowEnd(): boolean {
     return getPerformanceTier() === 'low';
}

// Get spring config based on performance tier
export function getSpring(preset: string): { stiffness: number; damping: number; mass: number } {
     const tier = getPerformanceTier();

     if (tier === 'high') {
          return {
               snappy: { stiffness: 400, damping: 30, mass: 0.8 },
               smooth: { stiffness: 300, damping: 25, mass: 1 },
               bouncy: { stiffness: 500, damping: 20, mass: 0.7 },
               gentle: { stiffness: 200, damping: 20, mass: 1.2 },
               molasses: { stiffness: 150, damping: 18, mass: 1.5 },
          }[preset as keyof any] || { stiffness: 300, damping: 25, mass: 1 };
     }

     if (tier === 'mid') {
          return {
               snappy: { stiffness: 300, damping: 35, mass: 0.8 },
               smooth: { stiffness: 250, damping: 30, mass: 0.9 },
               bouncy: { stiffness: 350, damping: 25, mass: 0.7 },
               gentle: { stiffness: 200, damping: 25, mass: 1 },
               molasses: { stiffness: 150, damping: 20, mass: 1.2 },
          }[preset as keyof any] || { stiffness: 250, damping: 30, mass: 0.9 };
     }

     // Low tier: simpler springs
     return {
          snappy: { stiffness: 250, damping: 40, mass: 0.8 },
          smooth: { stiffness: 200, damping: 35, mass: 0.9 },
          bouncy: { stiffness: 300, damping: 30, mass: 0.7 },
          gentle: { stiffness: 150, damping: 30, mass: 1 },
          molasses: { stiffness: 120, damping: 25, mass: 1.2 },
     }[preset as keyof any] || { stiffness: 200, damping: 35, mass: 0.9 };
}

// Get animation config based on performance tier
export function getAnimationConfig(preset: string) {
     const tier = getPerformanceTier();

     if (tier === 'low') {
          return { duration: 0.2, ease: 'ease-out' };
     }

     return { type: 'spring', ...getSpring(preset) };
}

// Check if parallax should be enabled
export function shouldParallax(): boolean {
     const tier = getPerformanceTier();
     return tier === 'high';
}

// Check if backdrop-filter should be enabled
export function shouldBlur(): boolean {
     const tier = getPerformanceTier();
     return tier !== 'low';
}

// Check if Framer Motion should be used
export function shouldUseFramerMotion(): boolean {
     const tier = getPerformanceTier();
     return tier !== 'low';
}

// Check if infinite animations should be enabled
export function shouldInfiniteAnimate(): boolean {
     const tier = getPerformanceTier();
     return tier === 'high';
}

// Get stagger delay based on performance tier
export function getStaggerDelay(baseDelay: number = 0.08): number {
     const tier = getPerformanceTier();

     if (tier === 'low') {
          return 0;
     }

     if (tier === 'mid') {
          return baseDelay * 1.5;
     }

     return baseDelay;
}

// Reset performance tier cache (for testing)
export function resetPerformanceTierCache(): void {
     if (typeof window === 'undefined') return;

     try {
          sessionStorage.removeItem(CACHE_KEY);
     } catch (e) {
          // sessionStorage might not be available
     }
}

// Export everything
export default {
     detectPerformanceTier,
     getPerformanceTier,
     getCachedPerformanceTier,
     setCachedPerformanceTier,
     isHighEnd,
     isMidRange,
     isLowEnd,
     getSpring,
     getAnimationConfig,
     shouldParallax,
     shouldBlur,
     shouldInfiniteAnimate,
     getStaggerDelay,
     resetPerformanceTierCache,
     ANIMATION_BUDGET,
     getAnimationBudget,
};
