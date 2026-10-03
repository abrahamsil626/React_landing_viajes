import { useEffect, useRef, useState } from 'react';

const HAS_OBSERVER = typeof IntersectionObserver !== 'undefined';

// Devuelve [ref, visible]. Sin soporte de IntersectionObserver, el elemento se considera visible.
export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(!HAS_OBSERVER);

  useEffect(() => {
    if (!HAS_OBSERVER || !ref.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}
