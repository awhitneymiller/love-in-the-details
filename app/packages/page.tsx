'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

const packageDetails = [
  {
    id: 'cinematic',
    label: 'Cinematic Film',
    image: 'CINEMATIC.jpg',
    title: 'Cinematic Wedding Film',
    description:
      'We offer a traditional, narrative-style wedding film that tells your day as a polished, cinematic story. Using music-driven pacing, curated visuals, and select audio from vows or speeches, the film flows from stylized preparations, through the ceremony, and into a celebratory reception finale.',
  },
  {
    id: 'doc',
    label: 'Documentary',
    image: 'DOC.jpg',
    title: 'Documentary Wedding Film',
    description:
      'We offer a documentary approach to wedding films that follow the natural emotional arc of your day from anticipation, to commitment, to celebration. We shape your wedding into an honest, cinematic story that captures, not just the highlights, but also the behind-the-scenes of the day and interviews.',
  },
  {
    id: 'wedding',
    label: 'Wedding Photos',
    images: 'PHOTOGRAPHY.jpg',
    title: 'Wedding Day Story',
    description:
      'An elegant narrative that balances portraits, laughter, and the live energy from both ceremony and reception into a polished timeline.',
  },
  {
    id: 'couples',
    label: 'Couples Shoot',
    image: 'COUPLES.jpg',
    title: 'Couples Session',
    description:
      'A relaxed, intimate session before or after the wedding day—perfect for capturing love notes, movement, and detail-focused portraits.',
  },
];

const defaultOverlay = {
  title: 'Packages',
  description: 'Click the buttons below to learn more about the packages we offer.',
};

export default function PackagesPage() {
  const [activePackageId, setActivePackageId] = useState<string | null>(null);

  const currentOverlay = useMemo(() => {
    const selected = packageDetails.find((entry) => entry.id === activePackageId);
    if (!selected) {
      return defaultOverlay;
    }
    return { title: selected.title, description: selected.description };
  }, [activePackageId]);

  return (
    <main id="content" className="site-page packages-page">
      <div className="site-shell">
        <SiteHeader />

        <section className="packages-hero">
          <div className="packages-hero-frame">
            <Image
              src="/images/PACKAGES.jpg"
              alt="Image of ring."
              priority
              fill
              sizes="(max-width: 800px) 100vw, 1100px"
              className="packages-hero-image"
            />
            <div className="packages-hero-overlay" />
            <div className="packages-hero-copy">
              <h1>{currentOverlay.title}</h1>
              <p>{currentOverlay.description}</p>
            </div>
          </div>

          <div className="packages-actions">
            {packageDetails.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`packages-button ${activePackageId === entry.id ? 'active' : ''}`}
                onClick={() => setActivePackageId(entry.id)}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
