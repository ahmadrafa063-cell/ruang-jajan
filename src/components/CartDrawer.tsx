import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './ui/sheet';
import { useCart } from '../context/CartContext';
import { Button, buttonVariants } from './ui/button';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, subtotal, total, itemCount } = useCart();

  const shipping = 15000;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-orange-50">
          <SheetTitle className="flex items-center gap-2 text-2xl font-black text-slate-900">
            <ShoppingBag size={24} className="text-primary" />
            Your Cart <span className="text-primary text-sm font-bold bg-orange-100 px-3 py-1 rounded-full">{itemCount} items</span>
          </SheetTitle>
          <SheetDescription className="font-medium text-slate-400">
            Gourmet flavors, just a click away.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {cart.length > 0 ? (
            <div className="py-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-3 rounded-2xl border border-slate-50 hover:border-orange-100 hover:bg-slate-50/50 transition-all group"
                  >
                    <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white border border-slate-100 rounded-xl h-8 overflow-hidden shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 hover:bg-slate-50 text-slate-400 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-xs font-black w-8 text-center text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 hover:bg-slate-50 text-slate-400 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-50">Authorized Selection</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-300 hover:text-destructive hover:bg-destructive/5 h-8 w-8 rounded-lg self-start transition-all"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground max-w-[200px] mt-1">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>
              <Link to="/menu" className={cn(buttonVariants({ variant: "outline" }), "rounded-full flex items-center justify-center")}>
                Browse Menu
              </Link>
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="font-black text-slate-900 uppercase tracking-[0.2em] text-[10px]">Total Order Amount</span>
                <span className="text-2xl font-black text-primary">Rp {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              <Link to="/checkout" className={cn(buttonVariants({ size: "lg" }), "w-full rounded-2xl py-8 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200 font-bold transition-all")}>
                Proceed to Checkout <ArrowRight size={20} />
              </Link>
              <Button variant="outline" onClick={onClose} className="w-full rounded-2xl py-8 border-slate-200 text-slate-600 font-bold hover:bg-white hover:border-orange-200 transition-all">
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
