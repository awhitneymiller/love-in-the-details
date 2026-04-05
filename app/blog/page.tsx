import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import {
  fetchBloggerBlog,
  fetchBloggerPosts,
  formatBlogDate,
  getBlogPostSlug,
  getExcerpt,
} from '../lib/blogger';

export const revalidate = 300;

// Journal landing page that lists recent Blogger posts.
export default async function BlogPage() {
  const blog = await fetchBloggerBlog();
  const posts = blog ? await fetchBloggerPosts(blog.id, 12) : [];

  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        {/* Shared header. */}
        <SiteHeader />

        {/* Recent journal entries. */}
        <section className="card-grid" aria-label="Journal entries" data-reveal="up">
          {posts.length === 0 ? (
            <article className="page-card" data-reveal="up" data-reveal-delay="1">
              <h3>Journal coming soon</h3>
              <p>Stories, frames, and wedding notes will live here soon.</p>
            </article>
          ) : (
            posts.map((post, index) => {
              const imageUrl = post.images?.[0]?.url ?? '/images/coverphoto.jpg';
              const slug = getBlogPostSlug(post.url) || post.id;
              return (
                <article
                  className="page-card"
                  key={post.id}
                  data-reveal="up"
                  data-reveal-delay={String((index % 3) + 1)}
                >
                  <Link
                    href={`/blog/${slug}`}
                    className="page-card-link"
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="card-image">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 720px) 100vw, 360px"
                        className="card-image-photo"
                      />
                    </div>
                    <p className="page-card-meta">{formatBlogDate(post.published)}</p>
                    <h3>{post.title}</h3>
                    <p>{getExcerpt(post.content)}</p>
                  </Link>
                </article>
              );
            })
          )}
        </section>

        {/* Shared footer. */}
        <SiteFooter />
      </div>
    </main>
  );
}
