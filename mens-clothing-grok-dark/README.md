# پیراهن مردانه | PIRAHANMARDANE.IR

فروشگاه Next.js (App Router) — پنل خریدار / فروشنده / ادمین، سئو، آنالیتیکس.

## نیازمندی

- Node.js **18.18+** (پیشنهادی: ۲۰ LTS)
- npm

## اجرای محلی

```bash
npm install
npm run dev
```

آدرس: [http://localhost:3000](http://localhost:3000)

```bash
npm run build
npm start
```

## GitHub

از ریشه‌ای که `package.json` دارد:

```bash
git init
git add .
git commit -m "Initial commit: mens clothing store frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

> `node_modules` و `.next` با `.gitignore` نادیده گرفته می‌شوند.

## دیپلوی روی Vercel

### از GitHub (پیشنهادی)

1. [vercel.com](https://vercel.com) → ورود با GitHub  
2. **Add New Project** → Import ریپو  
3. تنظیمات:
   - Framework: **Next.js**
   - Root Directory: `.` (ریشه ریپو)
   - Build Command: `next build` (پیش‌فرض)
   - Install Command: `npm install` (پیش‌فرض)
   - Node: از `.nvmrc` → **20**
4. **Deploy**

بعد از هر `git push` روی `main`، دیپلوی خودکار انجام می‌شود.

### دامنه

Vercel → Project → **Settings → Domains** → دامنه را اضافه و DNS را تنظیم کنید.

### نکته ۴۰۴ پلتفرم Vercel

اگر خود Vercel `NOT_FOUND` داد (نه ۴۰۴ داخل سایت):

- وضعیت دیپلوی باید **Ready** باشد  
- Root Directory درست باشد  
- یک **Redeploy** بزنید  

## ساختار

| مسیر | توضیح |
|------|--------|
| `app/` | App Router، API، sitemap، robots |
| `components/` | UI فروشگاه، هیرو، پنل‌ها |
| `public/` | استاتیک، PWA، ریدایرکت |
| `middleware.js` | ریدایرکت سمت سرور |
| `vercel.json` | تنظیمات Vercel |

## اسکریپت‌ها

| دستور | کار |
|--------|-----|
| `npm run dev` | توسعه |
| `npm run build` | بیلد تولید |
| `npm start` | اجرای بیلد |
| `npm run qa` | چک سبک فرانت |
