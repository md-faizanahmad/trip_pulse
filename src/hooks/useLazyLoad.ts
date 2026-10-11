"use client";

import { useEffect, useRef, useState } from "react";

type UseLazyLoadOptions = {
  rootMargin?: string;
};

export function useLazyLoad({ rootMargin = "200px" }: UseLazyLoadOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return { ref, isVisible };
}
