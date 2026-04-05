'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

type PackageItem = {
  id: string;
  label: string;
  image: string;
  title: string;
  description: string;
  pricing: {
    startingAt: string;
    coverage: string;
    deliverables: string[];
    addOns?: string[];
  };
};

// Package data drives both the hero media and pricing details.
const packageDetails: PackageItem[] = [
  {
    id: 'cinematic',
    label: 'Cinematic Film',
    image: 'CINEMATIC.jpg',
    title: 'Cinematic Wedding Film',
    description:
      'We offer a traditional, narrative-style wedding film that tells your day as a polished, cinematic story. Using music-driven pacing, curated visuals, and select audio from vows or speeches, the film flows from stylized preparations, through the ceremony, and into a celebratory reception finale.',
    pricing: {
      startingAt: '$3,200',
      coverage: 'Up to 8 hours',
      deliverables: [
        'Highlight wedding film',
        'Licensed music',
        'Ceremony audio coverage',
        'Digital delivery',
      ],
      addOns: ['Additional coverage', 'Teaser edit', 'Raw footage delivery'],
    },
  },
  {
    id: 'doc',
    label: 'Documentary',
    image: 'DOC.jpg',
    title: 'Documentary Wedding Film',
    description:
      'We offer a documentary approach to wedding films that follow the natural emotional arc of your day from anticipation, to commitment, to celebration. We shape your wedding into an honest, cinematic story that captures, not just the highlights, but also the behind-the-scenes of the day and interviews.',
    pricing: {
      startingAt: '$3,800',
      coverage: 'Up to 10 hours',
      deliverables: [
        'Documentary-style film edit',
        'Interview and spoken audio integration',
        'Extended story coverage',
        'Digital delivery',
      ],
      addOns: ['Rehearsal dinner coverage', 'Extra interview session'],
    },
  },
  {
    id: 'wedding',
    label: 'Wedding Photos',
    image: 'PHOTOGRAPHY.jpg',
    title: 'Wedding Day Story',
    description:
      'An elegant narrative that balances portraits, laughter, and the live energy from both ceremony and reception into a polished timeline.',
    pricing: {
      startingAt: '$2,600',
      coverage: 'Up to 8 hours',
      deliverables: [
        'Curated online gallery',
        'High-resolution edited images',
        'Timeline-based storytelling coverage',
        'Print release',
      ],
      addOns: ['Second photographer', 'Engagement session', 'Fine art album'],
    },
  },
  {
    id: 'couples',
    label: 'Couples Shoot',
    image: 'COUPLES.jpg',
    title: 'Couples Session',
    description:
      'A relaxed, intimate session before or after the wedding day, perfect for capturing love notes, movement, and detail-focused portraits.',
    pricing: {
      startingAt: '$650',
      coverage: 'Up to 90 minutes',
      deliverables: [
        'One location session',
        'Edited gallery',
        'High-resolution images',
        'Style guidance',
      ],
      addOns: ['Second location', 'Additional outfit time'],
    },
  },
];

// Packages page that swaps imagery and pricing from a single source of truth.
export default function PackagesPage() {
  const [activePackageId, setActivePackageId] = useState<string>(packageDetails[0].id);
  const selectedPackage =
    packageDetails.find((entry) => entry.id === activePackageId) ?? packageDetails[0];

  return (
    <main id="content" className="site-page packages-page">
      <div className="site-shell">
        <SiteHeader />

        {/* Hero image stack and package picker. */}
        <section className="packages-hero">
          <div className="packages-hero-frame" data-reveal="soft">
            {packageDetails.map((entry, index) => (
              <Image
                key={entry.id}
                src={`/images/${entry.image}`}
                alt={entry.title}
                priority={index === 0}
                fill
                sizes="(max-width: 800px) 100vw, 1100px"
                className={`packages-hero-image ${activePackageId === entry.id ? 'is-visible' : ''}`}
              />
            ))}
            <div className="packages-hero-overlay" />
            <div className="packages-hero-copy" aria-live="polite">
              <h1>{selectedPackage.title}</h1>
              <p>{selectedPackage.description}</p>
            </div>
          </div>

          <div className="packages-actions" data-reveal="up">
            {packageDetails.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`packages-button ${activePackageId === entry.id ? 'active' : ''}`}
                onClick={() => setActivePackageId(entry.id)}
                aria-pressed={activePackageId === entry.id}
                aria-controls="package-pricing-panel"
              >
                {entry.label}
              </button>
            ))}
          </div>

          <div
            id="package-pricing-panel"
            className="packages-pricing-panel open"
            data-reveal="up"
            data-reveal-delay="1"
            aria-hidden={false}
          >
            <div className="packages-pricing-inner">
              <div
                key={selectedPackage.id}
                className="packages-pricing-content"
                aria-live="polite"
              >
                <div className="packages-pricing-header">
                  <span className="packages-pricing-kicker">Pricing Details</span>
                  <h2>{selectedPackage.label}</h2>
                  <p>{selectedPackage.description}</p>
                </div>

                <div className="packages-pricing-grid">
                  <div className="packages-pricing-card">
                    <span className="packages-pricing-label">Starting at</span>
                    <strong>{selectedPackage.pricing.startingAt}</strong>
                  </div>

                  <div className="packages-pricing-card">
                    <span className="packages-pricing-label">Coverage</span>
                    <strong>{selectedPackage.pricing.coverage}</strong>
                  </div>
                </div>

                <div className="packages-pricing-columns">
                  <div className="packages-pricing-section">
                    <h3>Included</h3>
                    <ul>
                      {selectedPackage.pricing.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedPackage.pricing.addOns && selectedPackage.pricing.addOns.length > 0 && (
                    <div className="packages-pricing-section">
                      <h3>Add-ons</h3>
                      <ul>
                        {selectedPackage.pricing.addOns.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
