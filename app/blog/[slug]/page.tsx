import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import {
  fetchBloggerPosts,
  formatBlogDate,
  getBlogPostSlug,
} from '../../lib/blogger';

export const revalidate = 300;

// Individual journal entry page fetched from Blogger.
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await fetchBloggerPosts(100);
  const post = posts.find((entry) => {
    const slug = getBlogPostSlug(entry.url) || entry.id;
    return slug === params.slug;
  });

  if (!post) {
    notFound();
  }

  const heroImage = post.images?.[0]?.url;

  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        {/* Shared header. */}
        <SiteHeader />

        {/* Post heading and publication date. */}
        <section className="page-hero" data-reveal="up">
          <p className="page-kicker">Journal</p>
          <h1 className="page-title">{post.title}</h1>
          <p className="page-subtitle">{formatBlogDate(post.published)}</p>
        </section>

        {/* Post media and Blogger-rendered body content. */}
        <section className="blog-post" data-reveal="up" data-reveal-delay="1">
          {heroImage ? (
            <div className="blog-post-hero">
              <Image
                src={heroImage}
                alt={post.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="blog-post-hero-image"
              />
            </div>
          ) : null}
          {post.content ? (
            <article
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : null}
        </section>

        {/* Shared footer. */}
        <SiteFooter />
      </div>
    </main>
  );
}
