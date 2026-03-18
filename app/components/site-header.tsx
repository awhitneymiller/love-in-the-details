'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Navigation labels for the header.
const links = [
  { href: '/packages', href404: '/404', label: 'Packages' },
  { href: '/film', href404: '/404', label: 'Film' },
  { href: '/blog', href404: '/404', label: 'Blog' },
] as const;

// Global site header with active-link and scroll state styling.
export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggles scrolled style after a small scroll threshold.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        {/* Left navigation links */}
        <nav className="site-nav" aria-label="Lorem ipsum dolor">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href404}
                className={`site-nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center brand title */}
        <Link href="/" className="site-brand">
          Love in the Details
          <span className="site-brand-subtitle">CINEMATIC WEDDING FILMS</span>
        </Link>

        {/* Right social dots and CTA */}
        <div className="site-header-right">
          <div className="site-header-social" aria-label="Lorem ipsum social">
            <span className="social-dot" />
            <span className="social-dot" />
            <span className="social-dot" />
          </div>

          <Link
            href="/contact"
            className={`site-cta ${pathname.startsWith('/contact') ? 'active' : ''}`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
