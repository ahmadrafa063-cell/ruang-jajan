import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, User, LogOut, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CartDrawer } from './CartDrawer';
import { cn } from '../lib/utils';
import { BrandMark } from './BrandMark';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user, loginWithGoogle, logout, isAdmin, isLoggingIn } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      // Error handled in AuthContext, but we catch it here to prevent unhandled rejection
    }
  };

  return (
    <>
      <nav className={cn(
        "motion-standard fixed top-0 left-0 right-0 z-50 px-6 md:px-10",
        isScrolled ? "py-4 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm" : "py-6 bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="soft-hover-action flex items-center gap-2 rounded-full">
            <BrandMark className="shadow-lg shadow-primary/20" />
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Ruang<span className="text-primary italic">Jajan</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "motion-standard text-sm font-medium hover:text-primary",
                  location.pathname === link.href ? "text-primary" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full text-slate-600 hover:text-primary"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-primary text-[10px] border-2 border-white">
                      {itemCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="hidden lg:flex rounded-full border-primary/20 text-primary hover:bg-primary/5">
                  Admin
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" onClick={() => setIsOpen(!isOpen)}>
              <span className={cn("motion-standard w-6 h-0.5 bg-slate-900", isOpen && "rotate-45 translate-y-2")} />
              <span className={cn("motion-standard w-6 h-0.5 bg-slate-900", isOpen && "opacity-0")} />
              <span className={cn("motion-standard w-6 h-0.5 bg-slate-900", isOpen && "-rotate-45 -translate-y-2")} />
            </Button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-slate-900 z-50 md:hidden flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <BrandMark />
                  <span className="text-2xl font-black tracking-tight text-white">
                    Ruang<span className="text-primary italic">Jajan</span>
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full">
                  <X size={28} />
                </Button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "motion-standard text-3xl font-black",
                        location.pathname === link.href ? "text-primary ml-2" : "text-slate-400 hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {isAdmin && (
                  <>
                    <Separator className="bg-slate-800 my-4" />
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full">
                      <Button className="w-full rounded-2xl py-6 h-auto font-bold bg-white text-slate-900 border-none hover:bg-slate-200">
                         Admin Dashboard
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-auto pt-8 text-center">
                 <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">© 2026 RUANGJAJAN HUB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
