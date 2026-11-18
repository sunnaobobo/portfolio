import { buildPageMetadata } from '@/helpers/metadata';
import { getBaseUrl } from '@/helpers/url';

import IndexContents from '@/contents/index';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: 'Enji Kusnadi · Front-End Developer',
  description:
    'An online portfolio featuring a showcase of my projects and some thoughts as a Front-End Developer who loves intuitive, clean and modern UI design.',
  ogImage: `${getBaseUrl()}/assets/images/og-image.png`,
  overrideTitle: true,
});

export default function IndexPage() {
  return <IndexContents />;
}
