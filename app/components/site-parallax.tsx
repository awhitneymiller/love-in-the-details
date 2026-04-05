'use client';

import { useEffect, useRef } from 'react';

const layerSpeeds = [0.06, 0.11, 0.17, 0.24, 0.32] as const;

export function SiteParallax() {
  const layerRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (media.matches) {
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      const y = window.scrollY;

      layerRefs.current.forEach((layer, index) => {
        if (!layer) {
          return;
        }

        layer.style.transform = `translate3d(0, ${(y * layerSpeeds[index]).toFixed(2)}px, 0)`;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="site-parallax" aria-hidden="true">
      <ul className="site-parallax-layers">
        {layerSpeeds.map((_, index) => (
          <li
            key={index}
            ref={(node) => {
              layerRefs.current[index] = node;
            }}
            className={`site-parallax-layer site-parallax-layer-${index + 1}`}
          />
        ))}
      </ul>
    </div>
  );
}
