'use client';

import dynamic from 'next/dynamic';

/* App is fully client-side (localStorage, drawers, panels). Disable SSR to avoid hydration mismatches. */
const App = dynamic(() => import('../components/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-white/60 text-sm tracking-wide">در حال بارگذاری…</div>
    </div>
  ),
});

export default function Page() {
  return <App />;
}
