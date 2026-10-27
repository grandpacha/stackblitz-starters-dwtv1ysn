'use client';

import { useEffect, useRef, ReactNode, useState } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export default function ScrollAnimation({ children, className = '', stagger = false, delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'pending' | 'visible'>('pending');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setState('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const baseClass = stagger ? 'stagger-children' : 'animate-on-scroll';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${state} ${className}`}
    >
      {children}
    </div>
  );
}
