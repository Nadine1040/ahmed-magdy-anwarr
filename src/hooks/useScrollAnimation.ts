import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Reduced motion detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// Enhanced Intersection Observer with options
export function useInView(options?: { threshold?: number; rootMargin?: string; root?: Element | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options, reducedMotion]);

  return { ref, isInView, hasAnimated };
}

// Legacy scroll animation (backward compatible)
export function useScrollAnimation(threshold = 0.15) {
  const { ref, isInView } = useInView({ threshold });
  return { ref, isVisible: isInView };
}

// Scroll progress (0 to 1) for a specific element
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      const scrolled = windowHeight - rect.top;
      const total = windowHeight + elementHeight;
      const rawProgress = scrolled / total;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
}

// Scroll direction detection
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setScrollDirection('down');
          } else if (currentScrollY < lastScrollY) {
            setScrollDirection('up');
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, scrollY };
}

// Stagger animation with children
export function useStaggerAnimation(itemCount: number, baseDelay = 100) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (reducedMotion) {
      setVisibleItems(new Array(itemCount).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * baseDelay);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [itemCount, baseDelay, reducedMotion]);

  return { containerRef, visibleItems };
}

// 3D tilt effect
export function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  }, [maxTilt, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  }, []);

  return { ref, transform, handleMouseMove, handleMouseLeave };
}

// Parallax effect
export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed * 0.1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, reducedMotion]);

  return { ref, offset };
}

// Mouse glow/spotlight effect
export function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return { ref, position, handleMouseMove };
}

// Spring animation for smooth transitions
export function useSpringAnimation(target: number, tension = 0.1, friction = 0.8) {
  const [current, setCurrent] = useState(target);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      const diff = targetRef.current - current;
      if (Math.abs(diff) < 0.001) {
        setCurrent(targetRef.current);
        return;
      }
      setCurrent((prev) => prev + diff * tension);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, tension, current]);

  return current;
}

// Window size hook for responsive
export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Mobile detection hook
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}