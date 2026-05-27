import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { DUMMY_PRODUCTS } from '../lib/data';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { cn } from '../lib/utils';

export function Menu() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(DUMMY_PRODUCTS);

  const categories = ['All', 'Snacks', 'Drinks'];

  useEffect(() => {
    let result = DUMMY_PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchSearch && matchCategory;
    });

    if (sortBy === 'popular') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'newest') result.sort((a, b) => b.id.localeCompare(a.id));

    setFilteredProducts(result);
  }, [search, activeCategory, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full w-fit uppercase tracking-wider mx-auto">
            Explore Flavors
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 italic">Favorites</span>.
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium">
            From signature coffee to artisan snacks, discover the finest delicacies Samarinda has to offer.
          </p>
        </div>

        {/* Filters */}
        <div className="soft-hover-action flex flex-col lg:flex-row items-center gap-6 bg-white py-6 rounded-3xl px-4 sm:px-6 border border-orange-50 shadow-xl shadow-orange-100/20">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input
              placeholder="Search for dishes, drinks, or desserts..."
              className="motion-standard pl-12 h-14 rounded-2xl border border-slate-100 bg-slate-50/50 focus-visible:ring-primary focus-visible:bg-white text-slate-900 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full lg:w-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "pressable-action px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                      : "bg-white text-slate-600 border border-slate-100 hover:border-orange-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-4 w-full sm:w-auto">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort:</span>
              <select
                className="bg-transparent text-sm font-bold text-slate-900 focus:outline-hidden cursor-pointer flex-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="popular">Popular Choice</option>
                <option value="newest">Latest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="h-[40vh] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
              <Button variant="outline" onClick={() => { setSearch(''); setActiveCategory('All'); }} className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
