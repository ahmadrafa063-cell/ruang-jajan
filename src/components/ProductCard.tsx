/**
 * ProductCard Component
 * 
 * Performance-optimized product card with CSS animations.
 * 
 * Features:
 * - React.memo for preventing unnecessary re-renders
 * - CSS animations for hover effects
 * - Framer Motion ONLY for entrance animations
 * - Performance tier-aware animations
 */

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus, Flame, Sparkles, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { StarReview } from './StarReview';
import { useAnimation } from './AnimationProvider';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Memoized badge component
const ProductBadge = React.memo(function ProductBadge({ badge }: { badge: string }) {
  const getIcon = useCallback((badgeName: string) => {
    switch (badgeName.toLowerCase()) {
      case 'spicy': return <Flame size={12} className="mr-1" />;
      case 'new': return <Sparkles size={12} className="mr-1" />;
      case 'best seller': return <Zap size={12} className="mr-1" />;
      default: return null;
    }
  }, []);

  return (
    <Badge key={badge} className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-lg border-none">
      {getIcon(badge)}
      {badge.toUpperCase()}
    </Badge>
  );
});

// Memoized image component with lazy loading
const ProductImage = React.memo(function ProductImage({ product, canAnimate }: { product: Product; canAnimate: boolean }) {
  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </Link>
  );
});

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  const { performanceTier, shouldAnimate: canAnimate } = useAnimation();

  // Memoized badge icons
  const badgeIcons = useMemo(() => {
    if (!product.badges) return null;
    return product.badges.map((badge) => <ProductBadge key={badge} badge={badge} />);
  }, [product.badges]);

  // Memoized entrance animation config
  const entranceAnimation = useMemo(() => ({
    initial: canAnimate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 },
    animate: canAnimate ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: performanceTier === 'high' ? 0.25 : 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  }), [canAnimate, performanceTier]);

  // Memoized add to cart handler
  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  return (
    <motion.div
      {...entranceAnimation}
      className="motion-standard"
    >
      <Card className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm flex flex-col h-full group">
        <div className="relative h-48 mb-4 overflow-hidden rounded-2xl">
          <ProductImage product={product} canAnimate={canAnimate} />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {badgeIcons}
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
              onClick={handleAddToCart}
            >
              <Plus size={24} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
