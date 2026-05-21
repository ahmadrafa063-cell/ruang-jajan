import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import { Separator } from './ui/separator';
import { BrandMark } from './BrandMark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <BrandMark className="shadow-lg shadow-primary/20" />
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Ruang<span className="text-primary italic">Jajan</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Premium food delivery service bringing gourmet meals from local kitchens to your doorstep. Experience the dash of deliciousness.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/raurapq/" target="_blank" rel="noopener noreferrer" className="icon-action w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white shadow-sm">
              <Instagram size={20} />
            </a>
            <a href="https://web.facebook.com/ahmad.rafa.9026040" target="_blank" rel="noopener noreferrer" className="icon-action w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white shadow-sm">
              <Facebook size={20} />
            </a>
          </div>
        </div>



        {/* Contact */}
        <div>
          <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <a href="tel:+6285240174510" className="motion-standard text-sm text-slate-500 font-semibold hover:text-primary">+62 852 4017 4510</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <a href="mailto:ahmadrafa063@gmail.com" className="motion-standard text-sm text-slate-500 font-semibold hover:text-primary">ahmadrafa063@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="text-sm text-slate-500 mb-4 font-medium">Subscribe to get special offers and menu updates.</p>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-hidden"
            />
            <button className="pressable-action bg-slate-900 text-white rounded-xl px-4 py-3 text-sm font-bold hover:bg-slate-800 shadow-lg shadow-slate-200">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <Separator className="mb-8 bg-slate-100" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-6">
          <span>© {currentYear} RUANGJAJAN STARTUP</span>
          <a href="#" className="motion-standard hover:text-primary font-bold uppercase tracking-widest text-[9px]">Terms of Service</a>
          <a href="#" className="motion-standard hover:text-primary font-bold uppercase tracking-widest text-[9px]">Privacy Policy</a>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              <span className="uppercase tracking-[0.2em] text-[9px]">Premium Delivery Hub</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
