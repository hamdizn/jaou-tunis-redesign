'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const BIM_ARTISTS = [
  {
    num: '01',
    name: 'SARAH ZERYAB',
    nameAr: 'سارة زرياب',
    image: '/artists/sarah-zeryab.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Sarah_Zeryab?id=410',
    slug: 'sarah-zeryab',
  },
  {
    num: '02',
    name: 'HAJRA WAHEED',
    nameAr: 'هاجر وحيد',
    image: '/artists/hajra-waheed.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Hajra_Waheed?id=408',
    slug: 'hajra-waheed',
  },
  {
    num: '03',
    name: 'CASTIEL VITORINO BRASILEIRO',
    shortName: 'CASTIEL VITORINO',
    nameAr: 'كاستيل فيتورينو برازيليرو',
    image: '/artists/castiel-vitorino.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Castiel_Vitorino?id=402',
    slug: 'castiel-vitorino',
  },
  {
    num: '04',
    name: 'NATASHA TONTEY',
    nameAr: 'ناتاشا تونتي',
    image: '/artists/natasha-tontey.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Natasha_Tontey?id=404',
    slug: 'natasha-tontey',
  },
  {
    num: '05',
    name: 'HILDEGARD TITUS',
    nameAr: 'هيلدغارد تيتوس',
    image: '/artists/hildegard-titus.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Hildegard_Titus?id=409',
    slug: 'hildegard-titus',
  },
  {
    num: '06',
    name: 'DIANE SEVERIN NGUYEN',
    nameAr: 'ديان سيفيرين نغوين',
    image: '/artists/diane-severin-nguyen.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Diane_Severin_Nguyen?id=412',
    slug: 'diane-severin-nguyen',
  },
  {
    num: '07',
    name: 'YOUNÈS BEN SLIMANE',
    nameAr: 'يونس بن سليمان',
    image: '/artists/younes-ben-slimane.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Younes_Ben_Slimane?id=407',
    slug: 'younes-ben-slimane',
  },
  {
    num: '08',
    name: 'MONA BENYAMIN',
    nameAr: 'منى بنيامين',
    image: '/artists/mona-benyamin.webp',
    link: 'https://jaou.tn/evenement/bim/artiste/Mona_Benyamin?id=400',
    slug: 'mona-benyamin',
  },
];

export default function Home() {
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const [activeArtistIndex, setActiveArtistIndex] = useState(0);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const videoRef = useRef(null);

  // Synchronize document.body class hero-video-active with hero video state
  // Transparent navbar hides logo when photo is displayed, shows logo when video plays
  useEffect(() => {
    if (showHeroVideo) {
      document.body.classList.add('hero-video-active');
    } else {
      document.body.classList.remove('hero-video-active');
    }
    return () => {
      document.body.classList.remove('hero-video-active');
    };
  }, [showHeroVideo]);

  const playVideoCycle = () => {
    setShowHeroVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    // Initial 5-second wait on photo before starting video
    const timer = setTimeout(() => {
      playVideoCycle();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnded = () => {
    // When video ends: return to photo for 5 seconds, then play video again
    setShowHeroVideo(false);
    setTimeout(() => {
      playVideoCycle();
    }, 5000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterSubmitted(true);
    setTimeout(() => {
      setRegisterSubmitted(false);
      setIsRegisterModalOpen(false);
    }, 2800);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
    }, 4500);
  };

  return (
    <ScrollReveal>
      <main>
        {/* FULL-SCREEN HERO IMAGE & VIDEO CYCLE SECTION */}
        <section className="hero-section">
          <div className="hero-container">
            <img 
              src="/hero-poster-exact.png" 
              alt="Jaou Tunis Official Poster Visual" 
              className={`hero-img ${showHeroVideo ? 'fade-out' : ''}`}
            />
            
            <video 
              ref={videoRef}
              src="/save-the-date-jaou-tunis.mp4" 
              className={`hero-video ${showHeroVideo ? 'fade-in' : ''}`}
              muted
              playsInline
              onEnded={handleVideoEnded}
            />

            <div className="hero-bottom-fade"></div>
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

        {/* BLUE ZONE WRAPPER: An Exploration Spotlight + Join Us In Tunis with smooth gradient degradation */}
        <div className="spotlight-join-blue-wrapper">

          {/* SPOTLIGHT SECTION: Photo a gauche, Ecriture a droite avec bouton Explorer le calendrier et animations */}
          <section className="home-spotlight-section">
            <div className="home-spotlight-container">
              
              {/* PHOTO A GAUCHE (Survol affiche le message en flip 3D) */}
              <div className="home-spotlight-photo-col reveal-slide-left">
                <div 
                  className="spotlight-photo-flip-card"
                  onClick={() => setIsPhotoFlipped(!isPhotoFlipped)}
                >
                  <div className={`spotlight-photo-flip-inner ${isPhotoFlipped ? 'is-flipped' : ''}`}>
                    {/* Face avant : La Photo */}
                    <div className="spotlight-photo-front">
                      <img 
                        src="/watermelon-boy.png" 
                        alt="Biennale Archipel - Watermelon Boy" 
                        className="spotlight-photo-img"
                      />
                      <div className="spotlight-photo-hint">
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                        <span>Survoler la photo</span>
                      </div>
                    </div>
                    {/* Face arrière : Message affiche au survol */}
                    <div className="spotlight-photo-back">
                      <span className="photo-back-tag">JAOU TUNIS &rsquo;26</span>
                      <h3 className="photo-back-quote">
                        AN EXPLORATION OF &lsquo;RESISTANCE AS THE DEEPEST FORM OF LOVE&rsquo;
                      </h3>
                      <p className="photo-back-sub">BIENNALE ARCHIPEL &bull; TUNIS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ECRITURE A DROITE SANS CADRE */}
              <div className="home-spotlight-text-col reveal-slide-right">
                <div className="home-spotlight-clean-text">
                  
                  <div className="spotlight-tag-row">
                    <span className="spotlight-tag-pill">
                      <span className="pixel-dot-accent"></span> JAOU TUNIS &rsquo;26
                    </span>
                    <span className="spotlight-cat-pill">BIENNALE ARCHIPEL</span>
                  </div>

                  <h2 className="spotlight-title">
                    AN EXPLORATION OF &lsquo;RESISTANCE AS THE DEEPEST FORM OF LOVE&rsquo;
                  </h2>

                  <p className="spotlight-description">
                    Au cœur de la Biennale Archipel, une traversée curatoriale majeure inspirée par la pensée de Khalil Gibran. Une exploration poétique et engagée des solidarités, de la mémoire et de la transformation contemporaine.
                  </p>

                  <div className="spotlight-meta-info">
                    <div className="spotlight-meta-item">
                      <i className="fa-regular fa-calendar-days"></i>
                      <span>23 Octobre — 22 Novembre 2026</span>
                    </div>
                    <div className="spotlight-meta-item">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>Caserne El Attarine &bull; Médina de Tunis</span>
                    </div>
                  </div>

                  <div className="spotlight-cta-wrap">
                    <Link href="/calendar" className="spotlight-calendar-btn">
                      <span>EXPLORER LE CALENDRIER</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* Join Us In Tunis Section */}
          <section className="join-section-wrapper">
            <div className="join-section">
              <div className="join-card reveal-form-card">
                <div className="join-text">
                  <div className="pixel-tag"><span className="pixel-dot-accent"></span> [ 01 // CALL FOR ARTISTS & VISITORS ]</div>
                  <h2>JOIN US IN TUNIS ✦</h2>
                  <p>Whether you are an artist, curator, collector, journalist, cultural practitioner or long-time friend of Jaou, we would be delighted to welcome you.</p>
                </div>
                <button onClick={() => setIsRegisterModalOpen(true)} className="join-btn">
                  REGISTER YOUR INTEREST <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* ARTISTS SECTION (Capture 2 Expanding Accordion Gallery with Capture 1 BIM'26 Styling) */}
        <section className="artists-accordion-section" id="artistsSection">
          <div className="artists-accordion-container">
            <div className="artists-accordion-header reveal-on-scroll">
              <div className="artists-header-text">
                <div className="pixel-tag"><span className="pixel-dot-accent"></span> [ 01.5 // BIENNALE ARTISTS // BIM'26 ]</div>
                <h2 className="artists-accordion-title">ARTISTS — BECOMING THE OCEAN ✦</h2>
                <p className="artists-accordion-desc">
                  16 artistes et cinéastes internationaux réunis à Tunis pour la Biennale de l'Image en Mouvement 2026.
                </p>
              </div>
              <a href="https://jaou.tn/evenement/bim/artistes" target="_blank" rel="noopener noreferrer" className="artists-view-all-link">
                <span>Voir tous les artistes</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>

          {/* Full-Width Series of Artists (Edge-to-Edge) */}
          <div className="artists-accordion-track reveal-artists-track" id="artistsAccordion">
            {BIM_ARTISTS.map((artist, idx) => {
              const isActive = activeArtistIndex === idx;
              return (
                <article
                  key={artist.slug}
                  className={`artist-accordion-card ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveArtistIndex(idx)}
                  onClick={() => setActiveArtistIndex(idx)}
                >
                  <img src={artist.image} alt={artist.name} className="artist-card-bg" loading="lazy" />
                  <div className="artist-card-overlay"></div>

                  {/* Collapsed Vertical Spine */}
                  <div className="artist-collapsed-spine">
                    <span className="artist-spine-num">{artist.num}</span>
                    <span className="artist-spine-name">{artist.shortName || artist.name}</span>
                    <span className="artist-spine-dot"></span>
                  </div>

                  {/* Expanded Full Content (Capture 1 BIM'26 Design) */}
                  <div className="artist-expanded-wrap">
                    <div className="artist-bim-header">
                      <div className="artist-bim-subtitle-ar">بينالي الصورة المتحركة</div>
                      <div className="artist-bim-subtitle-fr">BIENNALE DE L'IMAGE EN MOUVEMENT</div>
                      <h3 className="artist-bim-name-latin">{artist.name}</h3>
                      <div className="artist-bim-name-ar">{artist.nameAr}</div>
                    </div>
                    <div className="artist-expanded-footer">
                      <div className="artist-footer-badge">
                        <span className="badge-dot"></span>
                        <span>BIM'26 // ARTISTE INVITÉ</span>
                      </div>
                      <a 
                        href={artist.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="artist-footer-link" 
                        aria-label={`Profil ${artist.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
            </div>
        </section>

        {/* Smooth Transition to Yellow below Artists */}
        <div className="white-to-yellow-fade"></div>

        {/* Newsletter Section (100% Solid Jaou Yellow #FEF8D6) with Video Player below the form */}
        <section className="newsletter-section-wrapper">
          <div className="newsletter-section">
            <div className="newsletter-card reveal-form-card">
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

                <div className="input-group" style={{ marginBottom: '1.4rem' }}>
                  <label className="input-label-pixel">// EMAIL ADDRESS</label>
                  <input type="email" className="input-modern" placeholder="artist@domain.com" required />
                </div>

                <button type="submit" className="subscribe-btn">
                  SUBSCRIBE <i className="fa-solid fa-paper-plane"></i>
                </button>

                {newsletterSubmitted && (
                  <div className="form-success-toast">
                    <span className="check-icon"><i className="fa-solid fa-check"></i></span>
                    <span>✦ Inscription réussie ! Bienvenue dans le réseau Jaou Tunis 2026.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Save The Date Video Player Frame (Positioned below the Join Our Artists form) */}
            <div className="video-frame-wrapper">
              <div className="video-frame">
                <div className="video-frame-badge">
                  <span className="badge-dot"></span>
                  <span>SAVE THE DATE // JAOU TUNIS 2026</span>
                </div>
                <video controls playsInline poster="/hero-poster-exact.png">
                  <source src="/save-the-date-jaou-tunis.mp4" type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture de vidéo.
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Smooth Yellow-to-White Transition Below Newsletter */}
        <div className="yellow-to-white-fade"></div>

        {/* FORM 1: PRE-REGISTRATION / INTEREST MODAL FORM */}
        <div className={`modal-overlay ${isRegisterModalOpen ? 'open' : ''}`} onClick={(e) => e.target.classList.contains('modal-overlay') && setIsRegisterModalOpen(false)}>
          <div className="modal-card">
            <button className="modal-close-btn" onClick={() => setIsRegisterModalOpen(false)} aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="pixel-tag" style={{ marginBottom: '0.8rem' }}>
              <span className="pixel-dot-accent"></span> [ FORM 01 // PRE-REGISTRATION ]
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--jaou-black)' }}>
              JOIN US IN TUNIS ✦
            </h2>

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label-pixel">// FULL NAME</label>
                  <input type="text" className="input-modern" placeholder="e.g. Salma Trabelsi" required />
                </div>
                <div className="input-group">
                  <label className="input-label-pixel">// EMAIL ADDRESS</label>
                  <input type="email" className="input-modern" placeholder="salma@domain.com" required />
                </div>
              </div>

              <div className="form-grid" style={{ marginBottom: '2rem' }}>
                <div className="input-group">
                  <label className="input-label-pixel">// CATEGORY / ROLE</label>
                  <select className="select-modern" required>
                    <option value="">Select category...</option>
                    <option value="artist">Artist / Practitioner</option>
                    <option value="curator">Curator / Collector</option>
                    <option value="journalist">Journalist / Press</option>
                    <option value="visitor">Visitor / Friend of Jaou</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label-pixel">// CITY / COUNTRY</label>
                  <input type="text" className="input-modern" placeholder="e.g. Tunis, Tunisia" required />
                </div>
              </div>

              <button type="submit" className="subscribe-btn" style={{ width: '100%', justifyContent: 'center' }}>
                SUBMIT PRE-REGISTRATION <i className="fa-solid fa-paper-plane"></i>
              </button>

              {registerSubmitted && (
                <div className="form-success-toast">
                  <span className="check-icon"><i className="fa-solid fa-check"></i></span>
                  <span>✦ Pré-inscription enregistrée ! Nous vous contacterons très prochainement.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </ScrollReveal>
  );
}
