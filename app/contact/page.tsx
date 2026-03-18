import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

// Contact page with intro and form fields.
export default function ContactPage() {
  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        {/* Fixed top header */}
        <SiteHeader />

        {/* Page title section */}
        <section className="page-hero">
          <p className="page-kicker">Love in the Details</p>
          <h1 className="page-title">Contact Us</h1>
        </section>

        {/* Intro text and contact form */}
        <section className="section-block split-section">
          <div>
            <p className="muted-copy">
              Interested in working together? Fill out some info and
              we'll be in touch shortly. We can't wait to hear from you!
            </p>
          </div>

          <form className="form-grid" aria-label="Lorem ipsum form">
            <input className="field" placeholder="First Name" />
            <input className="field" placeholder="Last Name" />
            <input className="field field-wide" placeholder="Email" />
            <input className="field field-wide" placeholder="Phone Number" />
            <textarea className="field field-wide" placeholder="Message" rows={5} />
            <button type="button" className="send-btn">
              Submit
            </button>
          </form>
        </section>

        {/* Shared footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
