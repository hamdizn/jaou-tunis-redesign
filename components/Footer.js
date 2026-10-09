import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* TOP ROW: SOCIAL MEDIA ICONS & PARTNER LOGOS */}
        <div className="footer-top-row">
          
          {/* SOCIAL MEDIA CIRCLES */}
          <div className="footer-social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="SoundCloud">
              <i className="fa-brands fa-soundcloud"></i>
            </a>
          </div>

          {/* PARTNER LOGOS GROUP */}
          <div className="footer-partners-wrap">
            
            {/* ORGANISED BY */}
            <div className="partner-group-col">
              <span className="partner-label">Organised by</span>
              <div className="partner-logo-box">
                <img src="/klf-logo.png" alt="Kamel Lazaar Foundation" className="partner-img klf-img" />
              </div>
            </div>

            {/* IN PARTNERSHIP WITH */}
            <div className="partner-group-col">
              <span className="partner-label">In partnership with</span>
              <div className="partner-logo-box partner-duo">
                <img src="/cacg-logo.png" alt="Centre d'Art Contemporain Genève" className="partner-img cacg-img" />
                <img src="/artexplora-logo.png" alt="Art Explora" className="partner-img artexplora-img" />
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT LINE */}
        <div className="footer-bottom-bar">
          <p>© KLF - 2026 &nbsp;|&nbsp; <a href="#">Mentions légales</a> &nbsp;|&nbsp; <a href="#" target="_blank" rel="noopener noreferrer">Powered by Hamdi Zanadi</a></p>
        </div>

      </div>
    </footer>
  );
}
