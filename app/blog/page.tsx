import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

const BLOG_URL = 'https://loveinthedetailsfilms.blogspot.com';
const API_BASE = 'https://www.googleapis.com/blogger/v3';

type BloggerBlog = {
  id: string;
  name: string;
  description?: string;
  url: string;
};

type BloggerPost = {
  id: string;
  title: string;
  url: string;
  published: string;
  content?: string;
  images?: { url: string }[];
};

const revalidate = 300;

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const getExcerpt = (value = '', maxLength = 160) => {
  const cleaned = stripHtml(value);
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return `${cleaned.slice(0, maxLength).trim()}...`;
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
    `${API_BASE}/blogs/${blogId}/posts?key=${apiKey}&fetchImages=true&maxResults=12`,
    { next: { revalidate } },
  );
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as { items?: BloggerPost[] };
  return data.items ?? [];
}

// Blog page layout wired to Blogger.
export default async function BlogPage() {
  const blog = await fetchBlog();
  const posts = blog ? await fetchPosts(blog.id) : [];

  return (
    <main id="content" className="site-page">
      <div className="site-shell">
        {/* Fixed top header */}
        <SiteHeader />

        {/* Feature card grid */}
        <section className="card-grid">
          {posts.length === 0 ? (
            <article className="page-card">
              <h3>Posts are loading</h3>
            </article>
          ) : (
            posts.map((post) => {
              const imageUrl = post.images?.[0]?.url ?? '/images/coverphoto.jpg';
              const slug = getSlug(post.url) || post.id;
              return (
                <article className="page-card" key={post.id}>
                  <Link href={`/blog/${slug}`} className="page-card-link">
                    <div className="card-image">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 720px) 100vw, 360px"
                        className="card-image-photo"
                      />
                    </div>
                    <p className="page-card-meta">{formatDate(post.published)}</p>
                    <h3>{post.title}</h3>
                    <p>{getExcerpt(post.content)}</p>
                  </Link>
                </article>
              );
            })
          )}
        </section>

        {/* Shared footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
