import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { ScrollGallery } from './components/scroll-gallery';

// Homepage composition with the trailer, ethos section, and image gallery.
export default function HomePage() {
  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        <SiteHeader />

        {/* Website trailer. */}
        <section className="website-trailer" data-reveal="soft">
          <video
            src="/images/websitetrailer.mov"
            poster="/images/videoframe_0.png"
            autoPlay
            muted
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </section>

        {/* Brand ethos and founder portrait. */}
        <section className="story-pair company-ethos">
          <div className="story-large-image" data-reveal="left">
            <div className="story-large-image-frame">
              <Image
                src="/images/companyethosimg.JPG"
                alt="Love in the Details founders"
                fill
                sizes="(max-width: 720px) 100vw, 520px"
                className="story-large-image-frame-img"
              />
            </div>
          </div>
          <article className="story-copy" data-reveal="right" data-reveal-delay="1">
            <h2>Company Ethos</h2>
            <p>
              Our commitment to crafting unforgettable wedding experiences
              is supported by a legacy of unparalleled elegance and meticulous attention
              to detail. Let us turn your dreams into an enchanting reality that will
              leave a lasting impression.
            </p>
            <Link href="/packages" className="soft-cta">
              Learn More
            </Link>
          </article>
        </section>

        {/* Closing image gallery. */}
        <ScrollGallery />

        {/* Shared footer. */}
        <SiteFooter />
      </div>
    </main>
  );
}
