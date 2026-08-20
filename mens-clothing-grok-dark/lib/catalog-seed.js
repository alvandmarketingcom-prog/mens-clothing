/**
 * کاتالوگ seed برای metadata سمت سرور (P0)
 * تا قبل از اتصال DB، خزنده از این داده title/description/canonical می‌گیرد.
 * کدهای محصول با دموی فرانت هم‌خوان نگه داشته شده‌اند.
 */

export const SITE = {
  name: 'پیراهن مردانه',
  base: 'https://pirahanmardane.ir',
  description:
    'فروشگاه اینترنتی پیراهن مردانه — رسمی، کروات، لینن و آستین کوتاه از فروشندگان معتبر',
};

/** @type {Array<Record<string, any>>} */
export const SEED_PRODUCTS = [
  {
    productCode: 'PM-1001',
    id: '1',
    name: 'پیراهن رسمی سفید کلاسیک',
    seoTitle: 'پیراهن رسمی سفید مردانه | خرید آنلاین',
    seoDescription:
      'پیراهن رسمی سفید مردانه با دوخت دقیق، مناسب محیط کار و مراسم. ارسال سریع از فروشندگان معتبر.',
    category: 'رسمی',
    brandName: 'فروشگاه مرکزی',
    price: 849000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop&q=80&fm=webp',
    rating: 4.6,
    reviewsCount: 28,
  },
  {
    productCode: 'PM-1002',
    id: '2',
    name: 'پیراهن لینن آبی تابستانی',
    seoTitle: 'پیراهن لینن مردانه آبی | خنک و سبک',
    seoDescription:
      'پیراهن لینن آبی مردانه برای فصل گرم؛ سبک، خنک و مناسب استایل روزمره.',
    category: 'آستین کوتاه',
    brandName: 'لینن‌لند',
    price: 720000,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&q=80&fm=webp',
    rating: 4.8,
    reviewsCount: 41,
  },
  {
    productCode: 'PM-1003',
    id: '3',
    name: 'پیراهن کروات سرمه‌ای',
    seoTitle: 'پیراهن مردانه مناسب کروات سرمه‌ای',
    seoDescription:
      'پیراهن سرمه‌ای با یقه رسمی برای کروات و استایل اداری. کیفیت یکنواخت و ارسال از انبار فروشنده.',
    category: 'کروات',
    brandName: 'استایل من',
    price: 910000,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&q=80&fm=webp',
    rating: 4.5,
    reviewsCount: 19,
  },
];

export const SEED_BLOG = [
  {
    id: 'blog-1',
    title: 'راهنمای خرید پیراهن رسمی مردانه',
    seoTitle: 'راهنمای خرید پیراهن رسمی مردانه | نکات انتخاب سایز و پارچه',
    seoDescription:
      'چطور پیراهن رسمی مناسب بخرید؟ راهنمای سایز، پارچه، رنگ و نگهداری برای استایل اداری و مراسم.',
    excerpt: 'نکات کاربردی برای انتخاب پیراهن رسمی مناسب فرم بدن و موقعیت.',
    status: 'published',
  },
  {
    id: 'blog-2',
    title: 'تفاوت پیراهن لینن و نخی',
    seoTitle: 'تفاوت پیراهن لینن و نخی | کدام برای تابستان بهتر است؟',
    seoDescription:
      'مقایسه پارچه لینن و نخی برای پیراهن مردانه در فصل گرم؛ تنفس‌پذیری، چروک و شستشو.',
    excerpt: 'مقایسه کاربردی دو پارچه محبوب تابستانی.',
    status: 'published',
  },
];

export function getProductByCode(code) {
  const c = String(code || '').trim();
  if (!c) return null;
  return (
    SEED_PRODUCTS.find(
      (p) => p.productCode === c || String(p.id) === c || p.productCode?.toLowerCase() === c.toLowerCase()
    ) || null
  );
}

export function getBlogById(id) {
  const c = String(id || '').trim();
  if (!c) return null;
  return SEED_BLOG.find((b) => b.id === c || String(b.id) === c) || null;
}

export function productMetadata(code) {
  const p = getProductByCode(code);
  const base = SITE.base.replace(/\/$/, '');
  if (!p) {
    return {
      title: `محصول ${code || ''} | ${SITE.name}`,
      description: SITE.description,
      alternates: { canonical: `${base}/product/${encodeURIComponent(code || '')}` },
      robots: { index: true, follow: true },
    };
  }
  const title = p.seoTitle || p.name;
  const description = p.seoDescription || SITE.description;
  const url = `${base}/product/${encodeURIComponent(p.productCode)}`;
  const images = p.image ? [{ url: p.image }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'fa_IR',
      siteName: SITE.name,
      images,
    },
    other: p.productCode ? { 'product:retailer_item_id': p.productCode } : undefined,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: p.image ? [p.image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export function blogMetadata(id) {
  const post = getBlogById(id);
  const base = SITE.base.replace(/\/$/, '');
  if (!post) {
    return {
      title: `مطلب | ${SITE.name}`,
      description: SITE.description,
      alternates: { canonical: `${base}/blog/${encodeURIComponent(id || '')}` },
    };
  }
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || SITE.description;
  const url = `${base}/blog/${encodeURIComponent(post.id)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'fa_IR',
      siteName: SITE.name,
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: post.status === 'published', follow: true },
  };
}
