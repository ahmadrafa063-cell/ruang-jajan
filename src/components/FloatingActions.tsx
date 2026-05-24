import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export function FloatingActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-3"
    >
      {/* Shopee Button */}
      <motion.a
        href="https://shopee.co.id"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="icon-action w-14 h-14 bg-[#EE4D2D] text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/20 group relative"
      >
        <ShoppingBag size={24} />
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap pointer-events-none z-50"
        >
          Order via Shopee
        </motion.span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/6282254707788?text=Halo%2C%20saya%20ingin%20bertanya%20apakah%20makanan%20ini%20masih%20tersedia%3F"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="icon-action w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 group relative"
      >
        <MessageCircle size={24} />
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap pointer-events-none z-50"
        >
          Chat with Us
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
