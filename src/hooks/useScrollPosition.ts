/**
 * useScrollPosition Hook
 * 
 * Tracks scroll position for navbar effects and scroll-triggered animations.
 * 
 * Features:
 * - Tracks scroll position
 * - Detects scroll direction
 * - Calculates scroll percentage
 * - Debounced updates for performance
 * 
 * Usage:
 * const { scrollY, scrollDirection, isScrolled } = useScrollPosition();
 */

import { useEffect, useState, useRef } from 'react';

// Hook return type
export interface UseScrollPositionReturn {
     scrollY: number;
     scrollX: number;
     scrollDirection: 'up' | 'down' | 'none';
     isScrolled: boolean;
     scrollPercentage: number;
     scrollDelta: number;
     lastScrollY: number;
}

// Main hook
export function useScrollPosition(
     throttle: number = 16 // 60fps default
): UseScrollPositionReturn {
     // State
     const [scrollY, setScrollY] = useState(0);
     const [scrollX, setScrollX] = useState(0);
     const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
     const [isScrolled, setIsScrolled] = useState(false);
     const [scrollPercentage, setScrollPercentage] = useState(0);
     const [scrollDelta, setScrollDelta] = useState(0);
     const [lastScrollY, setLastScrollY] = useState(0);

     // Refs
     const lastScrollYRef = useRef(0);
     const lastScrollTimeRef = useRef(0);
     const requestAnimationFrameRef = useRef<number | null>(null);

     // Update scroll position
     const updateScrollPosition = () => {
          const currentScrollY = window.scrollY;
          const currentScrollX = window.scrollX;
          const now = Date.now();

          // Calculate scroll delta
          const delta = currentScrollY - lastScrollYRef.current;
          setScrollDelta(delta);

          // Calculate scroll direction
          let direction: 'up' | 'down' | 'none' = 'none';
          if (delta > 10) {
               direction = 'down';
          } else if (delta < -10) {
               direction = 'up';
          }
          setScrollDirection(direction);

          // Calculate scroll percentage
          const documentHeight = document.documentElement.scrollHeight;
          const viewportHeight = window.innerHeight;
          const maxScroll = documentHeight - viewportHeight;
          const percentage = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
          setScrollPercentage(percentage);

          // Update state
          setScrollY(currentScrollY);
          setScrollX(currentScrollX);
          setIsScrolled(currentScrollY > 0);
          setLastScrollY(currentScrollY);

          // Update refs
          lastScrollYRef.current = currentScrollY;
          lastScrollTimeRef.current = now;
     };

     // Throttled scroll handler
     const throttledScrollHandler = () => {
          const now = Date.now();
          const timeSinceLastUpdate = now - lastScrollTimeRef.current;

          if (timeSinceLastUpdate >= throttle) {
               updateScrollPosition();
          } else {
               // Schedule update if we're close to the throttle threshold
               if (requestAnimationFrameRef.current) {
                    cancelAnimationFrame(requestAnimationFrameRef.current);
               }
               requestAnimationFrameRef.current = requestAnimationFrame(() => {
                    updateScrollPosition();
               });
          }
     };

     // Initial update
     useEffect(() => {
          updateScrollPosition();
     }, []);

     // Scroll event listener
     useEffect(() => {
          window.addEventListener('scroll', throttledScrollHandler, { passive: true });

          return () => {
               window.removeEventListener('scroll', throttledScrollHandler);
               if (requestAnimationFrameRef.current) {
                    cancelAnimationFrame(requestAnimationFrameRef.current);
               }
          };
     }, [throttle]);

     return {
          scrollY,
          scrollX,
          scrollDirection,
          isScrolled,
          scrollPercentage,
          scrollDelta,
          lastScrollY,
     };
}

// Hook for navbar state
export function useNavbarState(threshold: number = 20) {
     const { scrollY, scrollDirection, isScrolled } = useScrollPosition();

     // Navbar state
     const isSticky = scrollY > threshold;
     const isHidden = scrollDirection === 'down' && isScrolled;
     const isVisible = scrollDirection === 'up' || !isScrolled;

     return {
          isSticky,
          isHidden,
          isVisible,
          scrollY,
          scrollDirection,
          isScrolled,
     };
}

// Hook for scroll progress
export function useScrollProgress() {
     const { scrollPercentage } = useScrollPosition();

     return {
          scrollPercentage,
     };
}

// Hook for scroll-to-top button
export function useScrollToTop(threshold: number = 300) {
     const { scrollY } = useScrollPosition();
     const [isVisible, setIsVisible] = useState(false);

     useEffect(() => {
          setIsVisible(scrollY > threshold);
     }, [scrollY, threshold]);

     const scrollToTop = () => {
          window.scrollTo({
               top: 0,
               behavior: 'smooth',
          });
     };

     return {
          isVisible,
          scrollToTop,
     };
}

// Hook for scroll-triggered animations
export function useScrollTrigger(threshold: number = 100) {
     const { scrollY } = useScrollPosition();
     const [triggered, setTriggered] = useState(false);

     useEffect(() => {
          if (scrollY > threshold) {
               setTriggered(true);
          }
     }, [scrollY, threshold]);

     return triggered;
}

// Export everything
export default {
     useScrollPosition,
     useNavbarState,
     useScrollProgress,
     useScrollToTop,
     useScrollTrigger,
};
