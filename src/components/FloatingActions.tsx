import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {/* Shopee Button */}
      <a
        href="https://shopee.co.id"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-action w-14 h-14 bg-[#EE4D2D] text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/20 group relative"
      >
        <ShoppingBag size={24} />
        <span className="motion-standard absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
          Order via Shopee
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/6285240174510?text=Halo%2C%20saya%20ingin%20bertanya%20apakah%20makanan%20ini%20masih%20tersedia%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-action w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 group relative"
      >
        <MessageCircle size={24} />
        <span className="motion-standard absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
          Chat with Us
        </span>
      </a>
    </div>
  );
}
