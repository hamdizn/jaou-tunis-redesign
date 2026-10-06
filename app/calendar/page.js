'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function CalendarPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const events = [
    {
      id: 1,
      category: 'exhibition',
      categoryTag: "BIM'26 // EXPOSITION",
      tagClass: 'exhibition-tag',
      date: '09.10.2026',
      title: "Becoming the Ocean — Vernissage BIM'26",
      location: 'Caserne El Attarine, Médina',
      time: '18:00 — 23:00',
      description: "Inauguration officielle de la Biennale de l'Image en Mouvement avec 16 œuvres et installations inédites commandées à des artistes d'Afrique, du monde arabe et de leurs diasporas.",
      curators: 'Commissaires : Andrea Bellini & Nora Razian'
    },
    {
      id: 2,
      category: 'concert',
      categoryTag: 'JAOU NIGHTS // CONCERT',
      tagClass: 'concert-tag',
      date: '10.10.2026',
      title: 'Nocturne Sonore & Musiques Expérimentales',
      location: 'Palais Kheireddine',
      time: '21:00 — 02:00',
      description: 'Une nuit immersive mêlant sonorités électro-acoustiques méditerranéennes, performances vidéo en direct et sets DJ d\'artistes régionaux.',
      curators: 'Line-up : Deena Abdelwahed, Arabstazy & Guests'
    },
    {
      id: 3,
      category: 'artexplora',
      categoryTag: 'ART EXPLORA // BATEAU-MUSÉE',
      tagClass: 'artexplora-tag',
      date: '12.10.2026',
      title: 'Undertow / Contre;Courant — Arrivée du Catamaran',
      location: 'Port de Tunis / La Goulette',
      time: '16:00 — 22:00',
      description: 'Le catamaran-musée Art Explora accoste à Tunis pour clore son odyssée méditerranéenne avec des parcours d\'expositions immersives et un voyage sonore réalisé avec l\'Ircam.',
      curators: 'Entrée libre sur réservation'
    },
    {
      id: 4,
      category: 'performance',
      categoryTag: 'SYMPOSIUM // PERFORMANCES',
      tagClass: 'performance-tag',
      date: '15.10.2026',
      title: 'Mémoire, Eau & Archipels Méditerranéens',
      location: 'Église Sainte-Croix',
      time: '10:00 — 17:00',
      description: 'Journée de débats, conférences d\'artistes, philosophes et chercheurs autour des nouvelles formes de mémoire et de solidarité en Méditerranée.',
      curators: 'Modération : KLF & Commissaires invités'
    },
    {
      id: 5,
      category: 'performance',
      categoryTag: 'PARCOURS // PROJECTIONS',
      tagClass: 'performance-tag',
      date: '18.10.2026',
      title: 'Parcours Lumineux & Projections Architecturales',
      location: 'Ruelles de la Médina & Dar Lasram',
      time: '19:30 — 23:00',
      description: 'Promenade artistique nocturne à travers la Médina guidée par des oeuvres de mapping vidéo et des installations de lumière éphémères.',
      curators: 'Accès libre dans toute la Médina'
    },
    {
      id: 6,
      category: 'concert',
      categoryTag: 'CLÔTURE // LIVE PERFORMANCE',
      tagClass: 'concert-tag',
      date: '30.10.2026',
      title: 'Grande Soirée de Clôture Jaou Tunis 2026',
      location: 'Caserne El Attarine',
      time: '20:00 — 01:00',
      description: 'Restitution collective des résidences artistiques, performances sonores en direct et concert de clôture de la 8ème édition de Jaou Tunis.',
      curators: 'Réservation obligatoire'
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.category === activeFilter);

  return (
    <ScrollReveal>
      <main>
        {/* CALENDAR HERO SECTION */}
        <section className="calendar-hero">
          <div className="calendar-hero-container">
            <div className="pixel-tag"><span className="pixel-dot-accent"></span> [ 03 // FESTIVAL TIME-MATRIX ]</div>
            <h1 className="calendar-title">CALENDRIER & PROGRAMMATION</h1>
            <p className="calendar-subtitle">
              Découvrez l'intégralité des expositions, concerts live, performances et symposiums de Jaou Tunis 2026 à travers la Médina et la baie de Tunis.
            </p>
          </div>
        </section>

        {/* INTERACTIVE FILTER SECTION */}
        <section className="calendar-section">
          <div className="calendar-controls reveal-on-scroll">
            <div className="filter-categories">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                <span className="btn-dot"></span> [ TOUS / ALL ]
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'exhibition' ? 'active' : ''}`}
                onClick={() => setActiveFilter('exhibition')}
              >
                <span className="btn-dot"></span> [ EXPOSITIONS ]
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'concert' ? 'active' : ''}`}
                onClick={() => setActiveFilter('concert')}
              >
                <span className="btn-dot"></span> [ CONCERTS & SHORTS ]
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveFilter('performance')}
              >
                <span className="btn-dot"></span> [ PERFORMANCES & TALKS ]
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'artexplora' ? 'active' : ''}`}
                onClick={() => setActiveFilter('artexplora')}
              >
                <span className="btn-dot"></span> [ ART EXPLORA FESTIVAL ]
              </button>
            </div>
          </div>

          {/* EVENT CARDS GRID */}
          <div className="events-grid">
            {filteredEvents.map(event => (
              <article key={event.id} className="event-card reveal-on-scroll">
                <div className="event-meta">
                  <span className="event-date-badge">[ {event.date} ]</span>
                  <span className={`event-category-tag ${event.tagClass}`}>{event.categoryTag}</span>
                </div>
                <h3 className="event-title">{event.title}</h3>
                <div className="event-info-line">
                  <span><i className="fa-solid fa-location-dot"></i> {event.location}</span>
                  <span><i className="fa-regular fa-clock"></i> {event.time}</span>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span className="event-curators">{event.curators}</span>
                  <a href="#" className="event-link">EN SAVOIR PLUS <i className="fa-solid fa-arrow-right"></i></a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </ScrollReveal>
  );
}
