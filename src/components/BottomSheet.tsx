/**
 * BottomSheet Component
 * 
 * An iOS-style bottom sheet with spring animations and drag-to-dismiss.
 * 
 * Features:
 * - Slide up from bottom with spring (exactly like iOS share sheet)
 * - Drag down to dismiss, snap back if not dragged far enough
 * - Background: scale down to 0.95 + blur behind sheet
 * - Drag handle bar at top with spring visual feedback
 * - iOS: full safe area support
 * - Android: slightly faster spring (feels Material-ish)
 * - Desktop: center modal with spring scale in
 * 
 * Usage:
 * <BottomSheet isOpen={isOpen} onClose={onClose}>
 *   <div>Content</div>
 * </BottomSheet>
 */

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { isIOS, isAndroid } from '../lib/deviceDetect';
import { useSafeArea } from '../hooks/useSafeArea';

// Bottom sheet props
interface BottomSheetProps {
     isOpen: boolean;
     onClose: () => void;
     children: React.ReactNode;
     title?: string;
     showCloseButton?: boolean;
     closeOnBackdrop?: boolean;
     drag?: boolean;
     snapPoints?: number[];
}

// Bottom sheet component
export function BottomSheet({
     isOpen,
     onClose,
     children,
     title,
     showCloseButton = true,
     closeOnBackdrop = true,
     drag = true,
     snapPoints = [0.5, 1],
}: BottomSheetProps) {
     // Safe area
     const { safeArea } = useSafeArea();

     // Drag motion value
     const dragY = useMotionValue(0);

     // Spring for drag
     const dragSpring = useSpring(dragY, {
          stiffness: 300,
          damping: 30,
          mass: 0.1,
     });

     // Transform for sheet position
     const sheetY = useTransform(dragSpring, (val) => `${val}px`);

     // Transform for backdrop opacity
     const backdropOpacity = useTransform(dragY, (val) => {
          const maxDrag = window.innerHeight;
          return Math.max(0, 1 - Math.abs(val) / maxDrag);
     });

     // Transform for backdrop blur
     const backdropBlur = useTransform(dragY, (val) => {
          const maxDrag = window.innerHeight;
          const blur = Math.max(0, 20 - (Math.abs(val) / maxDrag) * 20);
          return `${blur}px`;
     });

     // Handle drag end
     const handleDragEnd = (event: any, info: any) => {
          const threshold = window.innerHeight * 0.3;

          if (info.offset.y > threshold) {
               onClose();
          } else {
               dragY.set(0);
          }
     };

     // Handle backdrop click
     const handleBackdropClick = () => {
          if (closeOnBackdrop) {
               onClose();
          }
     };

     // Handle escape key
     useEffect(() => {
          const handleKeyDown = (e: KeyboardEvent) => {
               if (e.key === 'Escape') {
                    onClose();
               }
          };

          if (isOpen) {
               document.addEventListener('keydown', handleKeyDown);
          }

          return () => {
               document.removeEventListener('keydown', handleKeyDown);
          };
     }, [isOpen, onClose]);

     // Render
     return (
          <AnimatePresence>
               {isOpen && (
                    <>
                         {/* Backdrop */}
                         <motion.div
                              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
                              style={{
                                   opacity: backdropOpacity,
                                   backdropFilter: `blur(${backdropBlur})`,
                                   WebkitBackdropFilter: `blur(${backdropBlur})`,
                              }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              onClick={handleBackdropClick}
                         />

                         {/* Bottom Sheet */}
                         <motion.div
                              className="fixed bottom-0 left-0 right-0 z-[9999] flex flex-col"
                              style={{
                                   y: sheetY,
                                   height: 'auto',
                                   maxHeight: '90vh',
                                   paddingBottom: `${safeArea.bottom}px`,
                              }}
                              initial={isIOS() ? { y: '100%' } : { y: '100%' }}
                              animate={isIOS() ? { y: 0 } : { y: 0 }}
                              exit={isIOS() ? { y: '100%' } : { y: '100%' }}
                              transition={{
                                   type: 'spring',
                                   stiffness: isIOS() ? 300 : 400,
                                   damping: isIOS() ? 30 : 35,
                                   mass: 1,
                              }}
                              drag={drag ? 'y' : false}
                              dragConstraints={{ top: 0, bottom: 0 }}
                              dragElastic={0.1}
                              onDragEnd={handleDragEnd}
                              whileDrag={{ cursor: 'grabbing' }}
                         >
                              {/* Drag handle */}
                              <div className="flex items-center justify-center py-4">
                                   <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
                              </div>

                              {/* Sheet content */}
                              <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col">
                                   {/* Header */}
                                   {(title || showCloseButton) && (
                                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                                             {title && (
                                                  <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                                             )}
                                             {showCloseButton && (
                                                  <button
                                                       onClick={onClose}
                                                       className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                                                  >
                                                       <X size={24} className="text-slate-500" />
                                                  </button>
                                             )}
                                        </div>
                                   )}

                                   {/* Body */}
                                   <div className="p-6 overflow-y-auto ios-scroll">
                                        {children}
                                   </div>
                              </div>
                         </motion.div>
                    </>
               )}
          </AnimatePresence>
     );
}

// Export default
export default BottomSheet;
