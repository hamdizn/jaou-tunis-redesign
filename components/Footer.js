export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="partner-grid">
          <div className="partner-group reveal-on-scroll">
            <span className="partner-label">Organised by</span>
            <div className="partner-logo-item">
              <i className="fa-solid fa-landmark"></i> Kamel Lazaar Foundation
            </div>
          </div>

          <div className="partner-group reveal-on-scroll reveal-delay-1">
            <span className="partner-label">In partnership with</span>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div className="partner-logo-item">
                <i className="fa-solid fa-building-columns"></i> Centre d'Art Contemporain Genève
              </div>
              <div className="partner-logo-item">
                <i className="fa-solid fa-ship"></i> Art Explora
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© KLF - 2026</div>
          <div className="footer-links">
            <a href="#">Mentions légales</a> |
            <a href="http://lisa-digit.com" target="_blank" rel="noopener noreferrer">Powered by LiSa Digit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
