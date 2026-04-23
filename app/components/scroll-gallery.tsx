import Image from 'next/image';

type GalleryImage = {
  src: string;
  alt: string;
  href?: string;
  ariaLabel?: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: '/images/still4.jpg',
    alt: 'Wedding couple',
    href: 'https://www.youtube.com/watch?v=gBL4VAwXhXw',
    ariaLabel: 'Watch the featured film on YouTube',
  },
  { src: '/images/still2.jpg', alt: 'Wedding couple.' },
  { src: '/images/still3.jpg', alt: 'Wedding couple' },
  { src: '/images/still1.jpg', alt: 'Reception moment frame.' },
];

export function ScrollGallery() {
  return (
    <section className="scroll-gallery" aria-label="Scrolling image gallery" data-reveal="up">
      <div className="film-strip-head" data-reveal="up">
        <p className="film-strip-kicker">Featured Films</p>
      </div>

      <div className="scroll-gallery-window">
        <div className="scroll-gallery-track">
          {galleryImages.map((image, index) => (
            <figure
              className="scroll-gallery-item"
              key={image.src}
              data-reveal="up"
              data-reveal-delay={String(index + 1)}
            >
              {image.href ? (
                <a
                  href={image.href}
                  target="_blank"
                  rel="noreferrer"
                  className="scroll-gallery-media"
                  aria-label={image.ariaLabel}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1020px) 22vw, 22vw"
                    className="object-cover"
                  />
                </a>
              ) : (
                <div className="scroll-gallery-media">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1020px) 22vw, 22vw"
                    className="object-cover"
                  />
                </div>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
