import Image from 'next/image';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

type FilmItem = {
  title: string;
  label: string;
  image: string;
  href: string;
};

const featuredFilms: FilmItem[] = [
  {
    title: 'An Elegant Garden Celebration',
    label: 'YouTube Film',
    image: '/images/still1.jpg',
    href: 'https://www.youtube.com/results?search_query=elegant+garden+wedding+film',
  },
  {
    title: 'A Candlelit Estate Reception',
    label: 'YouTube Film',
    image: '/images/still2.jpg',
    href: 'https://www.youtube.com/results?search_query=estate+wedding+film',
  },
  {
    title: 'Coastal Vows at Golden Hour',
    label: 'YouTube Film',
    image: '/images/still3.jpg',
    href: 'https://www.youtube.com/results?search_query=coastal+wedding+film',
  },
  {
    title: 'A Modern Black-Tie Story',
    label: 'YouTube Film',
    image: '/images/still4.jpg',
    href: 'https://www.youtube.com/results?search_query=black+tie+wedding+film',
  },
];

const featuredReels: FilmItem[] = [
  {
    title: 'Editorial Portrait Moments',
    label: 'Instagram Reel',
    image: '/images/still4.jpg',
    href: 'https://www.instagram.com/explore/tags/weddingreels/',
  },
  {
    title: 'Soft Coastal Highlights',
    label: 'Instagram Post',
    image: '/images/still3.jpg',
    href: 'https://www.instagram.com/explore/tags/coastalwedding/',
  },
  {
    title: 'Reception Energy',
    label: 'Instagram Reel',
    image: '/images/still2.jpg',
    href: 'https://www.instagram.com/explore/tags/weddingfilm/',
  },
];

export default function FilmPage() {
  return (
    <main id="content" className="site-page film-page">
      <div className="site-shell">
        <SiteHeader />


        {/* YouTube gallery. */}
        <section className="film-strip-head" data-reveal="up">
          <p className="film-strip-kicker">Featured Films</p>
        </section>

        <section className="film-gallery" aria-label="Featured wedding films">
          {featuredFilms.map((film, index) => (
            <article
              key={film.title}
              className="film-gallery-card"
              data-reveal="up"
              data-reveal-delay={String((index % 4) + 1)}
            >
              <a
                href={film.href}
                target="_blank"
                rel="noreferrer"
                className="film-gallery-link"
                aria-label={`Watch ${film.title} on YouTube`}
              >
                <div className="film-gallery-image-wrap">
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    className="film-gallery-image"
                  />
                  <div className="film-gallery-badge">
                    <span>Watch on YouTube</span>
                  </div>
                </div>

                <div className="film-gallery-copy">
                  <p className="film-gallery-label">{film.label}</p>
                  <h3>{film.title}</h3>
                </div>
              </a>
            </article>
          ))}
        </section>

        {/* Instagram card grid. */}
        <section className="film-strip-head film-strip-head-secondary" data-reveal="up">
          <p className="film-strip-kicker">Instagram</p>
        </section>

        <section className="film-social-grid" aria-label="Instagram posts and reels">
          {featuredReels.map((item, index) => (
            <article
              key={item.title}
              className="film-social-card"
              data-reveal="up"
              data-reveal-delay={String((index % 3) + 1)}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="film-social-link"
                aria-label={`Open ${item.title} on Instagram`}
              >
                <div className="film-social-image-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="film-social-image"
                  />
                </div>

                <div className="film-social-copy">
                  <p className="film-social-label">{item.label}</p>
                  <h3>{item.title}</h3>
                </div>
              </a>
            </article>
          ))}
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
