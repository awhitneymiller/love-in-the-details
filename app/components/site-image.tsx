import Image from 'next/image';

// Shared image prop type for reusable image blocks.
type SiteImageProps = {
  alt: string;
  priority?: boolean;
  className?: string;
};

// Standardized image renderer used across the site.
export function SiteImage({ alt, priority = false, className = '' }: SiteImageProps) {
  return (
    <Image
      src="/images/coverphoto.jpg"
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 720px) 100vw, 1100px"
      className={['object-cover', className].join(' ')}
    />
  );
}
