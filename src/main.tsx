import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Checkout } from './pages/Checkout';
import { ProductDetail } from './pages/ProductDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { Button } from './components/ui/button';
import { ContactQR } from './components/ContactQR';

// Placeholder pages
const About = () => <div className="p-24 text-center max-w-4xl mx-auto space-y-8 min-h-screen">
  <h1 className="text-5xl font-black font-heading">About <span className="text-primary italic">BiteDash</span>.</h1>
  <p className="text-xl text-muted-foreground leading-relaxed">Born in legal Samarinda, BiteDash is a modern culinary tech startup dedicated to redefining the food delivery experience. We bridge the gap between artisanal kitchens and your doorstep, ensuring every meal is a premium experience.</p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
    {['Fastest Delivery', 'Pure Quality', 'Eco Friendly'].map(feat => (
      <div key={feat} className="bg-muted/30 p-8 rounded-3xl border font-bold text-xl">{feat}</div>
    ))}
  </div>
</div>;

const Contact = () => <div className="px-4 py-16 sm:p-24 text-center max-w-2xl mx-auto space-y-8">
  <div className="bg-background border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
    <ContactQR />
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Contact person</p>
      <p className="text-2xl font-black text-primary">+62 822 5470 7788</p>
    </div>
    <Button
      className="rounded-full w-full py-6 h-auto font-bold text-lg bg-slate-900 hover:bg-slate-800 text-white"
      onClick={async () => {
        try {
          await fetch('/api/send-notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'checkout-wa',
              name: '',
              address: '',
              phone: '',
              items: [],
              total: 0,
              payment: 'Contact Request',
            }),
          });
        } catch (emailError) {
          console.error('Email notification failed:', emailError);
        }
        window.open("https://wa.me/6282254707788", "_blank");
      }}
    >
      Send Message
    </Button>
  </div>
</div>;

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
