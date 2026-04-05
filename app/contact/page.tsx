import Image from 'next/image';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { ContactForm } from './contact-form';

// Contact page with an editorial split layout and inquiry details.
export default function ContactPage() {
  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        <SiteHeader />

        {/* Split portrait and inquiry card. */}
        <section className="contact-studio">
          <div className="contact-studio-photo" data-reveal="left">
            <div className="contact-studio-photo-frame">
              <Image
                src="/images/companyethosimg.JPG"
                alt="Love in the Details founders"
                fill
                priority
                sizes="(max-width: 820px) 100vw, 40vw"
                className="contact-studio-image"
              />
            </div>
          </div>

          <div className="contact-studio-content" data-reveal="right" data-reveal-delay="1">
            <p className="contact-studio-kicker">Love in the Details</p>
            <h1 className="contact-studio-title">Contact Us</h1>

            {/* Inquiry fields and studio details. */}
            <section className="contact-studio-panel" data-reveal="up" data-reveal-delay="2">
              <ContactForm />

              {/* Studio details and preferred platforms. */}
              <aside className="contact-studio-aside">
                <div className="contact-studio-detail">
                  <p className="contact-studio-label">Contact</p>
                  <a className="contact-studio-link" href="mailto:hello@loveinthedetails.com">
                    hello@loveinthedetails.com
                  </a>
                </div>

                <div className="contact-studio-detail">
                  <p className="contact-studio-label">Based In</p>
                  <p>California</p>
                </div>

                <ul className="contact-studio-social-list" aria-label="Preferred platforms">
                  <li>Instagram</li>
                  <li>Vimeo</li>
                  <li>Pinterest</li>
                </ul>
              </aside>
            </section>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
