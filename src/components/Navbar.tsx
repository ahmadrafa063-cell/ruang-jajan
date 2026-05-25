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
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useDeviceType } from '../hooks/useDeviceType';
import { springs, variants } from '../lib/animations';
import { getPerformanceTier, shouldAnimate } from '../lib/performanceTier';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { scrollY, scrollDirection, isScrolled } = useScrollPosition();
  const { isTouch } = useDeviceType();
  const { user, loginWithGoogle, logout, isAdmin, isLoggingIn } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const performanceTier = getPerformanceTier();
  const canAnimate = shouldAnimate();

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

  // Navbar state
  const isSticky = scrollY > 20;
  const isHidden = scrollDirection === 'down' && isScrolled;
  const isVisible = scrollDirection === 'up' || !isScrolled;

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 md:px-10",
          isSticky
            ? "py-4 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm"
            : "py-6 bg-transparent"
        )}
        initial={{ y: 0 }}
        animate={{
          y: isHidden ? -100 : 0,
          transition: {
            type: 'spring',
            stiffness: performanceTier === 'high' ? 300 : 250,
            damping: performanceTier === 'high' ? 30 : 35,
            mass: 1
          }
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={canAnimate ? { scale: 1.05 } : {}}
            whileTap={canAnimate ? { scale: 0.95 } : {}}
            transition={{ type: 'spring', ...springs.snappy }}
          >
            <Link to="/" className="flex items-center gap-2 rounded-full">
              <BrandMark className="shadow-lg shadow-primary/20" />
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Ruang<span className="text-primary italic">Jajan</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <motion.div
            initial={canAnimate ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            animate={canAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                whileHover={canAnimate ? { scale: 1.1 } : {}}
                whileTap={canAnimate ? { scale: 0.95 } : {}}
                transition={{ type: 'spring', ...springs.snappy }}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "text-primary font-bold"
                      : "text-slate-600 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>

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
                    transition={{ type: 'spring', ...springs.bouncy }}
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

            <motion.button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', ...springs.snappy }}
            >
              <motion.span
                className={cn("w-6 h-0.5 bg-slate-900 rounded-full")}
                animate={isOpen ? { rotate: 45, translateY: 2 } : {}}
                transition={{ type: 'spring', ...springs.snappy }}
              />
              <motion.span
                className={cn("w-6 h-0.5 bg-slate-900 rounded-full")}
                animate={isOpen ? { opacity: 0 } : {}}
                transition={{ type: 'spring', ...springs.snappy }}
              />
              <motion.span
                className={cn("w-6 h-0.5 bg-slate-900 rounded-full")}
                animate={isOpen ? { rotate: -45, translateY: -2 } : {}}
                transition={{ type: 'spring', ...springs.snappy }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav Drawer - iOS-style spring slide from right */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-slate-900 z-50 md:hidden flex flex-col p-8"
            >
              <motion.div
                className="flex items-center justify-between mb-12"
                initial={canAnimate ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                animate={canAnimate ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3 }}
              >
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <BrandMark />
                  <span className="text-2xl font-black tracking-tight text-white">
                    Ruang<span className="text-primary italic">Jajan</span>
                  </span>
                </Link>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10 rounded-full p-2"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', ...springs.snappy }}
                >
                  <X size={28} />
                </motion.button>
              </motion.div>

              <motion.div
                className="flex flex-col gap-6"
                initial={canAnimate ? { opacity: 0 } : { opacity: 1 }}
                animate={canAnimate ? { opacity: 1 } : {}}
                transition={{ staggerChildren: canAnimate ? 0.08 : 0 }}
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={canAnimate ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                    animate={canAnimate ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: canAnimate ? i * 0.08 : 0,
                      type: 'spring',
                      ...springs.smooth
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-3xl font-black transition-colors",
                        location.pathname === link.href
                          ? "text-primary ml-2"
                          : "text-slate-400 hover:text-white"
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
                      <motion.button
                        className="w-full rounded-2xl py-6 h-auto font-bold bg-white text-slate-900 border-none"
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', ...springs.snappy }}
                      >
                        Admin Dashboard
                      </motion.button>
                    </Link>
                  </>
                )}
              </motion.div>

              <div className="mt-auto pt-8 text-center">
                <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">© 2026 RUANGJAJAN HUB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
