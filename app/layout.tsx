import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/home.css';
import './styles/contact.css';
import './styles/content.css';
import './styles/packages.css';
import './styles/film.css';
import './styles/not-found.css';
import './styles/utilities.css';
import './styles/animations.css';
import { ScrollReveal } from './components/scroll-reveal';
import { SiteParallax } from './components/site-parallax';

// Editorial display font for titles and refined serif accents.
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

// Clean sans-serif body font for navigation, copy, and interface text.
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
});

// Global metadata used by all routes.
export const metadata: Metadata = {
  title: 'Love in the Details',
  description: 'Crafting timeless wedding films and imagery.',
};

// Viewport defaults for responsive rendering.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2c1c12',
};

// Root layout that mounts the shared background and route content.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${cormorantGaramond.variable} ${raleway.variable}`}>
      <body>
        <SiteParallax />
        <ScrollReveal />

        <div className="site-app">
          {/* Skip link keeps keyboard users anchored to the main content. */}
          <a href="#content" className="skip-link">
            Skip to content
          </a>

          {/* Route content */}
          {children}
        </div>
      </body>
    </html>
  );
}
