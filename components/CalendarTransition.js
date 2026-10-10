'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function CalendarTransition() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'entering' | 'leaving'
  const pathname = usePathname();
  const router = useRouter();
  const timerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const isNavigatingRef = useRef(false);
  const videoRef = useRef(null);
  const targetUrlRef = useRef('/calendar');

  const completeReveal = () => {
    isNavigatingRef.current = false;
    setStatus('leaving');
    setTimeout(() => {
      setStatus('idle');
      isTransitioningRef.current = false;
    }, 280);
  };

  const finishTransition = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const dest = targetUrlRef.current || '/calendar';

    // If navigating to a different page, push route while overlay is STILL covering screen!
    if (dest !== pathname) {
      isNavigatingRef.current = true;
      router.push(dest);

      // Safety timeout in case router takes more than 800ms
      timerRef.current = setTimeout(() => {
        completeReveal();
      }, 800);
    } else {
      // Already on target page: scroll up and reveal
      window.scrollTo({ top: 0, behavior: 'smooth' });
      completeReveal();
    }
  };

  // When route changes to the new page, gracefully reveal the new page
  useEffect(() => {
    if (isNavigatingRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      completeReveal();
    }
  }, [pathname]);

  const startTransition = (dest = '/calendar') => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    isNavigatingRef.current = false;
    targetUrlRef.current = dest;
    if (timerRef.current) clearTimeout(timerRef.current);

    setStatus('entering');

    // Start video playback from 0s (ultra-fast 0:18 to 0:25 sequence ~1.6s)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 20);

    // Snappy fallback safety timeout matching fast video duration (~1.62s)
    timerRef.current = setTimeout(() => {
      finishTransition();
    }, 1850);
  };

  useEffect(() => {
    const handleNavTransitionClick = (e) => {
      // Matches Calendar buttons, Home icon, and Brand Logo
      const link = e.target.closest(
        'a[href="/calendar"], a[href="calendar.html"], .calendar-btn, .spotlight-calendar-btn, .nav-brand, a[href="/"], a[href="index.html"], a[aria-label="Home"], a[aria-label="Jaou Tunis Home"], .icon-link[aria-label="Home"]'
      );
      if (link) {
        // Determine destination: Home vs Calendar
        const isHome = link.matches(
          '.nav-brand, .nav-brand *, a[aria-label="Home"], a[aria-label="Home"] *, a[aria-label="Jaou Tunis Home"], a[aria-label="Jaou Tunis Home"] *'
        ) || link.getAttribute('href') === '/' || link.getAttribute('href') === 'index.html';

        const dest = isHome ? '/' : '/calendar';

        // When already on the SAME page: DO NOT show animation, simply refresh/scroll to top
        if (dest === pathname) {
          if (window.scrollY > 30) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            // If already at top, refresh page
            window.location.reload();
          }
          return;
        }

        // Navigating to a DIFFERENT page: play cinematic animation
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        link.classList.add('calendar-btn-launching');
        setTimeout(() => link.classList.remove('calendar-btn-launching'), 450);

        const openMenus = document.querySelectorAll('.menu-overlay.open');
        openMenus.forEach(m => m.classList.remove('open'));

        startTransition(dest);
      }
    };

    const handleKeyDown = (e) => {
      if (isTransitioningRef.current && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) {
        finishTransition();
      }
    };

    document.addEventListener('click', handleNavTransitionClick, true);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleNavTransitionClick, true);
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, router]);

  if (status === 'idle') return null;

  return (
    <div
      className={`calendar-page-wipe ${status}`}
      aria-hidden={status === 'idle'}
      onClick={() => finishTransition()}
    >
      {/* Signature Jaou Charter Background with Subtle Halos */}
      <div className="wipe-bg-charte">
        <div className="wipe-halo-teal"></div>
        <div className="wipe-halo-yellow"></div>
      </div>

      {/* Center Stage: Rotating & Zooming Official Jaou Logo with Realistic Shadow */}
      <div className="wipe-logo-stage">
        <div className="wipe-logo-center">
          <img src="/jaou-logo.png" alt="Jaou Tunis" className="wipe-rotate-zoom-logo" />
        </div>
        <div className="wipe-ground-shadow"></div>
      </div>

      {/* Video Finish (Exact video section from 0:18 to 0:25) */}
      <div className="wipe-video-last-impression" aria-hidden="true">
        <video
          ref={videoRef}
          src="/jaou-transition-18-25.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => finishTransition()}
          className="wipe-last-frame-video"
        />
      </div>
    </div>
  );
}

