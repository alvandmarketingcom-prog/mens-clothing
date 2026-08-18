# پیراهن مردانه + Cinematic Hero

فروشگاه کامل Next.js با هیرو اسکراب‌اسکرول (FORM & THREAD style).

## اجرا محلی

```bash
npm install
npm run dev
```

http://localhost:3000

## دیپلوی روی Vercel

1. پروژه را از پوشه‌ای که **`package.json`** داخلش است آپلود/ایمپورت کنید (اگر زیپ را باز کردید، Root Directory = `project`).
2. Framework Preset: **Next.js** (خودکار تشخیص داده می‌شود).
3. Build Command: `next build` — Install: `npm install`
4. بعد از دیپلوی موفق، URL پیش‌فرض `*.vercel.app` را باز کنید.

اگر صفحه **`404: NOT_FOUND` با Code: NOT_FOUND و ID مثل `lhr1::...`** دیدید:
- این خطای **پلتفرم Vercel** است (دیپلوی پیدا نشده)، نه ۴۰۴ داخل اپ.
- در داشبورد Vercel بررسی کنید دیپلوی **Ready** باشد و حذف/منقضی نشده باشد.
- Root Directory را درست تنظیم کنید.
- دامنه سفارشی را دوباره به دیپلوی فعلی وصل کنید.
- یک Redeploy بزنید.

## هیرو

- `components/Hero.jsx` — sticky video / فریم موبایل
- `components/App.jsx` — کل UI فروشگاه
- `app/` — App Router + `not-found.jsx`
- `public/sw.js` — PWA و پوش

## PWA

- مانیفست: `public/manifest.webmanifest`
- Service Worker: `public/sw.js`
- نصب وب‌اپ از پروفایل خریدار
