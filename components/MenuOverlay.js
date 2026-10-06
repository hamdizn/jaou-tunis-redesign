'use client';

import Link from 'next/link';
import MoleculeCanvas from './MoleculeCanvas';

export default function MenuOverlay({ menuOpen, setMenuOpen }) {
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} id="menuOverlay">
      {/* Full-Screen Ambient Molecular Background Canvas */}
      <MoleculeCanvas />

      <div className="menu-list-container">
        <ul className="menu-vertical-list">
          
          {/* I ABOUT US */}
          <li className="menu-list-item">
            <div className="list-category-head">
              <span className="list-num">I.</span>
              <span className="list-title">ABOUT US</span>
            </div>
            <div className="list-sub-options">
              <Link href="/#edito" onClick={handleLinkClick}>Jaou Tunis</Link>
              <a href="https://www.kamellazaarfoundation.org/" target="_blank" rel="noopener noreferrer">KLF</a>
            </div>
          </li>

          {/* II JAOU TUNIS'26 */}
          <li className="menu-list-item">
            <div className="list-category-head">
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
          <li className="menu-list-item">
            <div className="list-category-head">
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
          <li className="menu-list-item">
            <div className="list-category-head">
              <span className="list-num">IV.</span>
              <span className="list-title">ART EXPLORA FESTIVAL</span>
            </div>
            <div className="list-sub-options">
              <Link href="/calendar" onClick={handleLinkClick}>About the Festival</Link>
              <Link href="/calendar" onClick={handleLinkClick}>Undertow / Contre;Courant</Link>
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
            <div className="list-category-head">
              <span className="list-num">VII.</span>
              <span className="list-title">PRACTICAL INFORMATION</span>
            </div>
            <div className="list-sub-options">
              <a href="#">Map</a>
              <a href="#">FAQs</a>
              <a href="#">Search</a>
            </div>
          </li>
        </ul>

      </div>
    </div>
  );
}
