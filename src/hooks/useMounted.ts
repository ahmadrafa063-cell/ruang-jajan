/**
 * useMounted Hook
 * 
 * Prevents animations from running during SSR/hydration.
 * Returns false during initial render, true after component mounts.
 * 
 * Usage:
 * const mounted = useMounted();
 * if (!mounted) return <StaticVersion />;
 * return <AnimatedVersion />;
 */

import { useState, useEffect } from 'react';

export function useMounted(): boolean {
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     return mounted;
}

// Export everything
export default {
     useMounted,
};
