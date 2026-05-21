import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Minus, ShoppingBag, ArrowLeft, Flame, Sparkles, Zap, MessageCircle } from 'lucide-react';
import { Button, buttonVariants } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DUMMY_PRODUCTS } from '../lib/data';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../lib/utils';
import { StarReview } from '../components/StarReview';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    const found = DUMMY_PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/menu');
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchRecommendations();
    }
  }, [product]);

  const fetchRecommendations = async () => {
    setLoadingRecs(true);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentItems: [product], history: [] })
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecs(false);
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 sm:mb-8 rounded-full gap-2 text-slate-500 hover:text-primary">
          <ArrowLeft size={18} /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl aspect-square bg-slate-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover shadow-inner"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex gap-2">
               {product.badges?.map(badge => (
                  <Badge key={badge} className="bg-white text-slate-900 border-none rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 font-black uppercase text-[9px] sm:text-[10px] tracking-widest shadow-xl">
                    {badge}
                  </Badge>
               ))}
            </div>
          </motion.div>

          {/* Details */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full w-fit uppercase tracking-wider">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Zap size={18} fill="currentColor" />
                  <span className="text-xs font-bold uppercase tracking-widest">Available Now</span>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                 <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Premium Grade</span>
                 <span className="text-2xl font-black text-primary uppercase tracking-widest italic">Curated Edition</span>
              </div>
              
              <div className="flex flex-col items-start sm:items-end gap-2 w-fit">
                <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-white shadow-sm w-fit">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl h-12 w-12 text-slate-400 hover:text-primary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={20} />
                  </Button>
                  <span className="w-12 text-center font-black text-xl text-slate-900">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl h-12 w-12 text-slate-400 hover:text-primary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={20} />
                  </Button>
                </div>
                <StarReview
                  productId={product.id}
                  defaultRating={product.rating}
                  size={16}
                  className="gap-1 px-1"
                  labelClassName="text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 rounded-2xl py-8 h-auto bg-slate-900 hover:bg-slate-800 text-white text-lg font-black gap-2 shadow-2xl shadow-slate-200"
              >
                <ShoppingBag size={24} /> Add to Cart
              </Button>
              <a 
                href={`https://wa.me/6285240174510?text=${encodeURIComponent(`Halo kak, Saya pesan

Nama: 
Alamat: 
Menu: 
- ${product.name} x${quantity}
Total Harga: Rp ${(product.price * quantity).toLocaleString()}

Pembayaran: COD/Bank Transfer/QRIS`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl py-8 h-auto px-8 border-2 border-slate-100 text-slate-600 font-bold group flex items-center justify-center gap-2 hover:border-orange-200")}
                onClick={() => {
                  fetch("/api/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ event: "Product WhatsApp Click", data: { product: product.name } })
                  });
                }}
              >
                Chat WhatsApp <MessageCircle size={24} className="motion-standard group-hover:text-primary" />
              </a>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
