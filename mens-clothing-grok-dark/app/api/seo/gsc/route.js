import { NextResponse } from 'next/server';

/**
 * اسکلت Google Search Console API (P0)
 * اتصال واقعی نیاز به OAuth کلاینت در Google Cloud دارد.
 * GET: وضعیت پیکربندی
 * POST: ذخیره siteUrl / تأیید (شبیه‌سازی تا کلید واقعی)
 */

export async function GET() {
  const configured = !!(
    process.env.GSC_CLIENT_ID &&
    process.env.GSC_CLIENT_SECRET &&
    process.env.GSC_REFRESH_TOKEN
  );

  return NextResponse.json({
    ok: true,
    connected: configured,
    siteUrl: process.env.GSC_SITE_URL || 'https://pirahanmardane.ir/',
    message: configured
      ? 'اعتبار GSC در env تنظیم شده — می‌توانید کوئری واقعی را وصل کنید'
      : 'برای اتصال واقعی: GSC_CLIENT_ID، GSC_CLIENT_SECRET، GSC_REFRESH_TOKEN را در env بگذارید',
    endpoints: {
      searchAnalytics: 'https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/searchAnalytics/query',
      sitemaps: 'https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps',
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = body?.action || 'status';

    if (action === 'test') {
      const configured = !!(process.env.GSC_CLIENT_ID && process.env.GSC_REFRESH_TOKEN);
      return NextResponse.json({
        ok: configured,
        simulated: !configured,
        rows: configured
          ? []
          : [
              { query: 'پیراهن مردانه', clicks: 0, impressions: 0, ctr: 0, position: 0, note: 'داده نمونه — GSC واقعی وصل نیست' },
              { query: 'پیراهن رسمی', clicks: 0, impressions: 0, ctr: 0, position: 0, note: 'داده نمونه' },
            ],
        message: configured
          ? 'آماده فراخوانی Search Analytics'
          : 'حالت شبیه‌سازی — env را تکمیل کنید',
      });
    }

    return NextResponse.json({
      ok: true,
      saved: false,
      message: 'ذخیره تنظیمات GSC فقط از طریق متغیرهای محیطی سرور انجام می‌شود',
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 400 });
  }
}
