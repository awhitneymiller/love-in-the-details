import Link from 'next/link';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { SiteImage } from './components/site-image';
import { ScrollGallery } from './components/scroll-gallery';

// Homepage composition with hero, showcase, and ethos sections.
export default function HomePage() {
  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        <SiteHeader />

        {/* Website trailer */}
        <section className="website-trailer">
          <video
            src="/images/wideaf.mov"
            poster="/images/videoframe_0.png"
            autoPlay
            muted
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </section>

        {/* Hero collage 
        <section className="home-hero-grid">
          <div className="hero-image-slot">
            <SiteImage alt="Lorem ipsum dolor sit amet." priority />
          </div>
          <div className="hero-image-slot">
            <SiteImage alt="Lorem ipsum dolor sit amet." priority />
          </div>
          <div className="hero-image-slot">
            <SiteImage alt="Lorem ipsum dolor sit amet." priority />
          </div>
        </section>
          */}


        {/* Company Ethos */}
        <section className="story-pair company-ethos">
          <div className="story-large-image">
            <div className="story-large-image-frame">
              <img src="/images/companyethosimg.JPG" alt="image of founders"></img>
            </div>
          </div>
          <article className="story-copy">
            <h2>Company Ethos</h2>
            <p>
              Our commitment to crafting unforgettable wedding experiences
              is supported by a legacy of unparalleled elegance and meticulous attention
              to detail. Let us turn your dreams into an enchanting reality that will
              leave a lasting impression.
            </p>
            <Link href="/404" className="soft-cta">
              Learn More
            </Link>
          </article>
        </section>

        <ScrollGallery />

        {/* Shared footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
