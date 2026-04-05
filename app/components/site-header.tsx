'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Shared navigation labels rendered in both desktop and mobile menus.
const links = [
  { href: '/packages', label: 'Packages' },
  { href: '/film', label: 'Film' },
  { href: '/blog', label: 'Blog' },
] as const;

// Matches nested routes without catching unrelated paths.
const isPathActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

// Global site header with desktop navigation and a collapsible mobile menu.
export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Closes the mobile menu once the full desktop header fits again.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="site-header" data-reveal="down">
      <div className="site-header-inner">
        {/* Primary desktop navigation. */}
        <nav className="site-nav" aria-label="Primary navigation">
          {links.map((link) => {
            const isActive = isPathActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center brand lockup. */}
        <Link href="/" className="site-brand">
          Love in the Details
          <span className="site-brand-subtitle">CINEMATIC WEDDING FILMS</span>
        </Link>

        {/* Right-side contact link and mobile menu toggle. */}
        <div className="site-header-right">
          <div className="site-header-social" aria-hidden="true">
            <span className="social-dot" />
            <span className="social-dot" />
            <span className="social-dot" />
          </div>

          <Link
            href="/contact"
            className={`site-nav-link site-header-contact ${isPathActive(pathname, '/contact') ? 'active' : ''}`}
          >
            Contact Us
          </Link>

          <button
            type="button"
            className={`site-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-site-menu"
        className={`site-mobile-menu ${isMenuOpen ? 'open' : ''}`}
      >
        <nav className="site-mobile-menu-links" aria-label="Mobile navigation">
          {links.map((link) => {
            const isActive = isPathActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-mobile-menu-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className={`site-mobile-menu-link ${isPathActive(pathname, '/contact') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
