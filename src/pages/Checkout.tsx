import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, MessageCircle, ArrowLeft, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button, buttonVariants } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Checkout() {
  const { cart, total, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'COD'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    const itemsList = cart.map(item => `- ${item.name} x${item.quantity}`).join('\n');
    const message = `Halo kak, Saya pesan

Nama: ${formData.name}
Alamat: ${formData.address}
Menu: 
${itemsList}
Total Harga: Rp ${total.toLocaleString()}

Pembayaran: ${formData.paymentMethod}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6285240174510?text=${encodedMessage}`, '_blank');
    
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "Checkout via WhatsApp", data: { message } })
    }).catch(err => console.error("Failed to track checkout:", err));

    toast.success('Redirecting to WhatsApp...');
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  const handleShopeeCheckout = () => {
    window.open(`https://shopee.co.id/store-name`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8">
        <ShoppingBag size={80} className="text-muted-foreground mb-6" />
        <h2 className="text-3xl font-heading font-black mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Add some delicious items to your cart before checking out.</p>
        <Link to="/menu" className={cn(buttonVariants(), "rounded-full px-10 py-6 h-auto flex items-center justify-center")}>
          Go to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 rounded-full gap-2">
          <ArrowLeft size={18} /> Back to Menu
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6 bg-background p-8 rounded-3xl shadow-sm border">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold">Delivery Details</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Full Name *</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Nickname" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Phone Number *</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="08123xxx" className="h-12 rounded-xl" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">Full Address *</label>
                  <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange}
                    placeholder="Samarinda, Kalimantan Timur..." 
                    className="w-full bg-background border rounded-xl p-4 text-sm h-32 focus:ring-2 focus:ring-primary outline-hidden"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">Notes (Optional)</label>
                  <Input name="notes" value={formData.notes} onChange={handleChange} placeholder="Extra spicy, please!" className="h-12 rounded-xl" />
               </div>

               <div className="space-y-3 pt-2">
                  <label className="text-sm font-bold text-muted-foreground">Pembayaran / Payment Method *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['COD', 'Bank Transfer', 'QRIS'].map((method) => (
                    <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={cn(
                          "pressable-action py-3 rounded-xl text-sm font-bold border hover:border-primary",
                          formData.paymentMethod === method
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
                            : "bg-white text-slate-600 border-slate-100"
                        )}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            <div className="space-y-6 bg-white p-8 rounded-[40px] border border-orange-50 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Direct Ordering</h2>
               </div>
               <p className="text-slate-500 font-medium leading-relaxed">
                  Your order will be processed manually via our WhatsApp concierge or Shopee store. No upfront payment required on this platform.
               </p>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <Card className="rounded-3xl border-none shadow-xl overflow-hidden sticky top-32">
               <CardContent className="p-0">
                  <div className="bg-primary p-6 text-primary-foreground">
                    <h3 className="text-xl font-heading font-bold">Order Summary</h3>
                    <p className="text-sm opacity-80">{cart.length} delicacies waiting...</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <ScrollArea className="h-48 pr-4">
                      <div className="space-y-4">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between items-center gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                              <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                            </div>
                            <span className="text-sm font-bold">Rp {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder="PROMO CODE" 
                          className="h-12 rounded-xl bg-slate-50 border-none font-bold uppercase tracking-widest text-xs" 
                          id="promo-input"
                        />
                        <Button 
                          variant="outline" 
                          className="h-12 rounded-xl border-dashed border-primary text-primary hover:bg-primary/5"
                          onClick={() => {
                            const val = (document.getElementById('promo-input') as HTMLInputElement).value;
                            if (val.toUpperCase() === 'RUANGJAJAN50') {
                              toast.success('Promo applied! 50% discount added.');
                            } else {
                              toast.error('Invalid promo code');
                            }
                          }}
                        >
                          Apply
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400 font-medium">Subtotal Order</span>
                          <span className="font-bold">Rp {subtotal.toLocaleString()}</span>
                        </div>
                        <Separator className="my-2 bg-slate-100" />
                        <div className="flex justify-between items-center py-2">
                          <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Final Amount</span>
                          <span className="text-3xl font-black text-primary">Rp {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button 
                        onClick={handleWhatsAppCheckout} 
                        className="w-full rounded-2xl py-6 h-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-black gap-2 text-sm uppercase tracking-widest shadow-lg shadow-green-100 border-none"
                      >
                        <MessageCircle size={20} /> CONFIRM VIA WHATSAPP
                      </Button>
                      
                      <Button 
                        onClick={handleShopeeCheckout}
                        className="w-full rounded-2xl py-6 h-auto bg-[#EE4D2D] hover:bg-[#d83f20] text-white font-black gap-2 text-sm uppercase tracking-widest shadow-lg shadow-orange-100 border-none"
                      >
                        <ShoppingBag size={20} /> CONFIRM VIA SHOPEEFOOD
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-slate-400 py-2 pt-4">
                       <span className="text-[10px] font-bold uppercase tracking-widest italic opacity-50">Authorized RuangJajan Order</span>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
