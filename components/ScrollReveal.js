'use client';

import { useEffect } from 'react';

export default function ScrollReveal({ children }) {
  useEffect(() => {
    const scrollObserverOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, scrollObserverOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-zoom');
    elements.forEach(el => scrollObserver.observe(el));

    return () => {
      elements.forEach(el => scrollObserver.unobserve(el));
    };
  }, []);

  return <>{children}</>;
}
