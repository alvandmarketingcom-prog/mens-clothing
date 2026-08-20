import { SEED_PRODUCTS, SEED_BLOG, SITE } from '@/lib/catalog-seed';

const base = SITE.base.replace(/\/$/, '');

export default function sitemap() {
  const now = new Date();
  const staticPaths = [
    { path: '', priority: 1, changeFrequency: 'daily' },
    { path: '/shop', priority: 0.95, changeFrequency: 'daily' },
    { path: '/deals', priority: 0.85, changeFrequency: 'daily' },
    { path: '/sellers', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/brands', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.65, changeFrequency: 'monthly' },
    { path: '/size-guide', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/returns', priority: 0.45, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/become-seller', priority: 0.55, changeFrequency: 'monthly' },
  ];

  const entries = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path || '/'}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  SEED_PRODUCTS.forEach((p) => {
    entries.push({
      url: `${base}/product/${encodeURIComponent(p.productCode)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  });

  SEED_BLOG.filter((b) => b.status === 'published').forEach((b) => {
    entries.push({
      url: `${base}/blog/${encodeURIComponent(b.id)}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    });
  });

  return entries;
}
