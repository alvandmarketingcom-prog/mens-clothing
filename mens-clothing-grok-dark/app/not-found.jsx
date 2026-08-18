'use client';

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // ریدایرکت نرم به صفحه اصلی بعد از لحظه‌ای کوتاه
    const t = setTimeout(() => {
      try {
        window.location.replace('/');
      } catch (_) {}
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1.5rem',
        fontFamily: 'system-ui, Tahoma, sans-serif',
        textAlign: 'center',
        background: '#5C6065',
        color: '#fcfcfc',
      }}
    >
      <p style={{ fontSize: '3rem', fontWeight: 700, margin: 0, opacity: 0.35 }}>۴۰۴</p>
      <h1 style={{ fontSize: '1.25rem', margin: 0 }}>صفحه پیدا نشد</h1>
      <p style={{ fontSize: '0.875rem', opacity: 0.65, maxWidth: 320, margin: 0 }}>
        آدرس اشتباه است یا صفحه حذف شده. در حال انتقال به صفحه اصلی…
      </p>
      <a
        href="/"
        style={{
          marginTop: '0.5rem',
          padding: '0.65rem 1.5rem',
          borderRadius: 999,
          background: '#F86833',
          color: '#FFFFFF',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        بازگشت به خانه
      </a>
    </div>
  );
}
