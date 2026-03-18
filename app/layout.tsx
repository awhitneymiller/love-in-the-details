import type { Metadata, Viewport } from 'next';
import './globals.css';

// Global metadata used by all routes.
export const metadata: Metadata = {
  title: 'Love in the Details',
  description: 'Crafting timeless wedding films and imagery.',
};

// Viewport defaults for responsive rendering.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2c1c12',
};

// Root layout wrapper for all app pages.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body>
        {/* Keyboard-accessible skip link */}
        <a
          href="#content"
          className={[
            'sr-only focus:not-sr-only',
            'fixed left-4 top-4 z-50',
            'rounded-none',
            'bg-white',
            'px-3 py-2 text-[12px]',
            'shadow-[0_18px_40px_rgba(0,0,0,0.18)]',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-[#2c1c12]/40',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          ].join(' ')}
        >
          Skip to content
        </a>

        {/* Route content */}
        {children}
      </body>
    </html>
  );
}
