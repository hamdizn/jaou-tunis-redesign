'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ menuOpen, setMenuOpen }) {
  const pathname = usePathname();
  const isCalendarPage = pathname === '/calendar';

  return (
    <header className={`${menuOpen ? 'header-menu-open' : ''} ${isCalendarPage ? 'header-yellow' : ''}`}>
      <nav className="navbar">
        <div className="nav-left">
          {/* Minimalist Burger Button with Kinetic Text Roll */}
          <button 
            className={`menu-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="burger-icon">
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
            </div>
            
            <span className="menu-text-wrap">
              <span className="menu-text-inner">
                <span className="text-line">Menu</span>
                <span className="text-line">Menu</span>
                <span className="text-line">Fermer</span>
              </span>
            </span>
          </button>

          <Link href="/calendar" className="calendar-btn">
            <i className="fa-regular fa-calendar-days"></i>
            <span>Calendar</span>
          </Link>
        </div>

        <Link href="/" className="nav-brand" aria-label="Jaou Tunis Home" onClick={() => setMenuOpen(false)}>
          <img src="/jaou-logo.png" alt="Jaou Tunis" className="jaou-logo-img" />
        </Link>

        <div className="nav-right">
          <div className="lang-selector">
            <a href="#" className="lang-item">FR</a>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="#" className="lang-item active">EN</a>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="#" className="lang-item" style={{ fontFamily: 'Amiri, serif' }}>عربي</a>
          </div>
          <Link href="/" className="icon-link" aria-label="Home" onClick={() => setMenuOpen(false)}><i className="fa-solid fa-house"></i></Link>
          <a href="#" className="icon-link" aria-label="User Account"><i className="fa-regular fa-user"></i></a>
        </div>
      </nav>
    </header>
  );
}
