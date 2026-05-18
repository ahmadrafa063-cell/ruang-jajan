import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Button, buttonVariants } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { ScrollArea } from '../components/ui/scroll-area';
import { Plus, Pencil, Trash2, LayoutDashboard, UtensilsCrossed, Users, PieChart, LogOut, Package, ShoppingBag, Star, Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { DUMMY_PRODUCTS } from '../lib/data';
import { cn } from '../lib/utils';

export function AdminDashboard() {
  const { profile, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items: Product[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(items);
    } catch (err) {
      console.error(err);
      setProducts([]); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const seedProducts = async () => {
    setLoading(true);
    try {
      for (const p of DUMMY_PRODUCTS) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = p;
        await addDoc(collection(db, 'products'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      toast.success('Database seeded successfully!');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to seed database');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!profile?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
        <a href="/" className={buttonVariants()}>Go Home</a>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden pt-16 relative">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 flex flex-col pt-10 transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-0 lg:pt-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-12 lg:mb-8 lg:mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                R
              </div>
              <h2 className="font-black text-xl text-white tracking-tight">RuangJajan <span className="text-primary">Admin</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white hover:bg-white/10">
              <XIcon size={24} />
            </Button>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
              { id: 'products', label: 'Inventory', icon: <Package size={20} /> },
              { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
              { id: 'users', label: 'Customers', icon: <Users size={20} /> },
              { id: 'analytics', label: 'Insights', icon: <PieChart size={20} /> },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                  activeTab === item.id 
                    ? "bg-white/10 text-primary shadow-xl border border-white/5" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <Button variant="ghost" onClick={logout} className="w-full justify-start gap-4 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 px-5 py-6 font-bold h-auto">
            <LogOut size={20} /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 md:p-10 lg:p-16">
        <div className="max-w-7xl mx-auto space-y-8 lg:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform">
                <span className="w-6 h-0.5 bg-slate-900 rounded-full" />
                <span className="w-4 h-0.5 bg-slate-900 rounded-full ml-auto" />
                <span className="w-6 h-0.5 bg-slate-900 rounded-full" />
              </Button>
              <div className="space-y-1">
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Control Center</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Welcome back, {profile.displayName}</p>
              </div>
            </div>
            
            <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
               {products.length === 0 && (
                  <Button variant="outline" onClick={seedProducts} disabled={loading} className="rounded-2xl border-primary/20 text-primary hover:bg-primary/5 px-6 sm:px-8 py-5 sm:py-6 h-auto font-bold whitespace-nowrap text-xs sm:text-sm">
                    Seed Mock Data
                  </Button>
               )}
               <Dialog>
                  <DialogTrigger>
                    <Button className="rounded-2xl gap-2 font-black px-6 sm:px-10 py-5 sm:py-6 h-auto shadow-xl shadow-primary/20 bg-primary hover:bg-orange-600 transition-all whitespace-nowrap text-xs sm:text-sm">
                      <Plus size={20} className="sm:size-[24px]" /> Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] rounded-[40px] p-10 border-none shadow-2xl">
                     <DialogHeader className="mb-6">
                        <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">Global Inventory</DialogTitle>
                     </DialogHeader>
                     <p className="text-slate-500 py-20 text-center border-4 border-dashed border-slate-50 rounded-[32px] font-bold">
                        Form integration coming in the next sprint.
                     </p>
                  </DialogContent>
               </Dialog>
            </div>
          </div>

          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {products.map(p => (
                   <div key={p.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:border-orange-50 transition-all">
                      <div className="h-44 relative">
                         <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                         <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <Button size="icon" variant="secondary" className="rounded-xl w-10 h-10"><Pencil size={18} /></Button>
                            <Button size="icon" variant="destructive" className="rounded-xl w-10 h-10"><Trash2 size={18} /></Button>
                         </div>
                      </div>
                      <div className="p-6 space-y-3">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{p.category}</span>
                            <span className="text-sm font-black text-primary">Rp {p.price.toLocaleString()}</span>
                         </div>
                         <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{p.name}</h3>
                      </div>
                   </div>
                 ))}
                 {products.length === 0 && !loading && (
                    <div className="col-span-full py-32 text-center bg-white rounded-[40px] border-4 border-dashed border-slate-50 shadow-sm">
                       <Package size={64} className="mx-auto text-slate-100 mb-6" />
                       <h3 className="text-2xl font-black text-slate-900">Inventory Empty</h3>
                       <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Populate your database to get started</p>
                    </div>
                 )}
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { label: "Total Revenue", val: "Rp 12.5M", growth: "+12%", color: "text-green-500", icon: <PieChart size={20} /> },
                  { label: "Active Orders", val: "42", growth: "+5", color: "text-blue-500", icon: <ShoppingBag size={20} /> },
                  { label: "New Customers", val: "156", growth: "+24", color: "text-orange-500", icon: <Users size={20} /> },
                  { label: "Success Rate", val: "98.2%", growth: "+0.5%", color: "text-primary", icon: <Star size={20} /> },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6 hover:shadow-xl transition-all">
                     <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50", stat.color)}>
                        {stat.icon}
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <div className="flex items-end gap-3">
                           <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.val}</h3>
                           <span className={cn("text-xs font-black mb-1", stat.color)}>{stat.growth}</span>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
