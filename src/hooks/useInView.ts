/**
 * useInView Hook
 * 
 * A lightweight IntersectionObserver hook for scroll-triggered animations.
 * 
 * Features:
 * - Detects when elements enter viewport
 * - Configurable threshold
 * - Handles multiple elements with stagger
 * - Performance optimized with requestAnimationFrame
 * 
 * Usage:
 * const [ref, inView] = useInView({ threshold: 0.1 });
 * 
 * <motion.div
 *   initial="hidden"
 *   whileInView="visible"
 *   viewport={{ once: true }}
 * >
 *   <div ref={ref}>Content</div>
 * </motion.div>
 */

import { useEffect, useRef, useState, RefObject } from 'react';

// Default configuration
export interface UseInViewOptions {
     threshold?: number | number[];
     root?: Element | null;
     rootMargin?: string;
     once?: boolean;
     triggerOnce?: boolean;
}

// Intersection observer options
const defaultOptions: UseInViewOptions = {
     threshold: 0.1,
     root: null,
     rootMargin: '0px',
     once: false,
     triggerOnce: true,
};

// Hook return type
export interface UseInViewReturn {
     ref: RefObject<HTMLElement>;
     inView: boolean;
     entry?: IntersectionObserverEntry;
}

// Main hook
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
     const { threshold, root, rootMargin, once, triggerOnce } = {
          ...defaultOptions,
          ...options,
     };

     const [inView, setInView] = useState(false);
     const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
     const ref = useRef<HTMLElement>(null);
     const observerRef = useRef<IntersectionObserver | null>(null);
     const seenRef = useRef(false);

     useEffect(() => {
          const element = ref.current;
          if (!element) return;

          // Don't create observer if element is already visible
          const elementIsVisible = element.getBoundingClientRect().height > 0;
          if (!elementIsVisible) {
               return;
          }

          // Create observer
          const observerCallback = (entries: IntersectionObserverEntry[]) => {
               entries.forEach((entry) => {
                    const isVisible = entry.isIntersecting;

                    // Update state
                    setEntry(entry);

                    if (isVisible) {
                         if (triggerOnce && seenRef.current) return;

                         setInView(true);
                         seenRef.current = true;
                    } else if (!once) {
                         setInView(false);
                         seenRef.current = false;
                    }
               });
          };

          observerRef.current = new IntersectionObserver(observerCallback, {
               threshold,
               root,
               rootMargin,
          });

          observerRef.current.observe(element);

          // Cleanup
          return () => {
               if (observerRef.current) {
                    observerRef.current.disconnect();
               }
          };
     }, [threshold, root, rootMargin, once, triggerOnce]);

     return { ref, inView, entry };
}

// Hook for stagger children
export function useStaggerInView(
     index: number,
     total: number,
     options: UseInViewOptions = {}
) {
     const { ref, inView } = useInView(options);

     // Calculate stagger delay based on index
     const delay = index * 0.08; // 80ms per item

     return { ref, inView, delay };
}

// Hook for scroll progress
export function useScrollProgress(): {
     ref: RefObject<HTMLElement>;
     progress: number;
} {
     const [progress, setProgress] = useState(0);
     const ref = useRef<HTMLElement>(null);

     useEffect(() => {
          const element = ref.current;
          if (!element) return;

          const handleScroll = () => {
               const rect = element.getBoundingClientRect();
               const viewportHeight = window.innerHeight;

               // Calculate scroll progress
               const elementTop = rect.top;
               const elementHeight = rect.height;

               // Total scrollable distance
               const scrollDistance = elementHeight - viewportHeight;

               // Current position relative to viewport
               const position = -elementTop;

               // Calculate percentage
               const percentage = Math.min(
                    Math.max(position / scrollDistance, 0),
                    1
               );

               setProgress(percentage);
          };

          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll(); // Initial calculation

          return () => {
               window.removeEventListener('scroll', handleScroll);
          };
     }, []);

     return { ref, progress };
}

// Hook for parallax effect
export function useParallax(
     speed: number = 0.5,
     options: UseInViewOptions = {}
) {
     const { ref, inView } = useInView(options);
     const [offset, setOffset] = useState(0);

     useEffect(() => {
          const handleScroll = () => {
               const rect = ref.current?.getBoundingClientRect();
               if (!rect) return;

               // Calculate offset based on scroll position
               const viewportHeight = window.innerHeight;
               const elementCenter = rect.top + rect.height / 2;
               const distanceFromCenter = elementCenter - viewportHeight / 2;

               // Apply parallax speed
               setOffset(distanceFromCenter * speed);
          };

          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll(); // Initial calculation

          return () => {
               window.removeEventListener('scroll', handleScroll);
          };
     }, [speed]);

     return { ref, offset, inView };
}

// Hook for fade-in on scroll
export function useFadeInOnScroll(
     options: UseInViewOptions = {}
): { ref: RefObject<HTMLElement>; opacity: number } {
     const { ref, inView } = useInView(options);
     const [opacity, setOpacity] = useState(0);

     useEffect(() => {
          if (inView) {
               setOpacity(1);
          } else {
               setOpacity(0);
          }
     }, [inView]);

     return { ref, opacity };
}

// Hook for slide-up on scroll
export function useSlideUpOnScroll(
     options: UseInViewOptions = {}
): { ref: RefObject<HTMLElement>; y: number } {
     const { ref, inView } = useInView(options);
     const [y, setY] = useState(30);

     useEffect(() => {
          if (inView) {
               setY(0);
          } else {
               setY(30);
          }
     }, [inView]);

     return { ref, y };
}

// Hook for scale-in on scroll
export function useScaleInOnScroll(
     options: UseInViewOptions = {}
): { ref: RefObject<HTMLElement>; scale: number } {
     const { ref, inView } = useInView(options);
     const [scale, setScale] = useState(0.92);

     useEffect(() => {
          if (inView) {
               setScale(1);
          } else {
               setScale(0.92);
          }
     }, [inView]);

     return { ref, scale };
}

// Export everything
export default {
     useInView,
     useStaggerInView,
     useScrollProgress,
     useParallax,
     useFadeInOnScroll,
     useSlideUpOnScroll,
     useScaleInOnScroll,
};
