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

    const elements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-zoom, .reveal-slide-left, .reveal-slide-right, .video-frame, .reveal-form-card, .reveal-artists-track'
    );
    elements.forEach(el => scrollObserver.observe(el));

    // Scroll parallax & wave depth for Becoming the Ocean section
    const artistsSection = document.querySelector('.artists-accordion-section');
    let ticking = false;
    const handleScroll = () => {
      if (!ticking && artistsSection) {
        window.requestAnimationFrame(() => {
          const rect = artistsSection.getBoundingClientRect();
          const wh = window.innerHeight;
          if (rect.top < wh && rect.bottom > 0) {
            const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
            artistsSection.style.setProperty('--scroll-progress', progress.toFixed(3));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      elements.forEach(el => scrollObserver.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
}
