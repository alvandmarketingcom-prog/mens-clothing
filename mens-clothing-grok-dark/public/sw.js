/* Service Worker — PWA + Push (network-first, بدون کش HTML تا ۴۰۴ کهنه نماند) */
const CACHE = 'pirahan-static-v2';
const PRECACHE = ['/manifest.webmanifest', '/logo.webp', '/favicon.svg', '/apple-touch-icon.webp'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // فقط دارایی‌های استاتیک را کش کن — صفحات HTML همیشه از شبکه
  const isStatic =
    url.pathname.startsWith('/_next/static') ||
    url.pathname.startsWith('/hero-frames') ||
    /\.(webp|jpg|jpeg|png|svg|mp4|woff2?|css|js)$/i.test(url.pathname);

  if (!isStatic) {
    event.respondWith(
      fetch(req).catch(() => caches.match('/') || Response.error())
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      const net = fetch(req).then((res) => {
        if (res && res.ok) try { cache.put(req, res.clone()); } catch (_) {}
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

self.addEventListener('push', (event) => {
  let data = { title: 'پیراهن مردانه', body: 'اعلان جدید', url: '/' };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch (_) {
    try { data.body = event.data.text(); } catch (__) {}
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/apple-touch-icon.webp',
      badge: '/favicon-32.webp',
      dir: 'rtl',
      lang: 'fa',
      data: { url: data.url || '/' },
      vibrate: [120, 60, 120],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes(self.location.origin) && 'focus' in c) {
          c.navigate(url);
          return c.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
