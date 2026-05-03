import { useEffect, useState } from 'react';

export function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);
  const { root = null, rootMargin = '0px', threshold = 0.18 } = options;

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { root, rootMargin, threshold });

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold]);

  return isInView;
}
