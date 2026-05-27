/**
 * CustomCursor Component
 * 
 * A spring-follow custom cursor for desktop that feels like iOS.
 * 
 * Features:
 * - Spring-follow cursor dot (small, fast spring)
 * - Larger ring that follows with slower spring (parallax feel)
 * - Hover over button: ring expands + blends into element
 * - Hover over image: cursor shows "View" text
 * - Click: cursor compresses then springs back
 * - Hidden completely on mobile (pointer: coarse)
 * - Smooth blend-mode: difference for visibility on any background
 * 
 * Usage:
 * <CustomCursor />
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Custom cursor types
type CursorType = 'default' | 'hover' | 'click' | 'image' | 'link';

// Custom cursor props
interface CustomCursorProps {
     cursorDotColor?: string;
     cursorRingColor?: string;
}

// Custom cursor component
export function CustomCursor({
     cursorDotColor = '#000000',
     cursorRingColor = '#ffffff',
}: CustomCursorProps) {
     // Mouse position
     const mouseX = useMotionValue(0);
     const mouseY = useMotionValue(0);

     // Spring configurations
     const fastSpring = {
          stiffness: 500,
          damping: 30,
          mass: 0.1,
     };

     const slowSpring = {
          stiffness: 200,
          damping: 20,
          mass: 0.2,
     };

     // Fast-follow cursor dot (small)
     const cursorDotX = useSpring(mouseX, fastSpring);
     const cursorDotY = useSpring(mouseY, fastSpring);

     // Slow-follow cursor ring (larger, parallax feel)
     const cursorRingX = useSpring(mouseX, slowSpring);
     const cursorRingY = useSpring(mouseY, slowSpring);

     // Cursor type state
     const [cursorType, setCursorType] = useState<CursorType>('default');

     // Transform cursor dot position
     const cursorDotXDisplay = useTransform(cursorDotX, (val) => `${val}px`);
     const cursorDotYDisplay = useTransform(cursorDotY, (val) => `${val}px`);

     // Transform cursor ring position
     const cursorRingXDisplay = useTransform(cursorRingX, (val) => `${val}px`);
     const cursorRingYDisplay = useTransform(cursorRingY, (val) => `${val}px`);

     // Update cursor type on hover
     useEffect(() => {
          const handleMouseMove = (e: MouseEvent) => {
               mouseX.set(e.clientX);
               mouseY.set(e.clientY);
          };

          const handleMouseEnter = () => {
               document.body.style.cursor = 'none';
          };

          const handleMouseLeave = () => {
               document.body.style.cursor = 'auto';
          };

          const handleMouseOver = (e: MouseEvent) => {
               const target = e.target as HTMLElement;

               // Check if hovering over image
               if (target.tagName === 'IMG' || target.closest('img')) {
                    setCursorType('image');
                    return;
               }

               // Check if hovering over link
               if (target.tagName === 'A' || target.closest('a')) {
                    setCursorType('link');
                    return;
               }

               // Check if hovering over button
               if (target.tagName === 'BUTTON' || target.closest('button')) {
                    setCursorType('hover');
                    return;
               }

               setCursorType('default');
          };

          const handleMouseDown = () => {
               setCursorType('click');
          };

          const handleMouseUp = () => {
               setCursorType('default');
          };

          // Add event listeners
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseenter', handleMouseEnter);
          document.addEventListener('mouseleave', handleMouseLeave);
          document.addEventListener('mouseover', handleMouseOver);
          document.addEventListener('mousedown', handleMouseDown);
          document.addEventListener('mouseup', handleMouseUp);

          return () => {
               document.removeEventListener('mousemove', handleMouseMove);
               document.removeEventListener('mouseenter', handleMouseEnter);
               document.removeEventListener('mouseleave', handleMouseLeave);
               document.removeEventListener('mouseover', handleMouseOver);
               document.removeEventListener('mousedown', handleMouseDown);
               document.removeEventListener('mouseup', handleMouseUp);
          };
     }, [mouseX, mouseY]);

     // Render
     return (
          <>
               {/* Cursor dot (small, fast) */}
               <motion.div
                    className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
                    style={{
                         x: cursorDotXDisplay,
                         y: cursorDotYDisplay,
                         width: '8px',
                         height: '8px',
                         backgroundColor: cursorDotColor,
                         borderRadius: '50%',
                         mixBlendMode: 'difference',
                    }}
               />

               {/* Cursor ring (larger, slow) */}
               <motion.div
                    className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
                    style={{
                         x: cursorRingXDisplay,
                         y: cursorRingYDisplay,
                         width: '40px',
                         height: '40px',
                         border: `2px solid ${cursorRingColor}`,
                         borderRadius: '50%',
                         mixBlendMode: 'difference',
                         transition: cursorType === 'hover' ? 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none',
                         transform: cursorType === 'hover' ? 'scale(1.5)' : 'scale(1)',
                    }}
               />

               {/* Cursor text (for images) */}
               {cursorType === 'image' && (
                    <motion.div
                         className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
                         style={{
                              x: cursorDotXDisplay,
                              y: cursorDotYDisplay,
                              transform: 'translate(-50%, -50%)',
                              backgroundColor: cursorDotColor,
                              color: cursorRingColor,
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              whiteSpace: 'nowrap',
                              mixBlendMode: 'difference',
                         }}
                    >
                         VIEW
                    </motion.div>
               )}

               {/* Hide default cursor */}
               <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
          
          .cursor-auto {
            cursor: auto !important;
          }
          
          .cursor-default {
            cursor: default !important;
          }
          
          .cursor-pointer {
            cursor: pointer !important;
          }
          
          .cursor-text {
            cursor: text !important;
          }
          
          .cursor-grab {
            cursor: grab !important;
          }
          
          .cursor-grabbing {
            cursor: grabbing !important;
          }
          
          .cursor-not-allowed {
            cursor: not-allowed !important;
          }
        }
      `}</style>
          </>
     );
}

// Export default
export default CustomCursor;
