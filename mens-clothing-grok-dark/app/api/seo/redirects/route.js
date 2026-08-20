import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'public', 'seo-redirects.json');

async function readRedirects() {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeRedirects(list) {
  const clean = (Array.isArray(list) ? list : [])
    .map((r) => ({
      from: String(r.from || '').trim(),
      to: String(r.to || '').trim(),
      type: ['301', '302', '410'].includes(String(r.type)) ? String(r.type) : '301',
    }))
    .filter((r) => r.from);
  await fs.writeFile(FILE, JSON.stringify(clean, null, 2), 'utf8');
  return clean;
}

/** GET — لیست ریدایرکت برای middleware و ادمین */
export async function GET() {
  const list = await readRedirects();
  return NextResponse.json({ ok: true, redirects: list, count: list.length });
}

/**
 * POST — همگام‌سازی از پنل ادمین
 * body: { redirects: [...] }
 * روی Vercel فایل‌سیستم ephemeral است؛ برای پروداکشن بعدی: KV/DB.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const list = await writeRedirects(body?.redirects || body || []);
    return NextResponse.json({ ok: true, count: list.length, redirects: list });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'write failed' },
      { status: 400 }
    );
  }
}
