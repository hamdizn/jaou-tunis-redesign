'use client';

import { useState } from 'react';
import Link from 'next/link';
import MoleculeCanvas from '@/components/MoleculeCanvas';

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState('october'); // 'october' | 'november'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null); // { month: 'october'|'november', day: number } | null

  // Category definitions matching official biennial branding
  const categories = [
    { id: 'exhibition', label: 'EXHIBITIONS', color: '#E54D8A' },
    { id: 'concert', label: 'CONCERTS', color: '#14AFA7' },
    { id: 'performance', label: 'PERFORMANCES', color: '#DC2626' },
    { id: 'encounter', label: 'ENCOUNTERS', color: '#EAB308' },
  ];

  // OCTOBER 2026 DAYS (Starts on Thursday Oct 1 -> 4 blanks for Sun, Mon, Tue, Wed)
  // Festival starts Friday Oct 23 and continues to Oct 31
  const octoberDays = [
    { isBlank: true },
    { isBlank: true },
    { isBlank: true },
    { isBlank: true },
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
    { day: 23, isFestival: true, colors: ['#DC2626', '#14AFA7'] }, // Opening
    { day: 24, isFestival: true, colors: ['#E54D8A', '#EAB308', '#DC2626'] }, // BIM'26 + Art Explora
    { day: 25, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 26, isFestival: true, colors: ['#EAB308', '#DC2626'] },
    { day: 27, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 28, isFestival: true, colors: ['#EAB308', '#DC2626'] },
    { day: 29, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 30, isFestival: true, colors: ['#DC2626', '#14AFA7'] },
    { day: 31, isFestival: true, colors: ['#EAB308', '#DC2626'] },
  ];

  // NOVEMBER 2026 DAYS (Starts on Sunday Nov 1 -> 0 blanks)
  // Festival runs from Nov 1 to Sunday Nov 22 (Grand Closing)
  const novemberDays = [
    { day: 1, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 2, isFestival: true, colors: ['#E54D8A', '#EAB308'] },
    { day: 3, isFestival: true, colors: ['#EAB308', '#DC2626'] },
    { day: 4, isFestival: true, colors: ['#E54D8A', '#EAB308'] },
    { day: 5, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 6, isFestival: true, colors: ['#DC2626', '#14AFA7'] },
    { day: 7, isFestival: true, colors: ['#EAB308', '#E54D8A', '#DC2626'] },
    { day: 8, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 9, isFestival: true, colors: ['#EAB308', '#E54D8A'] },
    { day: 10, isFestival: true, colors: ['#EAB308', '#DC2626'] },
    { day: 11, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 12, isFestival: true, colors: ['#E54D8A', '#14AFA7'] },
    { day: 13, isFestival: true, colors: ['#E54D8A', '#DC2626'] },
    { day: 14, isFestival: true, colors: ['#DC2626', '#14AFA7', '#E54D8A'] }, // Nuit Blanche
    { day: 15, isFestival: true, colors: ['#EAB308', '#14AFA7'] },
    { day: 16, isFestival: true, colors: ['#EAB308', '#E54D8A'] },
    { day: 17, isFestival: true, colors: ['#E54D8A', '#DC2626'] },
    { day: 18, isFestival: true, colors: ['#EAB308', '#DC2626'] },
    { day: 19, isFestival: true, colors: ['#EAB308', '#14AFA7'] },
    { day: 20, isFestival: true, colors: ['#DC2626', '#14AFA7'] },
    { day: 21, isFestival: true, colors: ['#E54D8A', '#DC2626'] },
    { day: 22, isFestival: true, colors: ['#EAB308', '#E54D8A', '#14AFA7'] }, // Grand Closing
    { day: 23, isBlank: false },
    { day: 24, isBlank: false },
    { day: 25, isBlank: false },
    { day: 26, isBlank: false },
    { day: 27, isBlank: false },
    { day: 28, isBlank: false },
    { day: 29, isBlank: false },
    { day: 30, isBlank: false },
  ];

  // COMPLETE SCHEDULE DATA: 23 OCTOBRE — 22 NOVEMBRE 2026
  const scheduleData = [
    // --- OCTOBRE 2026 ---
    {
      monthKey: 'october',
      dateNum: 23,
      dayTitle: 'VENDREDI 23 OCTOBRE 2026 — OUVERTURE OFFICIELLE',
      events: [
        {
          id: 'oct23-1',
          time: '18:30',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Gathering Samar Haddad King',
          artist: 'Yaa Samar! Dance Theatre',
          location: 'Le 4ème Art',
          ticketUrl: '#'
        },
        {
          id: 'oct23-2',
          time: '21:00',
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
      monthKey: 'october',
      dateNum: 24,
      dayTitle: 'SAMEDI 24 OCTOBRE 2026',
      events: [
        {
          id: 'oct24-1',
          time: '11:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Becoming the Ocean — Vernissage BIM\'26',
          artist: '16 Artistes Internationaux (KLF & CAC Genève)',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'oct24-2',
          time: '15:00',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Symposium: Archipelagos & Water Memories',
          artist: 'Philosophes & Commissaires invités',
          location: 'Église Sainte-Croix',
          ticketUrl: '#'
        },
        {
          id: 'oct24-3',
          time: '20:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Undertow / Contre-Courant Sound Voyage',
          artist: 'Art Explora Catamaran Crew & IRCAM',
          location: 'Port de La Goulette',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'october',
      dateNum: 25,
      dayTitle: 'DIMANCHE 25 OCTOBRE 2026',
      events: [
        {
          id: 'oct25-1',
          time: '14:30',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Traces de la Médina — Jeunes Créateurs Tunisiens',
          artist: 'Résidence KLF & Commissariat Associé',
          location: 'Dar Lasram',
          ticketUrl: '#'
        },
        {
          id: 'oct25-2',
          time: '19:00',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Modern Sufi Acoustic Concert',
          artist: 'Ensemble Ziyara',
          location: 'Dar Hussein',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'october',
      dateNum: 26,
      dayTitle: 'LUNDI 26 OCTOBRE 2026',
      events: [
        {
          id: 'oct26-1',
          time: '10:30',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Table Ronde: Art Contemporain & Écologie Maritime',
          artist: 'Andrea Bellini, Nora Razian & KLF',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'oct26-2',
          time: '18:30',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Digital Projection Mapping & Medina Walk',
          artist: 'Collectif Arts Numériques Tunis',
          location: 'Rues et Patios de la Médina',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'october',
      dateNum: 27,
      dayTitle: 'MARDI 27 OCTOBRE 2026',
      events: [
        {
          id: 'oct27-1',
          time: '16:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Archipel Vivant : Cartographies Submergées',
          artist: 'Installations In-Situ & Sculptures Sonores',
          location: 'Palais Abdellia',
          ticketUrl: '#'
        },
        {
          id: 'oct27-2',
          time: '20:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Chants Polyphoniques de la Méditerranée',
          artist: 'Choeur Méditerranéen & Voix Solistes',
          location: 'Église Sainte-Croix',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'october',
      dateNum: 28,
      dayTitle: 'MERCREDI 28 OCTOBRE 2026',
      events: [
        {
          id: 'oct28-1',
          time: '15:00',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Atelier Public : Récits et Mémoires de l\'Eau',
          artist: 'Art Explora Lab & Médiateurs Culturels',
          location: 'B7L9 Art Station (Bhar Lazreg)',
          ticketUrl: '#'
        },
        {
          id: 'oct28-2',
          time: '19:30',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Corps et Vagues : Chorégraphie Urbaine',
          artist: 'Compagnie Danse Médina & Danseurs Urbains',
          location: 'Place de la Kasbah',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'october',
      dateNum: 29,
      dayTitle: 'JEUDI 29 OCTOBRE 2026',
      events: [
        {
          id: 'oct29-1',
          time: '17:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Échos Visuels : Photographie Maghrébine',
          artist: 'Commissariat Spécial Biennale Archipel',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'oct29-2',
          time: '21:00',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Nuit Ambient & Synthèses Orientales',
          artist: 'Ghoula Live & Musiciens Invités',
          location: 'Palais Kheireddine',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'october',
      dateNum: 30,
      dayTitle: 'VENDREDI 30 OCTOBRE 2026',
      events: [
        {
          id: 'oct30-1',
          time: '18:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Soundscapes of Tunis : Acoustique & Récits',
          artist: 'Artistes en Résidence Internationale KLF',
          location: 'Médina Alleyways',
          ticketUrl: '#'
        },
        {
          id: 'oct30-2',
          time: '21:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Jazz Méditerranéen & Percussions Arabes',
          artist: 'Yazz Ahmed Ensemble & Invités',
          location: 'Le 4ème Art',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'october',
      dateNum: 31,
      dayTitle: 'SAMEDI 31 OCTOBRE 2026',
      events: [
        {
          id: 'oct31-1',
          time: '11:30',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Colloque : L\'Archipel comme Forme de Résistance',
          artist: 'Historiens d\'art, Poètes et Chercheurs',
          location: 'Église Sainte-Croix',
          ticketUrl: '#'
        },
        {
          id: 'oct31-2',
          time: '20:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Water Echoes: Immersive Multi-Screen Projection',
          artist: 'Collectif BIM\'26 & Cinéastes Méditerranéens',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        }
      ]
    },

    // --- NOVEMBRE 2026 ---
    {
      monthKey: 'november',
      dateNum: 1,
      dayTitle: 'DIMANCHE 1ER NOVEMBRE 2026',
      events: [
        {
          id: 'nov1-1',
          time: '15:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Circuit BIM\'26 Vidéo : Les Images en Mouvement',
          artist: 'Sélection Officielle CAC Genève & KLF',
          location: 'Cinéma ABC & Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'nov1-2',
          time: '18:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Néo-Malouf & Cordes Méditerranéennes',
          artist: 'Orchestre Contemporain de Tunis',
          location: 'Dar Ben Abdallah',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 3,
      dayTitle: 'MARDI 3 NOVEMBRE 2026',
      events: [
        {
          id: 'nov3-1',
          time: '16:30',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Masterclass : Commissariat en Période de Transition',
          artist: 'Curateurs Invités & Étudiants des Beaux-Arts',
          location: 'B7L9 Art Station',
          ticketUrl: '#'
        },
        {
          id: 'nov3-2',
          time: '19:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Désert et Mer : Poétique du Geste In-Situ',
          artist: 'Solo Chorégraphique & Sons de Harpe',
          location: 'Dar Lasram',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 5,
      dayTitle: 'JEUDI 5 NOVEMBRE 2026',
      events: [
        {
          id: 'nov5-1',
          time: '18:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Sculptures Textiles et Matières Premières',
          artist: 'Créateurs Tunisiens & Maghrébins',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'nov5-2',
          time: '20:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Percussions de Carthage & Électronique Vivante',
          artist: 'Collectif Rythmes & Sons Tunis',
          location: 'Palais Kheireddine',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 6,
      dayTitle: 'VENDREDI 6 NOVEMBRE 2026',
      events: [
        {
          id: 'nov6-1',
          time: '17:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Art Explora Catamaran Deck Performance',
          artist: 'Équipage Artistique Art Explora & IRCAM',
          location: 'Port de La Goulette (Pont du Navire)',
          ticketUrl: '#'
        },
        {
          id: 'nov6-2',
          time: '21:00',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Indie Pop & Alternatif Arabe : Soirée Spéciale',
          artist: 'Scène Musicale Émergente Tunisienne',
          location: 'Théâtre Municipal de Tunis',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 7,
      dayTitle: 'SAMEDI 7 NOVEMBRE 2026',
      events: [
        {
          id: 'nov7-1',
          time: '10:30',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Forum Jeunesse : L\'Art comme Vecteur d\'Avenir',
          artist: 'Fondation Kamel Lazaar & Partenaires',
          location: 'B7L9 Art Station',
          ticketUrl: '#'
        },
        {
          id: 'nov7-2',
          time: '16:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Territoires Invisibles : Écritures Documentaires',
          artist: 'Photographes et Vidéastes Méditerranéens',
          location: 'Palais Kheireddine',
          ticketUrl: '#'
        },
        {
          id: 'nov7-3',
          time: '20:30',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Rituels Urbains & Flammes Poétiques',
          artist: 'Troupe Théâtre & Danse de Rue',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 8,
      dayTitle: 'DIMANCHE 8 NOVEMBRE 2026',
      events: [
        {
          id: 'nov8-1',
          time: '14:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Visite Guidée Curateurs : Circuit Médina BIM\'26',
          artist: 'Équipe Curatoriale KLF & CAC Genève',
          location: 'Départ : Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'nov8-2',
          time: '19:00',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Acoustic Oudh & Cello Dialogue',
          artist: 'Duo Cordes Méditerranée',
          location: 'Dar Hussein',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 10,
      dayTitle: 'MARDI 10 NOVEMBRE 2026',
      events: [
        {
          id: 'nov10-1',
          time: '17:30',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Architecture & Conservation : Habiter la Médina',
          artist: 'Architectes, Urbanistes et Habitants',
          location: 'Dar Lasram',
          ticketUrl: '#'
        },
        {
          id: 'nov10-2',
          time: '20:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Spoken Word & Sound Poetry Session',
          artist: 'Poètes Contemporains du Monde Arabe',
          location: 'Église Sainte-Croix',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 12,
      dayTitle: 'JEUDI 12 NOVEMBRE 2026',
      events: [
        {
          id: 'nov12-1',
          time: '18:30',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Résidence KLF 2026 : Restitution des Travaux',
          artist: 'Artistes Résidents 2026',
          location: 'B7L9 Art Station',
          ticketUrl: '#'
        },
        {
          id: 'nov12-2',
          time: '21:00',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Électro-Chaâbi & Fusion Urbaine',
          artist: 'DJs et Percussionnistes Tunisiens',
          location: 'Palais Kheireddine',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 13,
      dayTitle: 'VENDREDI 13 NOVEMBRE 2026',
      events: [
        {
          id: 'nov13-1',
          time: '16:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Marathon des Galeries & Ateliers Ouverts',
          artist: 'Circuit 12 Galeries Partenaires',
          location: 'Médina de Tunis & Centre-Ville',
          ticketUrl: '#'
        },
        {
          id: 'nov13-2',
          time: '21:30',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Danse Contemporaine & Projections Dynamiques',
          artist: 'Collectif Danseurs Méditerranéens',
          location: 'Le 4ème Art',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 14,
      dayTitle: 'SAMEDI 14 NOVEMBRE 2026 — NUIT BLANCHE MÉDINA',
      events: [
        {
          id: 'nov14-1',
          time: '18:00 — 02:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Nuit Blanche Médina : Parcours Ininterrompu d\'Art et Lumière',
          artist: 'Plus de 40 Artistes, Performeurs et Musiciens',
          location: 'Ruelles, Patios et Monuments de la Médina',
          ticketUrl: '#'
        },
        {
          id: 'nov14-2',
          time: '22:00',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Grand Concert Nocturne de la Nuit Blanche',
          artist: 'Ensembles Acoustiques & Électroniques',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 15,
      dayTitle: 'DIMANCHE 15 NOVEMBRE 2026',
      events: [
        {
          id: 'nov15-1',
          time: '16:00',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Débriefing Nuit Blanche : Rencontre avec les Créateurs',
          artist: 'Artistes et Habitants de la Médina',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'nov15-2',
          time: '19:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Méditations Musicales au Crépuscule',
          artist: 'Solo Oud Contemporain & Flûte Nay',
          location: 'Dar Lasram',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 17,
      dayTitle: 'MARDI 17 NOVEMBRE 2026',
      events: [
        {
          id: 'nov17-1',
          time: '17:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Éditions Spéciales & Catalogues de la Biennale',
          artist: 'Lancement des Publications KLF & CAC Genève',
          location: 'B7L9 Art Station',
          ticketUrl: '#'
        },
        {
          id: 'nov17-2',
          time: '19:30',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Mémoire du Silence : Théâtre-Danse',
          artist: 'Compagnie Méditerranéenne de Théâtre',
          location: 'Le 4ème Art',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 19,
      dayTitle: 'JEUDI 19 NOVEMBRE 2026',
      events: [
        {
          id: 'nov19-1',
          time: '15:30',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Table Ronde Finale : Bilan Critique de l\'Édition Archipel',
          artist: 'Commissaires, Critiques et Philosophes',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'nov19-2',
          time: '20:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Symphonie Arabo-Andalouse Réinventée',
          artist: 'Grand Orchestre de Tunis & Solistes',
          location: 'Théâtre Municipal de Tunis',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 20,
      dayTitle: 'VENDREDI 20 NOVEMBRE 2026',
      events: [
        {
          id: 'nov20-1',
          time: '18:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Clôture BIM\'26 : Cérémonie des Prix de l\'Image en Mouvement',
          artist: 'Jury International CAC Genève & KLF',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'nov20-2',
          time: '21:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'Électro Expérimentale Méditerranéenne',
          artist: 'Scène Sonore Nord-Sud',
          location: 'Palais Kheireddine',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 21,
      dayTitle: 'SAMEDI 21 NOVEMBRE 2026',
      events: [
        {
          id: 'nov21-1',
          time: '16:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Dernier Tour des Pavillons d\'Art Archipel',
          artist: 'Finissage des Espaces d\'Exposition',
          location: 'Circuit des Pavillons Médina',
          ticketUrl: '#'
        },
        {
          id: 'nov21-2',
          time: '20:00',
          category: 'performance',
          categoryLabel: 'Performance',
          categoryColor: '#DC2626',
          title: 'Grande Nuit des Performances Archipel : 12 Artistes Non-Stop',
          artist: 'Performeurs Tunisiens & Internationaux',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        }
      ]
    },
    {
      monthKey: 'november',
      dateNum: 22,
      dayTitle: 'DIMANCHE 22 NOVEMBRE 2026 — CLÔTURE OFFICIELLE DU FESTIVAL',
      events: [
        {
          id: 'nov22-1',
          time: '11:00',
          category: 'encounter',
          categoryLabel: 'Encounter',
          categoryColor: '#EAB308',
          title: 'Brunch de Clôture & Remerciements Officiels',
          artist: 'Fondation Kamel Lazaar, CAC Genève & Art Explora',
          location: 'Caserne El Attarine',
          ticketUrl: '#'
        },
        {
          id: 'nov22-2',
          time: '17:00',
          category: 'exhibition',
          categoryLabel: 'Exhibition',
          categoryColor: '#E54D8A',
          title: 'Finissage Collectif de la Biennale',
          artist: 'Tous les Artistes Participants',
          location: 'Tous les Lieux de la Biennale',
          ticketUrl: '#'
        },
        {
          id: 'nov22-3',
          time: '20:30',
          category: 'concert',
          categoryLabel: 'Concert',
          categoryColor: '#14AFA7',
          title: 'GRAND CONCERT DE CLÔTURE JAOU TUNIS 2026',
          artist: 'Grand Orchestre & Collectif des Musiciens Résidents',
          location: 'Caserne El Attarine & Théâtre Municipal',
          ticketUrl: '#'
        }
      ]
    }
  ];

  // Active days to display in widget
  const activeDaysList = selectedMonth === 'october' ? octoberDays : novemberDays;
  const monthTitle = selectedMonth === 'october' ? 'October 2026' : 'November 2026';

  // Filter schedule based on selected month, date & category
  const filteredSchedule = scheduleData.map(dayGroup => {
    let events = dayGroup.events;
    if (selectedCategory !== 'all') {
      events = events.filter(ev => ev.category === selectedCategory);
    }
    return { ...dayGroup, events };
  }).filter(dayGroup => {
    if (selectedDate !== null) {
      if (dayGroup.monthKey !== selectedDate.month || dayGroup.dateNum !== selectedDate.day) {
        return false;
      }
    }
    return dayGroup.events.length > 0;
  });

  const handleDayClick = (dayNum, isFestival) => {
    if (!isFestival) return;
    if (selectedDate && selectedDate.month === selectedMonth && selectedDate.day === dayNum) {
      setSelectedDate(null);
    } else {
      setSelectedDate({ month: selectedMonth, day: dayNum });
    }
  };

  return (
    <div className="agenda-page-wrapper">
      <MoleculeCanvas className="agenda-bg-canvas" />
      <main className="agenda-main-container">
        
        {/* TOP SECTION: TITLE + FILTERS + CALENDAR WIDGET */}
        <section className="agenda-header-grid">
          
          {/* LEFT COLUMN: TITLE & CATEGORY FILTER BADGES */}
          <div className="agenda-left-col">
            <div className="festival-period-badge">
              <i className="fa-regular fa-calendar-check"></i>
              <span>23 OCTOBRE — 22 NOVEMBRE 2026</span>
              <span className="badge-dot">•</span>
              <span className="badge-highlight">31 JOURS D'ART</span>
            </div>

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
              
              {/* MONTH SWITCHER TABS */}
              <div className="month-toggle-tabs">
                <button
                  className={`month-tab-btn ${selectedMonth === 'october' ? 'active' : ''}`}
                  onClick={() => { setSelectedMonth('october'); }}
                >
                  Octobre (23-31)
                </button>
                <button
                  className={`month-tab-btn ${selectedMonth === 'november' ? 'active' : ''}`}
                  onClick={() => { setSelectedMonth('november'); }}
                >
                  Novembre (1-22)
                </button>
              </div>

              {/* MONTH HEADER WITH CHEVRONS */}
              <div className="month-widget-nav">
                <button
                  className="month-nav-btn"
                  aria-label="Mois précédent"
                  onClick={() => setSelectedMonth(selectedMonth === 'october' ? 'november' : 'october')}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <span className="month-nav-title">{monthTitle}</span>
                <button
                  className="month-nav-btn"
                  aria-label="Mois suivant"
                  onClick={() => setSelectedMonth(selectedMonth === 'october' ? 'november' : 'october')}
                >
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
                {activeDaysList.map((item, idx) => {
                  if (item.isBlank) {
                    return <div key={`blank-${idx}`} className="day-cell is-blank"></div>;
                  }

                  const isSelected = selectedDate && selectedDate.month === selectedMonth && selectedDate.day === item.day;
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
                      key={`day-${item.day}`}
                      className={`day-cell ${item.isFestival ? 'is-festival' : ''} ${isSelected ? 'selected-day' : ''} ${isCatMatch ? 'category-highlighted-day' : ''}`}
                      style={cellStyle}
                      onClick={() => handleDayClick(item.day, item.isFestival)}
                      title={item.isFestival ? `Festival Jaou Tunis 2026 — ${item.day} ${selectedMonth === 'october' ? 'Octobre' : 'Novembre'}` : undefined}
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

              {/* RESET DATE FILTER IF SELECTED */}
              {selectedDate && (
                <div style={{ marginTop: '0.85rem', textAlign: 'center' }}>
                  <button
                    className="reset-filter-btn"
                    style={{ fontSize: '0.72rem', padding: '0.35rem 0.85rem' }}
                    onClick={() => setSelectedDate(null)}
                  >
                    Voir tout le programme (23 Oct — 22 Nov)
                  </button>
                </div>
              )}

            </div>
          </div>

        </section>

        {/* BOTTOM SECTION: DAY BY DAY PROGRAM SCHEDULE */}
        <section className="agenda-schedule-section">
          {filteredSchedule.length === 0 ? (
            <div className="empty-schedule-msg">
              <p>Aucun événement ne correspond à vos filtres pour cette sélection.</p>
              <button
                className="reset-filter-btn"
                onClick={() => { setSelectedCategory('all'); setSelectedDate(null); }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            filteredSchedule.map(dayGroup => (
              <div
                key={`${dayGroup.monthKey}-${dayGroup.dateNum}`}
                className="agenda-day-block"
                id={`day-${dayGroup.monthKey}-${dayGroup.dateNum}`}
              >
                
                {/* YELLOW DAY HEADER BANNER */}
                <div className="agenda-day-banner">
                  <h2>{dayGroup.dayTitle}</h2>
                </div>

                {/* EVENTS FOR THIS DAY */}
                <div className="agenda-events-list">
                  {dayGroup.events.map(ev => (
                    <article key={ev.id} className="agenda-event-row" data-category={ev.category}>
                      
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
                        <a 
                          href={ev.ticketUrl} 
                          className={`ticket-btn ticket-${ev.category}`}
                          style={{
                            backgroundColor: ev.categoryColor,
                            borderColor: ev.categoryColor,
                            color: (ev.category === 'encounter' || ev.category === 'talk') ? '#000000' : '#FFFFFF'
                          }}
                        >
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
