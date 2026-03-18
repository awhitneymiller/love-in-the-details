'use client';

import { useEffect, useState } from 'react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { SiteImage } from '../components/site-image';

// Packages page with hero motion and service blocks.
export default function PackagesPage() {
  const [offset, setOffset] = useState(0);

  // Syncs hero parallax offset with scroll position.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOffset(Math.min(140, y * 0.22));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        {/* Fixed top header */}
        <SiteHeader />

        {/* Hero image section */}
        <section className="packages-hero">
          <div
            className="packages-hero-image"
            style={{ transform: `translateY(${offset * 0.45}px) scale(1.08)` }}
          >
            <SiteImage alt="Lorem ipsum dolor sit amet." priority />
          </div>
          <div className="packages-hero-overlay" />
          <h1
            className="packages-hero-title"
            style={{ ['--hero-title-offset' as string]: `${offset * -0.22}px` }}
          >
            Lorem ipsum dolor
            <br />
            sit amet elit
          </h1>
        </section>

        {/* Offer cards section */}
        <section className="offer-section">
          <h2 className="h2">What We Offer</h2>

          <div className="offer-grid">
            <article className="offer-card">
              <h3>Cinematic Wedding Film</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </article>

            <article className="offer-card">
              <h3>Documentary Wedding Film</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </article>

            <article className="offer-card">
              <h3>Wedding Photography</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </article>

            <article className="offer-card">
              <h3>Couples Shoot</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </article>
          </div>
        </section>

        {/* Expandable add-ons section */}
        <section className="addons-section">
          <h2 className="h2">Explore Our Packages</h2>

          <ul className="addons-list">
            <li>
              <details className="addon-item">
                <summary>Drone</summary>
                <p className="addon-copy">
                  tbd
                </p>
              </details>
            </li>
            <li>
              <details className="addon-item">
                <summary>Social Media Package</summary>
                <p className="addon-copy">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </details>
            </li>
            <li>
              <details className="addon-item">
                <summary>Trailer</summary>
                <p className="addon-copy">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </details>
            </li>
            <li>
              <details className="addon-item">
                <summary>All Raw Footage</summary>
                <p className="addon-copy">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </details>
            </li>
            <li>
              <details className="addon-item">
                <summary>Seoerate 2-Hour Shoot</summary>
                <p className="addon-copy">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </details>
            </li>
            <li>
              <details className="addon-item">
                <summary>Original Score</summary>
                <p className="addon-copy">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </details>
            </li>
          </ul>
        </section>

        {/* Shared footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
