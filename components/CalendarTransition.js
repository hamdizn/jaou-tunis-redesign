'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function CalendarTransition() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'entering' | 'leaving'
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleCalendarClick = (e) => {
      // Intercept any link pointing to /calendar or having .calendar-btn
      const link = e.target.closest('a[href="/calendar"], a[href="calendar.html"], .calendar-btn');
      if (link) {
        e.preventDefault();
        if (pathname === '/calendar') {
          // Already on calendar: replay curtain unveil & scroll to top
          setStatus('entering');
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setStatus('leaving');
            setTimeout(() => {
              setStatus('idle');
            }, 650);
          }, 460);
        } else {
          // Navigate to /calendar
          setStatus('entering');
          setTimeout(() => {
            router.push('/calendar');
          }, 460);
        }
      }
    };

    document.addEventListener('click', handleCalendarClick);
    return () => document.removeEventListener('click', handleCalendarClick);
  }, [pathname, router]);

  // When arriving on calendar page from another page, unveil with leaving animation
  useEffect(() => {
    if (pathname === '/calendar' && status === 'entering') {
      const exitTimer = setTimeout(() => {
        setStatus('leaving');
        const hideTimer = setTimeout(() => {
          setStatus('idle');
        }, 650);
        return () => clearTimeout(hideTimer);
      }, 70);
      return () => clearTimeout(exitTimer);
    }
  }, [pathname, status]);

  if (status === 'idle') return null;

  return (
    <div className={`calendar-page-wipe ${status}`} aria-hidden="true">
      <div className="wipe-layer wipe-teal"></div>
      <div className="wipe-layer wipe-yellow"></div>
      <div className="wipe-content">
        <div className="wipe-badge">
          <span className="wipe-dot"></span>
          <span className="wipe-tag">JAOU TUNIS 2026 // ARCHIPEL</span>
        </div>
        <div className="wipe-title-wrap">
          <h2 className="wipe-title">CALENDRIER</h2>
        </div>
        <div className="wipe-dates">
          <span>23 OCTOBRE — 22 NOVEMBRE 2026</span>
          <span className="wipe-sep">•</span>
          <span>MÉDINA DE TUNIS</span>
        </div>
      </div>
    </div>
  );
}
