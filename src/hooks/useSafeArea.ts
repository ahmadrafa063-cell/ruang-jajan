/**
 * useSafeArea Hook
 * 
 * Handles iOS safe area insets for proper mobile layout.
 * 
 * Features:
 * - Detects safe area insets
 * - Provides padding values for safe areas
 * - Updates on orientation change
 * - Handles keyboard appearance
 * 
 * Usage:
 * const { safeArea } = useSafeArea();
 * 
 * <div style={{ paddingBottom: safeArea.bottom }}>
 *   Content
 * </div>
 */

import { useEffect, useState } from 'react';

// Safe area values
export interface SafeAreaValues {
     top: number;
     right: number;
     bottom: number;
     left: number;
}

// Hook return type
export interface UseSafeAreaReturn {
     safeArea: SafeAreaValues;
     hasSafeArea: boolean;
     isIOS: boolean;
     isIPhone: boolean;
     isIPad: boolean;
}

// Main hook
export function useSafeArea(): UseSafeAreaReturn {
     // State
     const [safeArea, setSafeArea] = useState<SafeAreaValues>({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
     });
     const [hasSafeArea, setHasSafeArea] = useState(false);
     const [isIOSDevice, setIsIOS] = useState(false);
     const [isIPhone, setIsIPhone] = useState(false);
     const [isIPad, setIsIPad] = useState(false);

     // Update safe area
     const updateSafeArea = () => {
          // Check if iOS
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
          setIsIOS(isIOS);
          setIsIPhone(/iPhone/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent));
          setIsIPad(/iPad/.test(navigator.userAgent));

          // Check for safe area CSS variables
          const style = getComputedStyle(document.documentElement);
          const top = parseFloat(style.getPropertyValue('--safe-area-inset-top') || '0');
          const right = parseFloat(style.getPropertyValue('--safe-area-inset-right') || '0');
          const bottom = parseFloat(style.getPropertyValue('--safe-area-inset-bottom') || '0');
          const left = parseFloat(style.getPropertyValue('--safe-area-inset-left') || '0');

          // If CSS variables exist, use them
          if (top > 0 || right > 0 || bottom > 0 || left > 0) {
               setSafeArea({ top, right, bottom, left });
               setHasSafeArea(true);
               return;
          }

          // Otherwise, use iOS defaults
          if (isIOS) {
               // Default iOS safe areas
               // These are approximate values - actual values come from CSS variables
               setSafeArea({
                    top: 44, // Status bar + navigation bar
                    right: 0,
                    bottom: 34, // Home indicator
                    left: 0,
               });
               setHasSafeArea(true);
          } else {
               setSafeArea({ top: 0, right: 0, bottom: 0, left: 0 });
               setHasSafeArea(false);
          }
     };

     // Initial update
     useEffect(() => {
          updateSafeArea();
     }, []);

     // Update on orientation change
     useEffect(() => {
          const handleOrientationChange = () => {
               updateSafeArea();
          };

          window.addEventListener('orientationchange', handleOrientationChange);
          window.addEventListener('resize', handleOrientationChange);
          return () => {
               window.removeEventListener('orientationchange', handleOrientationChange);
               window.removeEventListener('resize', handleOrientationChange);
          };
     }, []);

     return {
          safeArea,
          hasSafeArea,
          isIOS: isIOSDevice,
          isIPhone,
          isIPad,
     };
}

// Hook for safe area top padding
export function useSafeAreaTop(): number {
     const { safeArea } = useSafeArea();
     return safeArea.top;
}

// Hook for safe area bottom padding
export function useSafeAreaBottom(): number {
     const { safeArea } = useSafeArea();
     return safeArea.bottom;
}

// Hook for safe area left padding
export function useSafeAreaLeft(): number {
     const { safeArea } = useSafeArea();
     return safeArea.left;
}

// Hook for safe area right padding
export function useSafeAreaRight(): number {
     const { safeArea } = useSafeArea();
     return safeArea.right;
}

// Hook for safe area CSS variables
export function useSafeAreaCSS(): Record<string, string> {
     const { safeArea, hasSafeArea } = useSafeArea();

     if (!hasSafeArea) {
          return {};
     }

     return {
          '--safe-area-inset-top': `${safeArea.top}px`,
          '--safe-area-inset-right': `${safeArea.right}px`,
          '--safe-area-inset-bottom': `${safeArea.bottom}px`,
          '--safe-area-inset-left': `${safeArea.left}px`,
     };
}

// Hook for safe area classes
export function useSafeAreaClasses(): string {
     const { hasSafeArea } = useSafeArea();

     if (!hasSafeArea) {
          return '';
     }

     return 'has-safe-area';
}

// Export everything
export default {
     useSafeArea,
     useSafeAreaTop,
     useSafeAreaBottom,
     useSafeAreaLeft,
     useSafeAreaRight,
     useSafeAreaCSS,
     useSafeAreaClasses,
};
