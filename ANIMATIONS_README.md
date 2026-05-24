# 🎨 iOS-STYLE ANIMATIONS - COMPLETE GUIDE

## OVERVIEW

This project now features premium iOS-style animations that make the site feel like a native iOS app. All animations use spring physics for that buttery smooth feel.

---

## QUICK START

### 1. Install Dependencies

```bash
npm install framer-motion react-swipeable @use-gesture/react
```

### 2. Wrap Your App

```tsx
import { AnimationProvider } from './components/AnimationProvider';

<AnimationProvider>
  <App />
</AnimationProvider>
```

### 3. Use Animations

```tsx
import { motion } from 'motion/react';
import { springs, variants } from './lib/animations';

<motion.div
  initial="hidden"
  animate="visible"
  variants={variants.fadeUp}
  transition={{ type: 'spring', ...springs.smooth }}
>
  Content
</motion.div>
```

---

## ANIMATION VARIANTS

### Fade Up
```tsx
<motion.div variants={variants.fadeUp}>
  Content slides up from below
</motion.div>
```

### Fade Down
```tsx
<motion.div variants={variants.fadeDown}>
  Content slides down from above
</motion.div>
```

### Scale In
```tsx
<motion.div variants={variants.scaleIn}>
  Content scales up from 0.92 to 1.0
</motion.div>
```

### Slide Right
```tsx
<motion.div variants={variants.slideRight}>
  Content slides from left to right
</motion.div>
```

### Stagger Container
```tsx
<motion.div variants={variants.stagger}>
  <motion.div variants={variants.staggerItem}>Item 1</motion.div>
  <motion.div variants={variants.staggerItem}>Item 2</motion.div>
</motion.div>
```

---

## SPRING CONFIGURATIONS

```typescript
import { springs } from './lib/animations';

// Snappy - for buttons
transition={{ type: 'spring', ...springs.snappy }}

// Smooth - for cards
transition={{ type: 'spring', ...springs.smooth }}

// Bouncy - for badges
transition={{ type: 'spring', ...springs.bouncy }}

// Gentle - for page transitions
transition={{ type: 'spring', ...springs.gentle }}

// Molasses - for hero elements
transition={{ type: 'spring', ...springs.molasses }}
```

---

## HOOKS

### useDeviceType

```tsx
import { useDeviceType } from './hooks/useDeviceType';

const { isTouch, isLowEnd, isIOS, isAndroid } = useDeviceType();

// Use these to conditionally render animations
if (isLowEnd) {
  // Show simpler animations
}
```

### useInView

```tsx
import { useInView } from './hooks/useInView';

const [ref, inView] = useInView({ threshold: 0.1 });

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div ref={ref}>Content fades in when visible</div>
</motion.div>
```

### useSafeArea

```tsx
import { useSafeArea } from './hooks/useSafeArea';

const { safeArea } = useSafeArea();

<div style={{ paddingBottom: safeArea.bottom }}>
  Content with safe area padding
</div>
```

### useScrollPosition

```tsx
import { useScrollPosition } from './hooks/useScrollPosition';

const { scrollY, scrollDirection, isScrolled } = useScrollPosition();

// Use these for navbar effects
if (isScrolled) {
  // Show sticky navbar
}
```

### useReducedMotion

```tsx
import { useReducedMotion } from './hooks/useReducedMotion';

const { reducedMotion, animationConfig } = useReducedMotion();

// Use this for reduced motion support
transition={animationConfig}
```

---

## COMPONENTS

### AnimationProvider

```tsx
import { AnimationProvider } from './components/AnimationProvider';

<AnimationProvider>
  <App />
</AnimationProvider>
```

### CustomCursor (Desktop Only)

```tsx
import { CustomCursor } from './components/CustomCursor';

<CustomCursor />
```

### BottomSheet

```tsx
import { BottomSheet } from './components/BottomSheet';

<BottomSheet isOpen={isOpen} onClose={onClose}>
  <div>Sheet content</div>
</BottomSheet>
```

### Toast

```tsx
import { ToastProvider, useToast } from './components/Toast';

// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// Use in components
const { showToast } = useToast();
showToast('Success!', 'success');
```

---

## CSS UTILITIES

### Viewport Height Fixes
- `vh-100-dvh` - Dynamic viewport height
- `vh-100-svh` - Small viewport height

### Safe Area
- `pb-safe` - Padding bottom safe area
- `pt-safe` - Padding top safe area

### Frosted Glass
- `.glass` - Light frosted glass
- `.glass-dark` - Dark frosted glass

### iOS Momentum Scroll
- `.ios-scroll` - Enables momentum scrolling

### Touch Actions
- `.touch-pan-x` - Horizontal pan
- `.touch-pan-y` - Vertical pan

### Overscroll Behavior
- `.overscroll-contain` - Contain overscroll

---

## PERFORMANCE TIERS

### High-End (Desktop + iPhone 12+)
- Full animations, backdrop-filter, parallax
- All Framer Motion features enabled

### Mid-Range (iPhone SE + Mid Android)
- Reduced blur intensity
- No parallax
- Keep spring animations

### Low-End (Android 8-9, budget phones)
- Fall back to CSS transitions only
- No backdrop-filter
- Simple fade animations

---

## ANIMATION PHILOSOPHY

### iOS Rules:
1. **Spring physics only** - No duration-based animations
2. **Transform + opacity only** - GPU accelerated
3. **Fast in, slow out** - Natural easing curves
4. **Layered motion** - Stagger children animations
5. **Micro-interactions** - Every tap has feedback
6. **60fps desktop, 60fps iOS, 30fps+ Android**
7. **Graceful degradation** - Low-end devices get simpler animations
8. **Respects reduced motion** - `prefers-reduced-motion` honored

---

## TROUBLESHOOTING

### Animations Not Working
1. Check `AnimationProvider` wraps your app
2. Verify `framer-motion` is installed
3. Check browser console for errors

### Performance Issues
1. Check if device is low-end
2. Verify `prefers-reduced-motion` is not enabled
3. Reduce parallax effects on mobile

### Safe Areas Not Working
1. Ensure `useSafeArea` hook is used
2. Check iOS version (11+ required)

---

## EXAMPLES

### Product Card with iOS Animations

```tsx
import { motion } from 'motion/react';
import { springs, variants } from './lib/animations';
import { useDeviceType } from './hooks/useDeviceType';

export function ProductCard({ product }) {
  const { isTouch } = useDeviceType();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants.staggerItem}
      className="card"
    >
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      
      <h3>{product.name}</h3>
      
      {!isTouch && (
        <div className="hover-actions">
          <button>Quick View</button>
          <button>Add to Cart</button>
        </div>
      )}
    </motion.div>
  );
}
```

### Navbar with iOS Animations

```tsx
import { motion } from 'motion/react';
import { springs } from './lib/animations';
import { useScrollPosition } from './hooks/useScrollPosition';

export function Navbar() {
  const { scrollY, scrollDirection, isScrolled } = useScrollPosition();

  const isHidden = scrollDirection === 'down' && isScrolled;
  const isSticky = scrollY > 20;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: isHidden ? -100 : 0,
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 30,
          mass: 1
        }
      }}
      className={isSticky ? 'sticky' : 'transparent'}
    >
      {/* Navbar content */}
    </motion.nav>
  );
}
```

---

## DOCUMENTATION

- `FINAL_SUMMARY.md` - Quick overview
- `IOS_ANIMATIONS_IMPLEMENTATION.md` - Detailed implementation guide
- `ANIMATIONS_README.md` - This file

---

## SUPPORT

If you have questions or issues:
1. Check the documentation files
2. Review the example code
3. Test on different devices
4. Check browser console for errors

---

## CREDITS

Animations inspired by:
- iOS Human Interface Guidelines
- Apple.com website
- iOS app transitions
- Apple Watch interactions
