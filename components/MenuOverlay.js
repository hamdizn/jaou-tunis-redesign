'use client';

import Link from 'next/link';

export default function MenuOverlay({ menuOpen, setMenuOpen }) {
  const handleLinkClick = () => {
    setMenuOpen(false);
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
              <li className="menu-list-item">
                <Link href="/#edito" onClick={handleLinkClick} className="list-category-head">
                  <span className="list-num">I.</span>
                  <span className="list-title">ABOUT US</span>
                </Link>
                <div className="list-sub-options">
                  <Link href="/#edito" onClick={handleLinkClick}>Jaou Tunis</Link>
                  <a href="https://www.kamellazaarfoundation.org/" target="_blank" rel="noopener noreferrer">KLF Foundation</a>
                </div>
              </li>

              {/* II JAOU TUNIS'26 */}
              <li className="menu-list-item">
                <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
                  <span className="list-num">II.</span>
                  <span className="list-title">JAOU TUNIS'26</span>
                </Link>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>Archipelago Biennale</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Exhibitions</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Concerts</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Performances</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Calendar</Link>
                </div>
              </li>

              {/* III BIM'26 */}
              <li className="menu-list-item">
                <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
                  <span className="list-num">III.</span>
                  <span className="list-title">BIM'26</span>
                </Link>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>About BIM'26</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Becoming the Ocean</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Artists</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Venue</Link>
                </div>
              </li>

              {/* IV ART EXPLORA FESTIVAL */}
              <li className="menu-list-item">
                <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
                  <span className="list-num">IV.</span>
                  <span className="list-title">ART EXPLORA FESTIVAL</span>
                </Link>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>About the Festival</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Undertow / Contre-Courant</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Related Programme</Link>
                </div>
              </li>

              {/* V PARTNERS */}
              <li className="menu-list-item">
                <div className="list-category-head">
                  <span className="list-num">V.</span>
                  <span className="list-title">PARTNERS</span>
                </div>
                <div className="list-sub-options">
                  <a href="https://centre.ch/fr" target="_blank" rel="noopener noreferrer">Centre d'Art Contemporain Genève</a>
                  <a href="https://www.artexplora.org/" target="_blank" rel="noopener noreferrer">Art Explora</a>
                </div>
              </li>

              {/* VI MEDIA */}
              <li className="menu-list-item">
                <div className="list-category-head">
                  <span className="list-num">VI.</span>
                  <span className="list-title">MEDIA</span>
                </div>
                <div className="list-sub-options">
                  <a href="#">Press Kit</a>
                  <a href="#">They Talked About Us</a>
                </div>
              </li>

              {/* VII PRACTICAL INFORMATION */}
              <li className="menu-list-item">
                <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
                  <span className="list-num">VII.</span>
                  <span className="list-title">PRACTICAL INFORMATION</span>
                </Link>
                <div className="list-sub-options">
                  <Link href="/calendar" onClick={handleLinkClick}>Map</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>FAQs</Link>
                  <Link href="/calendar" onClick={handleLinkClick}>Search</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Photo Spotlight Card */}
          <div className="menu-photo-column">
            <div className="menu-spotlight-card">
              <div className="menu-photo-img-wrap">
                <img src="/watermelon-boy.png" alt="Jaou Tunis '26 - Watermelon Boy" />
                <span className="menu-photo-live-badge">FOCUS BIENNALE</span>
              </div>
              <div className="menu-photo-info">
                <div className="menu-photo-tag-row">
                  <span className="menu-photo-tag">JAOU TUNIS &rsquo;26</span>
                  <span className="menu-photo-cat">BIENNALE ARCHIPEL</span>
                </div>
                <h4 className="menu-photo-quote">
                  AN EXPLORATION OF &lsquo;RESISTANCE AS THE DEEPEST FORM OF LOVE&rsquo;
                </h4>
                <p className="menu-photo-date">
                  <i className="fa-regular fa-calendar"></i> 23 Octobre — 22 Novembre 2026 &bull; Tunis
                </p>
                <Link href="/calendar" onClick={handleLinkClick} className="menu-photo-link">
                  <span>Explorer le Calendrier</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
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
