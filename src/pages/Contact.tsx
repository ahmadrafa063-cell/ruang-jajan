import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function Contact() {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3, ease: "easeOut" }}
         className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-slate-50"
      >
         <div className="max-w-6xl mx-auto space-y-20">
            {/* Header */}
            <section className="text-center space-y-6">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full w-fit uppercase tracking-wider mx-auto"
               >
                  Hubungi Kami
               </motion.div>
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className="text-5xl md:text-7xl font-black text-slate-900 leading-tight"
               >
                  Kami Selalu <span className="text-primary italic">Mendengar</span>.
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className="text-lg text-slate-500 max-w-xl mx-auto font-medium"
               >
                  Punya pertanyaan, masukan, atau hanya ingin berbicara tentang kuliner? Tim kami siap melayani Anda dengan sentuhan premium.
               </motion.p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Contact Info */}
               <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">Saluran Langsung</h2>

                     <div className="space-y-6">
                        <a href="mailto:hello@ruangjajan.id" className="soft-hover-action flex items-center gap-6 rounded-2xl group">
                           <div className="motion-standard w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white">
                              <Mail size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Email Kami</p>
                              <p className="motion-standard text-xl font-bold text-slate-900 group-hover:text-primary">hello@ruangjajan.id</p>
                           </div>
                        </a>

                        <a href="tel:+6282254707788" className="soft-hover-action flex items-center gap-6 rounded-2xl group">
                           <div className="motion-standard w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white">
                              <Phone size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Layanan Telepon</p>
                              <p className="motion-standard text-xl font-bold text-slate-900 group-hover:text-primary">+62 822 5470 7788</p>
                           </div>
                        </a>

                        <a href="https://wa.me/6282254707788" target="_blank" rel="noopener noreferrer" className="soft-hover-action flex items-center gap-6 rounded-2xl group">
                           <div className="motion-standard w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-[#25D366] group-hover:text-white">
                              <MessageCircle size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">WhatsApp Saja</p>
                              <p className="motion-standard text-xl font-bold text-slate-900 group-hover:text-primary">+62 822 5470 7788</p>
                           </div>
                        </a>

                        <div className="flex items-center gap-6 group">
                           <div className="motion-standard w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white">
                              <MapPin size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Kantor Pusat</p>
                              <p className="text-xl font-bold text-slate-900">Samarinda, Kalimantan Timur</p>
                           </div>
                        </div>
                     </div>

                     <div className="pt-8 flex items-center gap-4">
                        <a href="https://www.instagram.com/ruanggjajan/" target="_blank" rel="noopener noreferrer">
                           <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-slate-400 hover:text-primary hover:bg-orange-50">
                              <Instagram size={20} />
                           </Button>
                        </a>
                        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-slate-400 hover:text-primary hover:bg-orange-50">
                           <Twitter size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-slate-400 hover:text-primary hover:bg-orange-50">
                           <Facebook size={20} />
                        </Button>
                     </div>
                  </div>
               </div>

               {/* Form */}
               <div className="bg-slate-900 p-10 md:p-12 rounded-[40px] shadow-2xl space-y-8">
                  <h2 className="text-3xl font-black text-white tracking-tight">Kirim Pesan</h2>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nama</label>
                           <Input placeholder="Rafaa" className="bg-white/5 border-white/10 text-white rounded-xl h-14" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subjek</label>
                           <Input placeholder="Pertanyaan Umum" className="bg-white/5 border-white/10 text-white rounded-xl h-14" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Alamat Email</label>
                        <Input type="email" placeholder="rafaa@email.com" className="bg-white/5 border-white/10 text-white rounded-xl h-14" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pesan</label>
                        <textarea
                           placeholder="Beritahu kami apa yang Anda pikirkan..."
                           className="motion-standard w-full bg-white/5 border border-white/10 text-white rounded-xl h-32 p-4 focus:ring-2 focus:ring-primary outline-hidden"
                        />
                     </div>
                     <Button className="w-full rounded-2xl py-9 h-auto bg-primary text-white font-black text-2xl shadow-2xl shadow-primary/30">
                        Kirim Permintaan
                     </Button>
                  </form>
               </div>
            </div>
         </div>
      </motion.div>
   );
}
