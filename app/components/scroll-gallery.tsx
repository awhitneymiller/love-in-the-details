import Image from 'next/image';

const galleryImages = [
  { src: '/images/still4.jpg', alt: 'Wedding couple' },
  { src: '/images/still2.jpg', alt: 'Wedding couple.' },
  { src: '/images/still3.jpg', alt: 'Wedding couple' },
  { src: '/images/still1.jpg', alt: 'Reception moment frame.' },
] as const;

export function ScrollGallery() {
  return (
    <section className="scroll-gallery" aria-label="Scrolling image gallery">
      <div className="scroll-gallery-window">
        <div className="scroll-gallery-track">
          {galleryImages.map((image) => (
            <figure className="scroll-gallery-item" key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1020px) 22vw, 22vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
