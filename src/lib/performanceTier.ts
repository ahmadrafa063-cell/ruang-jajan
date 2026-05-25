/**
 * Performance Tier Detection
 * 
 * Detects device capability BEFORE any animation initializes.
 * Caches result in sessionStorage for performance.
 * 
 * Tiers:
 * - 'high': Desktop + iPhone 12+ + Flagship Android
 * - 'mid': iPhone SE + Mid-range Android
 * - 'low': Budget Android, Android 8-9, slow connection
 */

// Performance tier type
export type PerformanceTier = 'high' | 'mid' | 'low';

// Cache key for sessionStorage
const CACHE_KEY = 'performanceTier';

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

     // Check for data saver mode (lowest priority)
     const connection = (navigator as any).connection;
     if (connection && (connection.saveData || connection.effectiveType === 'slow-2g')) {
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
     // Check if it's a mobile device
     const isMobile = window.innerWidth < 768;
     if (isMobile) {
          // Mobile but not low-end - assume mid-tier
          return 'mid';
     }

     // Desktop - high tier
     return 'high';
}

// Get performance tier (with caching)
export function getPerformanceTier(): PerformanceTier {
     // Try to get cached value first
     const cached = getCachedPerformanceTier();
     if (cached) {
          return cached;
     }

     // Detect and cache
     const tier = detectPerformanceTier();
     setCachedPerformanceTier(tier);

     return tier;
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

// Get mobile-specific spring config (simpler, faster)
export function getMobileSpring(preset: string) {
     // Mobile springs are simpler with higher damping (less oscillation = less GPU work)
     const mobileSprings = {
          snappy: { stiffness: 300, damping: 35, mass: 0.8 },
          smooth: { stiffness: 250, damping: 30, mass: 0.9 },
          bouncy: { stiffness: 350, damping: 25, mass: 0.7 },
          gentle: { stiffness: 200, damping: 25, mass: 1 },
          molasses: { stiffness: 150, damping: 20, mass: 1.2 },
     };

     return mobileSprings[preset as keyof typeof mobileSprings] || mobileSprings.smooth;
}

// Get desktop-specific spring config
export function getDesktopSpring(preset: string) {
     // Desktop springs can be more complex
     const desktopSprings = {
          snappy: { stiffness: 400, damping: 30, mass: 0.8 },
          smooth: { stiffness: 300, damping: 25, mass: 1 },
          bouncy: { stiffness: 500, damping: 20, mass: 0.7 },
          gentle: { stiffness: 200, damping: 20, mass: 1.2 },
          molasses: { stiffness: 150, damping: 18, mass: 1.5 },
     };

     return desktopSprings[preset as keyof typeof desktopSprings] || desktopSprings.smooth;
}

// Get spring config based on performance tier
export function getSpring(preset: string): { stiffness: number; damping: number; mass: number } {
     const tier = getPerformanceTier();

     if (tier === 'high') {
          return getDesktopSpring(preset);
     }

     // Mid and low tiers use mobile springs
     return getMobileSpring(preset);
}

// Get animation config based on performance tier
export function getAnimationConfig(preset: string) {
     const tier = getPerformanceTier();

     if (tier === 'low') {
          // Low tier: CSS transitions only, no Framer Motion
          return { duration: 0.3, ease: 'easeInOut' };
     }

     if (tier === 'mid') {
          // Mid tier: simpler springs
          return { type: 'spring', ...getMobileSpring(preset) };
     }

     // High tier: full springs
     return { type: 'spring', ...getDesktopSpring(preset) };
}

// Check if animations should be enabled
export function shouldAnimate(): boolean {
     const tier = getPerformanceTier();

     // Low tier: disable Framer Motion animations
     if (tier === 'low') {
          return false;
     }

     // Check reduced motion
     if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return false;
     }

     return true;
}

// Check if parallax should be enabled
export function shouldParallax(): boolean {
     const tier = getPerformanceTier();

     // Only high-end devices get parallax
     return tier === 'high';
}

// Check if backdrop-filter should be enabled
export function shouldBlur(): boolean {
     const tier = getPerformanceTier();

     // Low and mid tiers: disable backdrop-filter
     return tier === 'high';
}

// Check if infinite animations should be enabled
export function shouldInfiniteAnimate(): boolean {
     const tier = getPerformanceTier();

     // Only high-end devices get infinite animations
     return tier === 'high';
}

// Get stagger delay based on performance tier
export function getStaggerDelay(baseDelay: number = 0.08): number {
     const tier = getPerformanceTier();

     if (tier === 'low') {
          // Low tier: no stagger
          return 0;
     }

     if (tier === 'mid') {
          // Mid tier: slower stagger
          return baseDelay * 1.5;
     }

     // High tier: normal stagger
     return baseDelay;
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
     getMobileSpring,
     getDesktopSpring,
     getSpring,
     getAnimationConfig,
     shouldAnimate,
     shouldParallax,
     shouldBlur,
     shouldInfiniteAnimate,
     getStaggerDelay,
};
