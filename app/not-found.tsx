import Link from 'next/link';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';

export default function NotFound() {
  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        <SiteHeader />

        <section className="not-found" aria-label="Page not found">
          <div className="not-found-orbit" aria-hidden="true" />

          <div className="not-found-shell">
            <p className="not-found-kicker">Oops. Page not ready.</p>
            <h1 className="not-found-title">This page is still being crafted.</h1>
            <p className="not-found-copy">
              We&rsquo;re still building this part of the site. Please head back to the homepage
              or get in touch while we finish it.
            </p>

            <div className="not-found-actions">
              <Link href="/" className="not-found-action not-found-action-primary">
                Return to Home
              </Link>
              <Link href="/contact" className="not-found-action">
                Contact Us
              </Link>
            </div>
          </div>

          <p className="not-found-code" aria-hidden="true">
            404
          </p>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
