import { SITE } from '@/lib/catalog-seed';

const base = SITE.base.replace(/\/$/, '');

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/seller-panel',
          '/seller',
          '/checkout',
          '/cart',
          '/wishlist',
          '/compare',
          '/profile',
          '/api/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/product/', '/blog/', '/shop', '/brands', '/sellers', '/faq', '/size-guide'],
        disallow: ['/checkout', '/cart', '/profile', '/admin', '/seller-panel', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/product/', '/blog/', '/shop'],
        disallow: ['/checkout', '/cart', '/profile', '/admin', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
