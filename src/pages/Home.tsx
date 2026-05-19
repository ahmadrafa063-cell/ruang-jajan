import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonVariants, Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DUMMY_PRODUCTS } from '../lib/data';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';


export function Home() {

  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState<'popular' | 'newest'>('popular');
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(DUMMY_PRODUCTS);
  const { addToCart } = useCart();

  const categories = ['All', 'Snacks', 'Drinks'];

  React.useEffect(() => {
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-12">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7 space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
                Premium Selection <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 italic">Delivered Instant.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                Experience Indonesia's fastest gourmet delivery. Artisan ingredients meets modern logistics for a meal you'll never forget.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/menu" className={cn(buttonVariants({ size: "lg" }), "px-10 py-8 bg-slate-900 text-white font-black rounded-2xl shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 hover:bg-slate-800 transition-all text-xl active:scale-95")}>
                Order Now <ArrowRight size={22} />
              </Link>
            </div>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="relative bg-white p-6 rounded-[40px] shadow-2xl border border-orange-50 shadow-orange-100/50 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 group">
              <Link to={`/product/${DUMMY_PRODUCTS[0].id}`} className="block overflow-hidden rounded-[32px] mb-6">
                <img 
                  src={DUMMY_PRODUCTS[0].image} 
                  alt="Kopi Genggaman" 
                  className="w-full h-64 md:h-80 object-cover object-center bg-black group-hover:scale-110 transition-transform duration-500" 
                />
              </Link>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Drinks</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={cn(
                        "text-yellow-400",
                        star <= 0 ? "fill-yellow-400" : "fill-none"
                      )}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">0.0</span>
                </div>
              </div>
              
              <Link to={`/product/${DUMMY_PRODUCTS[0].id}`}>
                <h3 className="font-bold text-slate-900 text-xl mb-1 group-hover:text-primary transition-colors">Kopi Genggaman</h3>
              </Link>
              <p className="text-slate-500 text-xs line-clamp-2 mt-1 mb-4">
                Signature premium coffee blend with a rich, smooth finish and a hint of artisan sweetness.
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div>
                   <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Premium Choice</span>
                   <span className="text-sm font-black text-primary uppercase tracking-widest">Available Now</span>
                </div>
                <div 
                  onClick={() => addToCart(DUMMY_PRODUCTS[0])}
                  className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl shadow-slate-200 cursor-pointer"
                >
                  <Plus size={24} />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl transform rotate-12 z-20">
              <p className="font-black text-xl">BEST SELLER!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8">
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
          <div className="flex flex-col lg:flex-row items-center gap-6 bg-white py-6 rounded-3xl px-4 sm:px-6 border border-orange-50 shadow-xl shadow-orange-100/20 transition-all duration-300">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input 
                placeholder="Search for dishes, drinks, or desserts..." 
                className="pl-12 h-14 rounded-2xl border border-slate-100 bg-slate-50/50 focus-visible:ring-primary focus-visible:bg-white transition-all text-slate-900 font-medium"
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
                        "px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
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
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
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
      </section>
    </div>
  );
}
