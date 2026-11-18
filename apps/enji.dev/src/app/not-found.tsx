import Error404Contents from '@/contents/404';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Page Not Found' },
  robots: { index: false },
};

export default function NotFound() {
  return <Error404Contents />;
}
