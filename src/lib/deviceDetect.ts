/**
 * Device Detection Utilities
 * 
 * This file provides device and capability detection for:
 * - Touch vs mouse interaction
 * - iOS vs Android vs Desktop
 * - Low-end vs high-end devices
 * - Reduced motion preferences
 * 
 * These utilities help us deliver the right experience
 * for each platform while maintaining iOS-quality feel.
 */

// Device Type Detection
export const isTouchDevice = (): boolean => {
     if (typeof window === 'undefined') return false;

     // Check for touch events (primary method)
     const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

     // Fallback: check pointer events
     if (!hasTouch && 'PointerEvent' in window) {
          return navigator.maxTouchPoints > 0;
     }

     return hasTouch;
};

export const isMouseDevice = (): boolean => {
     if (typeof window === 'undefined') return true;
     return !isTouchDevice();
};

// Platform Detection
export const isIOS = (): boolean => {
     if (typeof window === 'undefined') return false;

     // Check for iOS devices
     const iDevices = [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
     ];

     // Check user agent
     const userAgent = navigator.userAgent.toLowerCase();
     const isIosUA = /iphone|ipad|ipod/.test(userAgent);

     // Check for iPadOS (iPad without touch)
     const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

     return isIosUA || isIpadOS || iDevices.includes(navigator.platform);
};

export const isAndroid = (): boolean => {
     if (typeof window === 'undefined') return false;

     const userAgent = navigator.userAgent.toLowerCase();
     return /android/.test(userAgent);
};

export const isDesktop = (): boolean => {
     if (typeof window === 'undefined') return false;
     return !isIOS() && !isAndroid();
};

// Screen Size Detection
export const isMobile = (): boolean => {
     if (typeof window === 'undefined') return false;
     return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
     if (typeof window === 'undefined') return false;
     return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktopSize = (): boolean => {
     if (typeof window === 'undefined') return false;
     return window.innerWidth >= 1024;
};

// Performance Tier Detection
export const isLowEndDevice = (): boolean => {
     if (typeof window === 'undefined') return false;

     // Check for reduced motion preference (highest priority)
     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return true;
     }

     // Check hardware concurrency (CPU cores)
     const cores = navigator.hardwareConcurrency || 4;
     if (cores <= 4) {
          return true;
     }

     // Check for data saver mode
     const connection = (navigator as any).connection;
     if (connection && (connection.saveData || connection.effectiveType === 'slow-2g')) {
          return true;
     }

     // Check device memory (low memory devices)
     const deviceMemory = (navigator as any).deviceMemory;
     if (deviceMemory && deviceMemory <= 4) {
          return true;
     }

     return false;
};

export const isHighEndDevice = (): boolean => {
     if (typeof window === 'undefined') return false;
     return !isLowEndDevice();
};

// Browser Detection
export const isSafari = (): boolean => {
     if (typeof window === 'undefined') return false;

     const userAgent = navigator.userAgent.toLowerCase();
     return /safari/.test(userAgent) && !/chrome|android/.test(userAgent);
};

export const isChrome = (): boolean => {
     if (typeof window === 'undefined') return false;
     return /chrome|chromium/.test(navigator.userAgent.toLowerCase());
};

export const isFirefox = (): boolean => {
     if (typeof window === 'undefined') return false;
     return /firefox/.test(navigator.userAgent.toLowerCase());
};

// iOS-Specific Checks
export const isIPad = (): boolean => {
     if (typeof window === 'undefined') return false;

     const userAgent = navigator.userAgent.toLowerCase();
     return /ipad/.test(userAgent) ||
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

export const isIPhone = (): boolean => {
     if (typeof window === 'undefined') return false;

     const userAgent = navigator.userAgent.toLowerCase();
     return /iphone/.test(userAgent) && !/ipad/.test(userAgent);
};

// Safe Area Detection
export const hasSafeArea = (): boolean => {
     if (typeof window === 'undefined') return false;

     // iOS 11+ has safe areas
     const isIOS11Plus = isIOS() && parseFloat(navigator.userAgent.match(/OS (\d+)_/)?.[1] || '0') >= 11;

     // Check for CSS environment variables
     const hasEnv = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') !== '';

     return isIOS11Plus || hasEnv;
};

// Scroll Behavior Detection
export const hasMomentumScroll = (): boolean => {
     if (typeof window === 'undefined') return false;

     // iOS Safari has momentum scrolling
     return isIOS();
};

// Reduced Motion Detection
export const prefersReducedMotion = (): boolean => {
     if (typeof window === 'undefined') return false;
     return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Viewport Height Fix Detection
export const needsViewportHeightFix = (): boolean => {
     if (typeof window === 'undefined') return false;

     // iOS Safari needs viewport height fix
     return isIOS();
};

// Touch Action Support
export const supportsTouchAction = (): boolean => {
     if (typeof window === 'undefined') return false;

     // Check if touch-action CSS is supported
     const div = document.createElement('div');
     return 'touchAction' in div.style || 'webkitTouchAction' in div.style;
};

// Animation Support Detection
export const supportsCSSAnimation = (): boolean => {
     if (typeof window === 'undefined') return false;

     const div = document.createElement('div');
     return 'animation' in div.style || 'webkitAnimation' in div.style;
};

export const supportsCSSFilter = (): boolean => {
     if (typeof window === 'undefined') return false;

     const div = document.createElement('div');
     return 'filter' in div.style || 'webkitFilter' in div.style;
};

// Export all utilities
export default {
     isTouchDevice,
     isMouseDevice,
     isIOS,
     isAndroid,
     isDesktop,
     isMobile,
     isTablet,
     isDesktopSize,
     isLowEndDevice,
     isHighEndDevice,
     isSafari,
     isChrome,
     isFirefox,
     isIPad,
     isIPhone,
     hasSafeArea,
     hasMomentumScroll,
     prefersReducedMotion,
     needsViewportHeightFix,
     supportsTouchAction,
     supportsCSSAnimation,
     supportsCSSFilter,
};
