const BLOG_URL = 'https://loveinthedetailsfilms.blogspot.com';
const API_BASE = 'https://www.googleapis.com/blogger/v3';
const FEED_URL = `${BLOG_URL}/feeds/posts/default?alt=json`;

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

type BloggerFeed = {
  feed?: {
    entry?: BloggerFeedEntry[];
  };
};

type BloggerFeedEntry = {
  id?: { $t?: string };
  title?: { $t?: string };
  published?: { $t?: string };
  content?: { $t?: string };
  link?: Array<{ rel?: string; href?: string }>;
  'media$thumbnail'?: { url?: string };
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

const extractImageFromHtml = (value = '') => {
  const match = value.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? '';
};

const normalizeFeedImage = (value = '') =>
  value.replace(/\/s\d+(?:-c)?\//, '/s1600/');

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

function mapFeedEntryToPost(entry: BloggerFeedEntry): BloggerPost | null {
  const title = entry.title?.$t?.trim();
  const published = entry.published?.$t;
  const content = entry.content?.$t ?? '';
  const url = entry.link?.find((link) => link.rel === 'alternate')?.href ?? '';

  if (!title || !published || !url) {
    return null;
  }

  const thumbnail = entry['media$thumbnail']?.url ?? '';
  const imageUrl = thumbnail || extractImageFromHtml(content);
  const images = imageUrl ? [{ url: normalizeFeedImage(imageUrl) }] : undefined;

  return {
    id: entry.id?.$t ?? url,
    title,
    url,
    published,
    content,
    images,
  };
}

async function fetchBloggerPostsFromFeed(maxResults: number) {
  const data = await fetchBloggerJson<BloggerFeed>(
    `${FEED_URL}&max-results=${maxResults}`,
  );

  return (data?.feed?.entry ?? [])
    .map(mapFeedEntryToPost)
    .filter((entry): entry is BloggerPost => Boolean(entry));
}

// Resolves the configured Blogger blog ID from its public URL.
export async function fetchBloggerBlog() {
  const apiKey = process.env.BLOGGER_API_KEY;
  if (!apiKey) {
    return {
      id: BLOG_URL,
      name: 'Love in the Details Journal',
      url: BLOG_URL,
    } satisfies BloggerBlog;
  }

  const blog = await fetchBloggerJson<BloggerBlog>(
    `${API_BASE}/blogs/byurl?url=${encodeURIComponent(BLOG_URL)}&key=${apiKey}`,
  );

  return blog ?? {
    id: BLOG_URL,
    name: 'Love in the Details Journal',
    url: BLOG_URL,
  };
}

// Fetches recent or full post lists for the blog pages.
export async function fetchBloggerPosts(maxResults = 12) {
  const apiKey = process.env.BLOGGER_API_KEY;
  if (!apiKey) {
    return fetchBloggerPostsFromFeed(maxResults);
  }

  const blog = await fetchBloggerBlog();
  if (!blog?.id || blog.id === BLOG_URL) {
    return fetchBloggerPostsFromFeed(maxResults);
  }

  const data = await fetchBloggerJson<{ items?: BloggerPost[] }>(
    `${API_BASE}/blogs/${blog.id}/posts?key=${apiKey}&fetchImages=true&maxResults=${maxResults}`,
  );

  return data?.items?.length ? data.items : fetchBloggerPostsFromFeed(maxResults);
}
