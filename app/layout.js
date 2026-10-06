'use client';

import { useState } from 'react';
import './globals.css';
import Header from '@/components/Header';
import MenuOverlay from '@/components/MenuOverlay';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="fr">
      <head>
        <title>JAOU TUNIS 2026 — Biennale d'Art Contemporain</title>
        <meta name="description" content="JAOU TUNIS 2026 — Biennale d'Art Contemporain organisée par la Fondation Kamel Lazaar." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,700;1,400&family=Cinzel:wght@700;800;900&family=Space+Grotesk:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* FontAwesome Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MenuOverlay menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
