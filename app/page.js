'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Merci pour votre inscription à la newsletter Jaou Tunis !');
  };

  return (
    <ScrollReveal>
      <main>
        {/* FULL-SCREEN HERO IMAGE SECTION */}
        <section className="hero-section">
          <div className="hero-container">
            <img 
              src="/hero-poster-exact.webp" 
              alt="Jaou Tunis Official Poster Visual" 
            />
          </div>
        </section>

        {/* Edito Paragraph Section */}
        <section id="edito" className="edito-section">
          <div className="edito-body">
            <p className="reveal-on-scroll">
              This October, one of the world's leading biennials of the moving image crosses the Mediterranean.
            </p>
            
            <p className="reveal-on-scroll reveal-delay-1">
              For the first time in its history, the Biennale de l'Image en Mouvement leaves Geneva and arrives in Tunis, marking its first presentation on the African continent. At the same time, Art Explora's Mediterranean festival completes its journey by choosing Tunis as its final destination.
            </p>

            <p className="reveal-on-scroll reveal-delay-2">
              Organised by the <a href="https://www.kamellazaarfoundation.org/" target="_blank" rel="noopener noreferrer">Kamel Lazaar Foundation</a>, in partnership with the <a href="https://centre.ch/fr" target="_blank" rel="noopener noreferrer">Centre d'Art Contemporain Genève</a> and the <a href="https://www.artexplora.org/" target="_blank" rel="noopener noreferrer">Art Explora Foundation</a>, the eighth edition of Jaou Tunis unfolds across exhibitions, performances, concerts, conversations and public programmes that bring artists, writers, musicians and audiences together over the course of a month.<br />
              At its centre is <strong>Becoming the Ocean</strong>, a major exhibition of BIM’26, bringing together sixteen newly commissioned artists from Africa, the Arab world, Asia, Latin America and their diasporas.
            </p>

            <p className="reveal-on-scroll">
              Inspired by Khalil Gibran's image of a river that mistakes transformation for disappearance, the exhibition reflects on a world where inherited structures are increasingly unable to respond to the crises they have produced. Rather than asking how to preserve a world already slipping away, Becoming the Ocean asks what new forms of relation, memory and solidarity become possible when we recognise that survival depends not on separation, but on interdependence.
            </p>

            <p className="reveal-on-scroll reveal-delay-1">
              Presented within the nineteenth-century Caserne El Attarine in the Medina of Tunis, the exhibition is accompanied by collateral exhibitions, performances, concerts, Jaou Nights, workshops, a symposium and city-wide encounters that invite visitors to experience Tunis through art, conversation and hospitality.
            </p>
          </div>
        </section>

        {/* Join Us In Tunis Section */}
        <section className="join-section">
          <div className="join-card reveal-on-scroll">
            <div className="join-text">
              <div className="pixel-tag"><span className="pixel-dot-accent"></span> [ 01 // CALL FOR ARTISTS & VISITORS ]</div>
              <h2>JOIN US IN TUNIS ✦</h2>
              <p>Whether you are an artist, curator, collector, journalist, cultural practitioner or long-time friend of Jaou, we would be delighted to welcome you.</p>
            </div>
            <a href="mailto:visit@jaou.tn" className="join-btn">
              REGISTER YOUR INTEREST <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          {/* Save The Date Video Player Frame */}
          <div className="video-frame reveal-zoom">
            <video controls playsInline poster="/hero-poster-exact.webp">
              <source src="/videos/save-the-date-jaou-tunis.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture de vidéo.
            </video>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section reveal-on-scroll">
          <div className="newsletter-card">
            <div className="newsletter-header">
              <div className="pixel-tag"><span className="pixel-dot-accent"></span> [ 02 // NETWORK & NEWSLETTER ]</div>
              <h2 className="newsletter-title">JOIN OUR ARTIST NETWORK ✦</h2>
            </div>

            <form onSubmit={handleNewsletterSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label-pixel">// FIRST NAME</label>
                  <input type="text" className="input-modern" placeholder="e.g. Maya" required />
                </div>
                <div className="input-group">
                  <label className="input-label-pixel">// LAST NAME</label>
                  <input type="text" className="input-modern" placeholder="e.g. Ben Saïd" required />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '3rem' }}>
                <label className="input-label-pixel">// EMAIL ADDRESS</label>
                <input type="email" className="input-modern" placeholder="artist@domain.com" required />
              </div>

              <button type="submit" className="subscribe-btn">
                SUBSCRIBE <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </section>
      </main>
    </ScrollReveal>
  );
}
