const BLOG_URL = 'https://loveinthedetailsfilms.blogspot.com';
const API_BASE = 'https://www.googleapis.com/blogger/v3';

// Shared cache window for Blogger-backed pages.
export const BLOG_REVALIDATE = 300;

// Blogger API types used by the journal pages.
export type BloggerBlog = {
  id: string;
  name: string;
  description?: string;
  url?: string;
};

export type BloggerPost = {
  id: string;
  title: string;
  url: string;
  published: string;
  content?: string;
  images?: { url: string }[];
};

// Strips Blogger HTML down to plain text for cards and previews.
export const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

// Shortens long post bodies into a compact card excerpt.
export const getExcerpt = (value = '', maxLength = 160) => {
  const cleaned = stripHtml(value);
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength).trim()}...`;
};

// Formats publish dates in the site's local time zone.
export const formatBlogDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  });

// Pulls the post slug out of a Blogger permalink.
export const getBlogPostSlug = (url: string) => {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] ?? '';
  } catch {
    return '';
  }
};

// Wraps Blogger fetches so failures fall back safely.
async function fetchBloggerJson<T>(url: string) {
  const response = await fetch(url, {
    next: { revalidate: BLOG_REVALIDATE },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

// Resolves the configured Blogger blog ID from its public URL.
export async function fetchBloggerBlog() {
  const apiKey = process.env.BLOGGER_API_KEY;
  if (!apiKey) {
    return null;
  }

  return fetchBloggerJson<BloggerBlog>(
    `${API_BASE}/blogs/byurl?url=${encodeURIComponent(BLOG_URL)}&key=${apiKey}`,
  );
}

// Fetches recent or full post lists for the blog pages.
export async function fetchBloggerPosts(blogId: string, maxResults = 12) {
  const apiKey = process.env.BLOGGER_API_KEY;
  if (!apiKey) {
    return [];
  }

  const data = await fetchBloggerJson<{ items?: BloggerPost[] }>(
    `${API_BASE}/blogs/${blogId}/posts?key=${apiKey}&fetchImages=true&maxResults=${maxResults}`,
  );

  return data?.items ?? [];
}
