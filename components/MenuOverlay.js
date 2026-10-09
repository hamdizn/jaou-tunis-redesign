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
            <Link href="/#edito" onClick={handleLinkClick} className="list-category-head">
              <span className="list-num">I.</span>
              <span className="list-title">ABOUT US</span>
            </Link>
            <div className="list-sub-options">
              <Link href="/#edito" onClick={handleLinkClick}>&#123; Jaou Tunis &#125;</Link>
              <a href="https://www.kamellazaarfoundation.org/" target="_blank" rel="noopener noreferrer">&#123; KLF &#125;</a>
            </div>
          </li>

          {/* II JAOU TUNIS'26 */}
          <li className="menu-list-item">
            <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
              <span className="list-num">II.</span>
              <span className="list-title">JAOU TUNIS'26</span>
            </Link>
            <div className="list-sub-options">
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Archipelago Biennale &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Exhibitions &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Concerts &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Performances &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Calendar &#125;</Link>
            </div>
          </li>

          {/* III BIM'26 */}
          <li className="menu-list-item">
            <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
              <span className="list-num">III.</span>
              <span className="list-title">BIM'26</span>
            </Link>
            <div className="list-sub-options">
              <Link href="/calendar" onClick={handleLinkClick}>&#123; About BIM'26 &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Becoming the Ocean &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Artists &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Venue &#125;</Link>
            </div>
          </li>

          {/* IV ART EXPLORA FESTIVAL */}
          <li className="menu-list-item">
            <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
              <span className="list-num">IV.</span>
              <span className="list-title">ART EXPLORA FESTIVAL</span>
            </Link>
            <div className="list-sub-options">
              <Link href="/calendar" onClick={handleLinkClick}>&#123; About the Festival &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Undertow / Contre;Courant &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Related Programme &#125;</Link>
            </div>
          </li>

          {/* V PARTNERS */}
          <li className="menu-list-item">
            <div className="list-category-head">
              <span className="list-num">V.</span>
              <span className="list-title">PARTNERS</span>
            </div>
            <div className="list-sub-options">
              <a href="https://centre.ch/fr" target="_blank" rel="noopener noreferrer">&#123; Centre d'Art Contemporain Genève &#125;</a>
              <a href="https://www.artexplora.org/" target="_blank" rel="noopener noreferrer">&#123; Art Explora &#125;</a>
            </div>
          </li>

          {/* VI MEDIA */}
          <li className="menu-list-item">
            <div className="list-category-head">
              <span className="list-num">VI.</span>
              <span className="list-title">MEDIA</span>
            </div>
            <div className="list-sub-options">
              <a href="#">&#123; Press Kit &#125;</a>
              <a href="#">&#123; They Talked About Us &#125;</a>
            </div>
          </li>

          {/* VII PRACTICAL INFORMATION */}
          <li className="menu-list-item">
            <Link href="/calendar" onClick={handleLinkClick} className="list-category-head">
              <span className="list-num">VII.</span>
              <span className="list-title">PRACTICAL INFORMATION</span>
            </Link>
            <div className="list-sub-options">
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Map &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; FAQs &#125;</Link>
              <Link href="/calendar" onClick={handleLinkClick}>&#123; Search &#125;</Link>
            </div>
          </li>
        </ul>

      </div>
    </div>
  );
}
