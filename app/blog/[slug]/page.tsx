import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

const BLOG_URL = 'https://loveinthedetailsfilms.blogspot.com';
const API_BASE = 'https://www.googleapis.com/blogger/v3';

const revalidate = 300;

type BloggerBlog = {
  id: string;
  name: string;
};

type BloggerPost = {
  id: string;
  title: string;
  url: string;
  published: string;
  content?: string;
  images?: { url: string }[];
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  });

const getSlug = (url: string) => {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] ?? '';
  } catch {
    return '';
  }
};

async function fetchBlog() {
  const apiKey = process.env.BLOGGER_API_KEY;
  if (!apiKey) {
    return null;
  }
  const response = await fetch(
    `${API_BASE}/blogs/byurl?url=${encodeURIComponent(BLOG_URL)}&key=${apiKey}`,
    { next: { revalidate } },
  );
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as BloggerBlog;
}

async function fetchPosts(blogId: string) {
  const apiKey = process.env.BLOGGER_API_KEY;
  if (!apiKey) {
    return [];
  }
  const response = await fetch(
    `${API_BASE}/blogs/${blogId}/posts?key=${apiKey}&fetchImages=true&maxResults=100`,
    { next: { revalidate } },
  );
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as { items?: BloggerPost[] };
  return data.items ?? [];
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await fetchBlog();
  if (!blog) {
    notFound();
  }

  const posts = await fetchPosts(blog.id);
  const post = posts.find((entry) => {
    const slug = getSlug(entry.url) || entry.id;
    return slug === params.slug;
  });

  if (!post) {
    notFound();
  }

  const heroImage = post.images?.[0]?.url;

  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        <SiteHeader />

        <section className="page-hero">
          <p className="page-kicker">Journal</p>
          <h1 className="page-title">{post.title}</h1>
          <p className="page-subtitle">{formatDate(post.published)}</p>
        </section>

        <section className="blog-post">
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

        <SiteFooter />
      </div>
    </main>
  );
}
