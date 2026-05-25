import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus, Flame, Sparkles, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { StarReview } from './StarReview';
import { getPerformanceTier, shouldAnimate } from '../lib/performanceTier';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const performanceTier = getPerformanceTier();
  const canAnimate = shouldAnimate();

  const getBadgeIcon = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'spicy': return <Flame size={12} className="mr-1" />;
      case 'new': return <Sparkles size={12} className="mr-1" />;
      case 'best seller': return <Zap size={12} className="mr-1" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={canAnimate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
      animate={canAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: performanceTier === 'high' ? 0.25 : 0.3,
        ease: [0.25, 1, 0.5, 1]
      }}
      className="motion-standard"
    >
      <Card className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm flex flex-col h-full group">
        <div className="relative h-48 mb-4 overflow-hidden rounded-2xl">
          <Link to={`/product/${product.id}`} className="block h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </Link>
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.badges?.map((badge) => (
              <Badge key={badge} className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-lg border-none">
                {badge.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
            <StarReview productId={product.id} defaultRating={product.rating} size={12} />
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{product.name}</h3>
          </Link>
          <p className="text-slate-500 text-xs line-clamp-2 mt-1 mb-4 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Premium Grade</span>
              <span className="text-sm font-black text-primary uppercase tracking-widest">Curated Edition</span>
            </div>
            <Button
              size="icon"
              className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200"
              onClick={() => addToCart(product)}
            >
              <Plus size={24} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
