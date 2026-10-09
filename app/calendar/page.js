'use client';

import { useState } from 'react';
import Link from 'next/link';
import MoleculeCanvas from '@/components/MoleculeCanvas';

export default function CalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);

  // Category definitions matching screenshot design
  const categories = [
    { id: 'exhibition', label: 'EXHIBITIONS', color: '#E54D8A' },
    { id: 'concert', label: 'CONCERTS', color: '#14AFA7' },
    { id: 'performance', label: 'PERFORMANCES', color: '#DC2626' },
    { id: 'encounter', label: 'ENCOUNTERS', color: '#EAB308' },
  ];

  // October 2026 Days grid data (Thursday Oct 1 to Saturday Oct 31)
  // Festival days run from Oct 23 to Oct 31 with category indicators
  const calendarDays = [
    { day: 1, isBlank: false },
    { day: 2, isBlank: false },
    { day: 3, isBlank: false },
    { day: 4, isBlank: false },
    { day: 5, isBlank: false },
    { day: 6, isBlank: false },
    { day: 7, isBlank: false },
    { day: 8, isBlank: false },
    { day: 9, isBlank: false },
    { day: 10, isBlank: false },
    { day: 11, isBlank: false },
    { day: 12, isBlank: false },
    { day: 13, isBlank: false },
    { day: 14, isBlank: false },
    { day: 15, isBlank: false },
    { day: 16, isBlank: false },
    { day: 17, isBlank: false },
    { day: 18, isBlank: false },
    { day: 19, isBlank: false },
    { day: 20, isBlank: false },
    { day: 21, isBlank: false },
    { day: 22, isBlank: false },
    { day: 23, isFestival: true, colors: ['#E54D8A', '#14AFA7', '#DC2626'] },
    { day: 24, isFestival: true, colors: ['#E54D8A', '#14AFA7', '#DC2626', '#EAB308'] },
    { day: 25, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 26, isFestival: true, colors: ['#DC2626', '#EAB308'] },
    { day: 27, isFestival: true, colors: ['#E54D8A', '#DC2626'] },
    { day: 28, isFestival: true, colors: ['#14AFA7', '#EAB308'] },
    { day: 29, isFestival: true, colors: ['#E54D8A', '#14AFA7', '#DC2626'] },
    { day: 30, isFestival: true, colors: ['#E54D8A', '#14AFA7', '#DC2626', '#EAB308'] },
    { day: 31, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
  ];

  // Festival Day Program Schedule Data
  const scheduleData = [
    {
      dateNum: 23,
      dayTitle: 'FRIDAY, OCTOBER 23',
      events: [
        {
          id: 'e1',
          time: '6:30 PM',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Gathering Samar Haddad King',
          artist: 'Yaa Samar! Dance Theatre',
          location: 'Le 4ème Art',
          ticketUrl: '#'
        },
        {
          id: 'e2',
          time: '9:00 PM',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Jaou Night: Electro-Acoustic Opening Set',
          artist: 'Deena Abdelwahed & Arabstazy',
          location: 'Palais Kheireddine',
          ticketUrl: '#'
        }
      ]
    },
    {
      dateNum: 24,
      dayTitle: 'SATURDAY, OCTOBER 24',
      events: [
        {
          id: 'e3',
          time: '11:00 AM',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Becoming the Ocean — Vernissage BIM\'26',
          artist: '16 International Artists (KLF & CAC Genève)',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'e4',
          time: '3:00 PM',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Symposium: Archipelagos & Water Memories',
          artist: 'Guest Philosophers & Curators',
          location: 'Église Sainte-Croix',
          ticketUrl: '#'
        },
        {
          id: 'e5',
          time: '8:00 PM',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Undertow / Contre;Courant Sound Voyage',
          artist: 'Art Explora Catamaran Crew & IRCAM',
          location: 'Port de La Goulette',
          ticketUrl: '#'
        }
      ]
    },
    {
      dateNum: 25,
      dayTitle: 'SUNDAY, OCTOBER 25',
      events: [
        {
          id: 'e6',
          time: '2:30 PM',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Traces of the Medina — Young Tunisian Creators',
          artist: 'Curated by KLF Residency',
          location: 'Dar Lasram',
          ticketUrl: '#'
        },
        {
          id: 'e7',
          time: '7:00 PM',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Modern Sufi Acoustic Concert',
          artist: 'Ziyara Ensemble',
          location: 'Dar Hussein',
          ticketUrl: '#'
        }
      ]
    },
    {
      dateNum: 26,
      dayTitle: 'MONDAY, OCTOBER 26',
      events: [
        {
          id: 'e8',
          time: '10:30 AM',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Round Table: Contemporary Art & Maritime Ecology',
          artist: 'Andrea Bellini, Nora Razian & KLF',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'e9',
          time: '6:30 PM',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Digital Projection Mapping & Medina Walk',
          artist: 'Digital Arts Collectif Tunis',
          location: 'Médina Alleyways',
          ticketUrl: '#'
        }
      ]
    },
    {
      dateNum: 30,
      dayTitle: 'FRIDAY, OCTOBER 30',
      events: [
        {
          id: 'e10',
          time: '8:00 PM',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Jaou Tunis 2026 Grand Closing Night',
          artist: 'Collective Live Residencies',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        }
      ]
    }
  ];

  // Filter schedule based on selected category & date
  const filteredSchedule = scheduleData.map(dayGroup => {
    let events = dayGroup.events;
    if (selectedCategory !== 'all') {
      events = events.filter(ev => ev.category === selectedCategory);
    }
    return { ...dayGroup, events };
  }).filter(dayGroup => {
    if (selectedDate !== null && dayGroup.dateNum !== selectedDate) {
      return false;
    }
    return dayGroup.events.length > 0;
  });

  return (
    <div className="agenda-page-wrapper">
      <MoleculeCanvas className="agenda-bg-canvas" />
      <main className="agenda-main-container">
        
        {/* TOP SECTION: TITLE + FILTERS + CALENDAR WIDGET */}
        <section className="agenda-header-grid">
          
          {/* LEFT COLUMN: TITLE & CATEGORY FILTER BADGES */}
          <div className="agenda-left-col">
            <h1 className="agenda-page-title">CALENDAR</h1>

            {/* CATEGORY FILTER BUTTONS */}
            <div className="agenda-category-pills">
              <button
                className={`agenda-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => { setSelectedCategory('all'); setSelectedDate(null); }}
              >
                [ ALL ]
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`agenda-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                >
                  <span className="pill-square-dot" style={{ backgroundColor: cat.color }}></span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: MONTH CALENDAR DATE PICKER WIDGET */}
          <div className="agenda-right-col">
            <div className="month-widget-card">
              {/* MONTH HEADER */}
              <div className="month-widget-nav">
                <button className="month-nav-btn" aria-label="Previous Month">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <span className="month-nav-title">October 2026</span>
                <button className="month-nav-btn" aria-label="Next Month">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

              {/* DAYS OF WEEK */}
              <div className="month-week-header">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>

              {/* DAYS GRID */}
              <div className="month-days-grid">
                {calendarDays.map((item, idx) => {
                  const activeCatObj = categories.find(c => c.id === selectedCategory);
                  const activeColor = activeCatObj ? activeCatObj.color : null;
                  const isCatMatch = selectedCategory !== 'all' && item.isFestival && item.colors?.includes(activeColor);
                  const isCatDimmed = selectedCategory !== 'all' && item.isFestival && !isCatMatch;

                  const cellStyle = isCatMatch 
                    ? { backgroundColor: activeColor } 
                    : isCatDimmed 
                      ? { opacity: 0.35 } 
                      : {};

                  return (
                    <div
                      key={idx}
                      className={`day-cell ${item.isFestival ? 'is-festival' : ''} ${selectedDate === item.day ? 'selected-day' : ''} ${isCatMatch ? 'category-highlighted-day' : ''}`}
                      style={cellStyle}
                      onClick={() => item.isFestival && setSelectedDate(selectedDate === item.day ? null : item.day)}
                    >
                      <span className="day-number">{item.day}</span>
                      
                      {/* CATEGORY COLOR UNDERLINE STRIPS FOR FESTIVAL DAYS */}
                      {item.isFestival && item.colors && (
                        <div className="day-color-bars" style={{ opacity: isCatMatch ? 0 : 1 }}>
                          {item.colors.map((c, cIdx) => (
                            <span key={cIdx} className="color-strip" style={{ backgroundColor: c }}></span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </section>

        {/* BOTTOM SECTION: DAY BY DAY PROGRAM SCHEDULE */}
        <section className="agenda-schedule-section">
          {filteredSchedule.length === 0 ? (
            <div className="empty-schedule-msg">
              <p>Aucun événement ne correspond à vos filtres pour cette date.</p>
              <button className="reset-filter-btn" onClick={() => { setSelectedCategory('all'); setSelectedDate(null); }}>
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            filteredSchedule.map(dayGroup => (
              <div key={dayGroup.dateNum} className="agenda-day-block" id={`day-${dayGroup.dateNum}`}>
                
                {/* YELLOW DAY HEADER BANNER */}
                <div className="agenda-day-banner">
                  <h2>{dayGroup.dayTitle}</h2>
                </div>

                {/* EVENTS FOR THIS DAY */}
                <div className="agenda-events-list">
                  {dayGroup.events.map(ev => (
                    <article key={ev.id} className="agenda-event-row">
                      
                      {/* EVENT DETAILS (LEFT) */}
                      <div className="agenda-event-details">
                        <div className="agenda-event-meta-line">
                          <span className="agenda-event-time">{ev.time}</span>
                          <span className="agenda-event-separator">|</span>
                          <span className="agenda-event-cat" style={{ color: ev.categoryColor }}>
                            {ev.categoryLabel}
                          </span>
                        </div>

                        <h3 className="agenda-event-title">{ev.title}</h3>
                        <p className="agenda-event-artist">{ev.artist}</p>
                        <div className="agenda-event-venue">{ev.location}</div>
                      </div>

                      {/* ACTION BUTTON (RIGHT) */}
                      <div className="agenda-event-action">
                        <a href={ev.ticketUrl} className="ticket-btn">
                          GET YOUR TICKET
                        </a>
                      </div>

                    </article>
                  ))}
                </div>

              </div>
            ))
          )}
        </section>

      </main>
    </div>
  );
}
