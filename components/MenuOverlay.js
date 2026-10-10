'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function MenuOverlay({ menuOpen, setMenuOpen }) {
  const lensRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleToggleItem = (index, e) => {
    // If on touch device, toggle active state
    if (typeof window !== 'undefined' && (window.innerWidth <= 900 || 'ontouchstart' in window)) {
      setActiveItem(prev => prev === index ? null : index);
    }
  };

  const handleLensMouseMove = (e) => {
    if (!lensRef.current) return;
    const rect = lensRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lensRef.current.style.setProperty('--lens-x', `${x}px`);
    lensRef.current.style.setProperty('--lens-y', `${y}px`);
    lensRef.current.style.setProperty('--lens-opacity', '1');
  };

  const handleLensMouseLeave = () => {
    if (!lensRef.current) return;
    lensRef.current.style.setProperty('--lens-opacity', '0');
  };

  return (
    <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} id="menuOverlay">
      <div className="menu-list-container">
        {/* Creative Topbar inside Menu */}
        <div className="menu-container-topbar">
          <div className="menu-topbar-tag">
            <span className="menu-topbar-dot"></span>
            <span>JAOU TUNIS 2026 // INDEX BIENNALE ARCHIPEL</span>
          </div>
          <div className="menu-topbar-meta">
            <span>23 OCT — 22 NOV 2026</span>
            <span className="meta-sep">•</span>
            <span>MÉDINA DE TUNIS</span>
          </div>
        </div>

        <div className="menu-content-split">
          
          {/* Left Column: Menu Items */}
          <div className="menu-nav-column">
            <ul className="menu-vertical-list">
              
              {/* I ABOUT US */}
              <li className={`menu-list-item ${activeItem === 0 ? 'active' : ''}`}>
                <div onClick={(e) => handleToggleItem(0, e)} className="list-category-head">
                  <span className="list-num">I.</span>
                  <span className="list-title">ABOUT US</span>
                </div>
                <div className="list-sub-options">
                  <Link href="/#edito" onClick={handleLinkClick}>Jaou Tunis</Link>
                  <a href="https://www.kamellazaarfoundation.org/" target="_blank" rel="noopener noreferrer">KLF Foundation</a>
                </div>
              </li>

              {/* II JAOU TUNIS'26 */}
              <li className={`menu-list-item ${activeItem === 1 ? 'active' : ''}`}>
                <div onClick={(e) => handleToggleItem(1, e)} className="list-category-head">
                  <span className="list-num">II.</span>
                  <span className="list-title">JAOU TUNIS'26</span>
                </div>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>Archipelago Biennale</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Exhibitions</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Concerts</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Performances</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Calendar</Link>
                </div>
              </li>

              {/* III BIM'26 */}
              <li className={`menu-list-item ${activeItem === 2 ? 'active' : ''}`}>
                <div onClick={(e) => handleToggleItem(2, e)} className="list-category-head">
                  <span className="list-num">III.</span>
                  <span className="list-title">BIM'26</span>
                </div>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>About BIM'26</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Becoming the Ocean</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Artists</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Venue</Link>
                </div>
              </li>

              {/* IV ART EXPLORA FESTIVAL */}
              <li className={`menu-list-item ${activeItem === 3 ? 'active' : ''}`}>
                <div onClick={(e) => handleToggleItem(3, e)} className="list-category-head">
                  <span className="list-num">IV.</span>
                  <span className="list-title">ART EXPLORA FESTIVAL</span>
                </div>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>About the Festival</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Undertow / Contre-Courant</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Related Programme</Link>
                </div>
              </li>

              {/* V PARTNERS */}
              <li className={`menu-list-item ${activeItem === 4 ? 'active' : ''}`}>
                <div onClick={(e) => handleToggleItem(4, e)} className="list-category-head">
                  <span className="list-num">V.</span>
                  <span className="list-title">PARTNERS</span>
                </div>
                <div className="list-sub-options">
                  <a href="https://centre.ch/fr" target="_blank" rel="noopener noreferrer">Centre d'Art Contemporain Genève</a>
                  <a href="https://www.artexplora.org/" target="_blank" rel="noopener noreferrer">Art Explora</a>
                </div>
              </li>

              {/* VI MEDIA */}
              <li className={`menu-list-item ${activeItem === 5 ? 'active' : ''}`}>
                <div onClick={(e) => handleToggleItem(5, e)} className="list-category-head">
                  <span className="list-num">VI.</span>
                  <span className="list-title">MEDIA</span>
                </div>
                <div className="list-sub-options">
                  <a href="#">Press Kit</a>
                  <a href="#">They Talked About Us</a>
                </div>
              </li>

              {/* VII PRACTICAL INFORMATION */}
              <li className={`menu-list-item ${activeItem === 6 ? 'active' : ''}`}>
                <div onClick={(e) => handleToggleItem(6, e)} className="list-category-head">
                  <span className="list-num">VII.</span>
                  <span className="list-title">PRACTICAL INFORMATION</span>
                </div>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>Map</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>FAQs</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Search</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Pure Graphic Photo with Circular Cursor Reveal (Sans cadre blanc, sans texte) */}
          <div className="menu-photo-column">
            <div 
              className="menu-photo-img-wrap graphic-lens-container"
              ref={lensRef}
              onMouseMove={handleLensMouseMove}
              onMouseEnter={handleLensMouseMove}
              onMouseLeave={handleLensMouseLeave}
            >
              {/* Layer 1: Stylized Graphic (Capture 2 Style) */}
              <div className="graphic-layer-base">
                <img src="/becoming-the-ocean.jpg" alt="Becoming The Ocean - BIM'26" className="graphic-img-stylized" />
                <div className="graphic-gradient-overlay"></div>
              </div>

              {/* Layer 2: Real Colors Revealed in Circular Cursor Lens */}
              <div className="graphic-layer-real">
                <img src="/becoming-the-ocean.jpg" alt="Becoming The Ocean - Real Colors" className="graphic-img-real" />
              </div>

              {/* Tracking Lens Ring, Hint & Badge */}
              <div className="graphic-lens-ring"></div>
              <span className="graphic-lens-hint">✦ Déplacez le curseur pour révéler</span>
              <span className="menu-photo-live-badge">FOCUS BIM&rsquo;26</span>
            </div>
          </div>
        </div>

        {/* Creative Bottombar inside Menu */}
        <div className="menu-container-bottombar">
          <div className="menu-bottom-partners">
            <span>KAMEL LAZAAR FOUNDATION</span>
            <span className="meta-sep">/</span>
            <span>CAC GENÈVE</span>
            <span className="meta-sep">/</span>
            <span>ART EXPLORA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
