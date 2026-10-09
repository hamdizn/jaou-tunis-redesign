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
          entry.target.classList.remove('exit-left');
        } else {
          entry.target.classList.remove('is-visible');
          if (entry.boundingClientRect.top < 0) {
            entry.target.classList.add('exit-left');
          } else {
            entry.target.classList.remove('exit-left');
          }
        }
      });
    }, scrollObserverOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-zoom, .reveal-slide-right, .video-frame, .reveal-form-card');
    elements.forEach(el => scrollObserver.observe(el));

    return () => {
      elements.forEach(el => scrollObserver.unobserve(el));
    };
  }, []);

  return <>{children}</>;
}
