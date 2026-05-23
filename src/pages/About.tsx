import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, History, Users, Award } from 'lucide-react';

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-slate-50"
    >
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Hero */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full w-fit uppercase tracking-wider"
          >
            The Artisan Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-tight"
          >
            Elevating the <span className="text-primary italic">Everyday</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          >
            RuangJajan isn't just a delivery service. We are a curation of Samarinda's most exceptional flavors, delivered with a commitment to premium quality.
          </motion.p>
        </section>

        {/* Stats/Icons */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <ChefHat size={32} />, title: "Master Chefs", desc: "Curated by experts" },
            { icon: <History size={32} />, title: "since 2024", desc: "Born in Samarinda" },
            { icon: <Users size={32} />, title: "10k+ Fans", desc: "Happy community" },
            { icon: <Award size={32} />, title: "Gold Grade", desc: "Quality guaranteed" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-center space-y-4"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mx-auto">
                {item.icon}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl">{item.title}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Content */}
        <section className="space-y-12">
          <div className="bg-white rounded-[40px] p-10 md:p-20 shadow-xl shadow-orange-100/20 border border-orange-50 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Philosophy</h2>
              <p className="text-slate-500 leading-relaxed font-medium">
                Kami percaya bahwa makanan lebih dari sekadar asupan—ia adalah sebuah pengalaman. Setiap item di menu kami melalui proses seleksi yang ketat, memastikan hanya hidangan paling lezat, otentik, dan berkualitas tinggi yang sampai ke depan pintu Anda.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-2 h-12 bg-primary rounded-full" />
                  <p className="italic font-bold text-slate-700">"Samarinda's culinary scene is vibrant. We are here to highlight its brightest stars."</p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden aspect-square lg:aspect-video shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1550966842-28c46696d740?q=80&w=800&auto=format&fit=crop"
                alt="Kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 rounded-[32px] overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Coffee" />
            </div>
            <div className="h-64 rounded-[32px] overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Food" />
            </div>
            <div className="h-64 rounded-[32px] overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Dessert" />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
