import { NextResponse } from 'next/server';

/**
 * P0 — ریدایرکت سمت سرور
 * منبع: /api/seo/redirects سپس fallback به /seo-redirects.json
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/seo-redirects.json' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  try {
    const origin = request.nextUrl.origin;
    let list = [];

    const apiRes = await fetch(`${origin}/api/seo/redirects`, {
      headers: { Accept: 'application/json' },
    }).catch(() => null);

    if (apiRes && apiRes.ok) {
      const data = await apiRes.json();
      list = Array.isArray(data.redirects) ? data.redirects : [];
    } else {
      const fileRes = await fetch(`${origin}/seo-redirects.json`).catch(() => null);
      if (fileRes && fileRes.ok) {
        const data = await fileRes.json();
        list = Array.isArray(data) ? data : [];
      }
    }

    const norm = (p) => String(p || '').replace(/\/$/, '') || '/';
    const pathN = norm(pathname);
    const hit = list.find((r) => norm(r.from) === pathN);
    if (!hit) return NextResponse.next();

    const type = String(hit.type || '301');
    if (type === '410') {
      return new NextResponse('Gone', { status: 410 });
    }
    const to = String(hit.to || '/').trim() || '/';
    const url = to.startsWith('http') ? to : new URL(to, request.url).toString();
    return NextResponse.redirect(url, type === '302' ? 302 : 301);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|hero|logo|sw\\.js|.*\\..*).*)'],
};
