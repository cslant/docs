import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal hook: observes the element and flips `isVisible` once
 * it enters the viewport (one-shot). Consumers apply their own opacity /
 * transform transition, optionally delayed by `delay` seconds.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return { ref, isVisible, delay };
}