'use client';

import Link from 'next/link';

export default function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className={menuOpen ? 'header-menu-open' : ''}>
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
            Calendar
          </Link>
        </div>

        <Link href="/" className="nav-brand" aria-label="Jaou Tunis Home">
          {/* Exact Jaou Vector Logo */}
          <svg className="jaou-logo-svg" viewBox="0 0 710 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 C0,36 36,0 80,0 L230,0 L230,350 C230,432 163,500 80,500 C36,500 0,464 0,420 L0,340 L180,340 L180,320 Z"/>
            <path d="M460,0 L710,0 L710,80 C710,124 674,160 630,160 L460,160 Z"/>
            <rect x="260" y="190" width="450" height="130"/>
            <path d="M260,400 C260,356 296,320 340,320 L400,320 L400,500 L340,500 C296,500 260,464 260,420 Z"/>
            <circle cx="490" cy="410" r="65"/>
            <path d="M570,340 L570,430 C570,469 601,500 640,500 C679,500 710,469 710,430 L710,340 L650,340 L650,430 C650,436 645,440 630,430 L630,340 Z"/>
          </svg>
        </Link>

        <div className="nav-right">
          <div className="lang-selector">
            <a href="#" className="lang-item active">FR</a>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="#" className="lang-item">EN</a>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="#" className="lang-item" style={{ fontFamily: 'Amiri, serif' }}>عربي</a>
          </div>
          <a href="#" className="icon-link" aria-label="Search"><i className="fa-solid fa-magnifying-glass"></i></a>
          <a href="#" className="icon-link" aria-label="User Account"><i className="fa-regular fa-user"></i></a>
        </div>
      </nav>
    </header>
  );
}
