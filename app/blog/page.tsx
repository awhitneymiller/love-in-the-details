import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { SiteImage } from '../components/site-image';

// Blog page layout with summary cards.
export default function BlogPage() {
  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        {/* Fixed top header */}
        <SiteHeader />

        {/* Page title section */}
        <section className="page-hero">
          <p className="page-kicker">Lorem ipsum dolor</p>
          <h1 className="page-title">Lorem ipsum dolor sit amet.</h1>
        </section>

        {/* Feature card grid */}
        <section className="card-grid">
          <article className="page-card">
            <div className="card-image">
              <SiteImage alt="Lorem ipsum dolor sit amet." />
            </div>
            <h3>Lorem ipsum dolor</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </article>

          <article className="page-card">
            <div className="card-image">
              <SiteImage alt="Lorem ipsum dolor sit amet." />
            </div>
            <h3>Dolor sit amet</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </article>

          <article className="page-card">
            <div className="card-image">
              <SiteImage alt="Lorem ipsum dolor sit amet." />
            </div>
            <h3>Consectetur elit</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </article>
        </section>

        {/* Shared footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
