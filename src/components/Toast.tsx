/**
 * Toast Component
 * 
 * An iOS-style toast notification with spring animations.
 * 
 * Features:
 * - Slide down from top with spring + frosted glass background
 * - Mobile: larger touch target, tap anywhere to dismiss
 * - Desktop: smaller, appears top-right
 * - Auto dismiss: 3s then spring slide up + fade
 * - Multiple toasts: stack with spring push down effect
 * - Types: success (green), error (red), info (blue) — each with icon
 * 
 * Usage:
 * const { showToast } = useToast();
 * showToast({ message: 'Success!', type: 'success' });
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { isTouchDevice } from '../lib/deviceDetect';

// Toast types
export type ToastType = 'success' | 'error' | 'info';

// Toast interface
export interface Toast {
     id: string;
     message: string;
     type: ToastType;
     duration?: number;
}

// Toast context
interface ToastContextType {
     showToast: (message: string, type: ToastType, duration?: number) => void;
     removeToast: (id: string) => void;
}

// Toast context
const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Toast provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
     const [toasts, setToasts] = React.useState<Toast[]>([]);

     const showToast = (message: string, type: ToastType, duration: number = 3000) => {
          const id = Math.random().toString(36).substring(2, 9);
          const toast: Toast = { id, message, type, duration };

          setToasts((prev) => [...prev, toast]);

          setTimeout(() => {
               removeToast(id);
          }, duration);
     };

     const removeToast = (id: string) => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id));
     };

     return (
          <ToastContext.Provider value={{ showToast, removeToast }}>
               {children}
               <ToastContainer toasts={toasts} onRemove={removeToast} />
          </ToastContext.Provider>
     );
}

// Toast container
function ToastContainer({
     toasts,
     onRemove,
}: {
     toasts: Toast[];
     onRemove: (id: string) => void;
}) {
     return (
          <div className="fixed top-4 right-4 z-[10000] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
               <AnimatePresence>
                    {toasts.map((toast) => (
                         <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
                    ))}
               </AnimatePresence>
          </div>
     );
}

// Toast item
function ToastItem({
     toast,
     onRemove,
}: {
     toast: Toast;
     onRemove: (id: string) => void;
}) {
     const { message, type, duration } = toast;

     // Toast config
     const config = {
          success: {
               icon: CheckCircle,
               color: 'text-green-600',
               bg: 'bg-green-50',
               border: 'border-green-200',
               shadow: 'shadow-green-200/50',
          },
          error: {
               icon: AlertCircle,
               color: 'text-red-600',
               bg: 'bg-red-50',
               border: 'border-red-200',
               shadow: 'shadow-red-200/50',
          },
          info: {
               icon: Info,
               color: 'text-blue-600',
               bg: 'bg-blue-50',
               border: 'border-blue-200',
               shadow: 'shadow-blue-200/50',
          },
     }[type];

     const Icon = config.icon;

     // Auto dismiss
     useEffect(() => {
          const timer = setTimeout(() => {
               onRemove(toast.id);
          }, duration);

          return () => clearTimeout(timer);
     }, [toast.id, duration, onRemove]);

     // Handle click to dismiss
     const handleClick = () => {
          onRemove(toast.id);
     };

     return (
          <motion.div
               className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border ${config.border} ${config.bg} shadow-lg ${config.shadow}`}
               initial={{ opacity: 0, y: -50, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: -50, scale: 0.9 }}
               transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.5,
               }}
               onClick={handleClick}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
          >
               <Icon size={20} className={config.color} />

               <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{message}</p>
               </div>

               <button
                    onClick={(e) => {
                         e.stopPropagation();
                         onRemove(toast.id);
                    }}
                    className="p-1 rounded-full hover:bg-black/5 transition-colors"
               >
                    <X size={16} className="text-slate-400" />
               </button>
          </motion.div>
     );
}

// Custom hook
export function useToast() {
     const context = React.useContext(ToastContext);
     if (!context) {
          throw new Error('useToast must be used within ToastProvider');
     }
     return context;
}

// Export everything
export default {
     ToastProvider,
     Toast,
     ToastType,
     useToast,
};
