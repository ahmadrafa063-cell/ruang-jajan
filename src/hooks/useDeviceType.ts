/**
 * useDeviceType Hook
 * 
 * Detects device type and returns appropriate configuration.
 * 
 * Features:
 * - Detects mobile, tablet, desktop
 * - Detects iOS, Android, desktop
 * - Detects touch vs mouse
 * - Detects performance tier
 * - Updates on resize
 * 
 * Usage:
 * const { deviceType, platform, isTouch, isLowEnd } = useDeviceType();
 */

import { useEffect, useState } from 'react';
import {
     isTouchDevice,
     isMobile,
     isTablet,
     isDesktopSize,
     isIOS,
     isAndroid,
     isLowEndDevice,
     isHighEndDevice,
     prefersReducedMotion,
     hasSafeArea,
     hasMomentumScroll,
} from '../lib/deviceDetect';

// Device type enum
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type Platform = 'ios' | 'android' | 'desktop' | 'unknown';

// Hook return type
export interface UseDeviceTypeReturn {
     deviceType: DeviceType;
     platform: Platform;
     isTouch: boolean;
     isMouse: boolean;
     isLowEnd: boolean;
     isHighEnd: boolean;
     isIOS: boolean;
     isAndroid: boolean;
     isDesktop: boolean;
     isMobile: boolean;
     isTablet: boolean;
     hasSafeArea: boolean;
     hasMomentumScroll: boolean;
     prefersReducedMotion: boolean;
     windowWidth: number;
     windowHeight: number;
}

// Main hook
export function useDeviceType(): UseDeviceTypeReturn {
     // State
     const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
     const [platform, setPlatform] = useState<Platform>('unknown');
     const [isTouch, setIsTouch] = useState(false);
     const [isMouse, setIsMouse] = useState(false);
     const [isLowEnd, setIsLowEnd] = useState(false);
     const [isHighEnd, setIsHighEnd] = useState(false);
     const [isIOSDevice, setIsIOS] = useState(false);
     const [isAndroidDevice, setIsAndroid] = useState(false);
     const [isDesktop, setIsDesktop] = useState(false);
     const [isMobileDevice, setIsMobile] = useState(false);
     const [isTabletDevice, setIsTablet] = useState(false);
     const [hasSafeAreaValue, setHasSafeArea] = useState(false);
     const [hasMomentumScrollValue, setHasMomentumScroll] = useState(false);
     const [prefersReducedMotionValue, setPrefersReducedMotion] = useState(false);
     const [windowWidth, setWindowWidth] = useState(0);
     const [windowHeight, setWindowHeight] = useState(0);

     // Update device info
     const updateDeviceInfo = () => {
          // Device type
          if (isMobile()) {
               setDeviceType('mobile');
          } else if (isTablet()) {
               setDeviceType('tablet');
          } else {
               setDeviceType('desktop');
          }

          // Platform
          if (isIOS()) {
               setPlatform('ios');
          } else if (isAndroid()) {
               setPlatform('android');
          } else {
               setPlatform('desktop');
          }

          // Touch vs mouse
          const touch = isTouchDevice();
          setIsTouch(touch);
          setIsMouse(!touch);

          // Performance tier
          const lowEnd = isLowEndDevice();
          setIsLowEnd(lowEnd);
          setIsHighEnd(!lowEnd);

          // Platform detection
          setIsIOS(isIOS());
          setIsAndroid(isAndroid());
          setIsDesktop(!isMobile() && !isTablet());
          setIsMobile(isMobile());
          setIsTablet(isTablet());

          // Safe area
          setHasSafeArea(hasSafeArea());

          // Momentum scroll
          setHasMomentumScroll(hasMomentumScroll());

          // Reduced motion
          setPrefersReducedMotion(prefersReducedMotion());

          // Window size
          setWindowWidth(window.innerWidth);
          setWindowHeight(window.innerHeight);
     };

     // Initial update
     useEffect(() => {
          updateDeviceInfo();
     }, []);

     // Update on resize
     useEffect(() => {
          const handleResize = () => {
               updateDeviceInfo();
          };

          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
     }, []);

     return {
          deviceType,
          platform,
          isTouch,
          isMouse,
          isLowEnd,
          isHighEnd,
          isIOS: isIOSDevice,
          isAndroid: isAndroidDevice,
          isDesktop,
          isMobile: isMobileDevice,
          isTablet: isTabletDevice,
          hasSafeArea: hasSafeAreaValue,
          hasMomentumScroll: hasMomentumScrollValue,
          prefersReducedMotion: prefersReducedMotionValue,
          windowWidth,
          windowHeight,
     };
}

// Hook for specific device type
export function useIsMobile(): boolean {
     const { isMobile } = useDeviceType();
     return isMobile;
}

export function useIsTablet(): boolean {
     const { isTablet } = useDeviceType();
     return isTablet;
}

export function useIsDesktop(): boolean {
     const { isDesktop } = useDeviceType();
     return isDesktop;
}

export function useIsTouch(): boolean {
     const { isTouch } = useDeviceType();
     return isTouch;
}

export function useIsLowEnd(): boolean {
     const { isLowEnd } = useDeviceType();
     return isLowEnd;
}

// Hook for animation configuration based on device
export function useAnimationConfig() {
     const { isLowEnd, prefersReducedMotion, isTouch } = useDeviceType();

     // Get animation config based on device capabilities
     const getAnimationConfig = (preset: string) => {
          // Reduced motion - disable animations
          if (prefersReducedMotion) {
               return { duration: 0 };
          }

          // Low-end device - use CSS transitions
          if (isLowEnd) {
               return { duration: 0.3, ease: 'easeInOut' };
          }

          // High-end device - use spring physics
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

     return {
          getAnimationConfig,
          isLowEnd,
          prefersReducedMotion,
          isTouch,
     };
}

// Export everything
export default {
     useDeviceType,
     useIsMobile,
     useIsTablet,
     useIsDesktop,
     useIsTouch,
     useIsLowEnd,
     useAnimationConfig,
};
