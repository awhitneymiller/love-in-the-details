import Link from 'next/link';
import Image from 'next/image';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { SiteImage } from './components/site-image';

const scrollingImages = [
  { src: '/images/coverphoto.jpg', alt: 'Wedding couple portrait.' },
  { src: '/images/videoframe_0.png', alt: 'Wedding trailer frame.' },
  { src: '/images/coverphoto.jpg', alt: 'Ceremony detail photograph.' },
  { src: '/images/videoframe_0.png', alt: 'Reception moment frame.' },
  { src: '/images/coverphoto.jpg', alt: 'Wedding day candid shot.' },
] as const;

// Homepage composition with hero, showcase, and ethos sections.
export default function HomePage() {
  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        <SiteHeader />

        {/* Website trailer */}
        <section className="website-trailer">
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

        {/* Scrolling image gallery */}
        <section className="scroll-gallery" aria-label="Scrolling image gallery">
          <div className="scroll-gallery-window">
            <div className="scroll-gallery-track">
              {[...scrollingImages, ...scrollingImages].map((image, index) => (
                <figure className="scroll-gallery-item" key={`${image.src}-${index}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 720px) 70vw, 320px"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Shared footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
