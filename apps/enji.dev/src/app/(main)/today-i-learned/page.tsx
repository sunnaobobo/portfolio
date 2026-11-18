import { buildPageMetadata } from '@/helpers/metadata';

import TILContents from '@/contents/TIL';
import HeaderImage from '@/contents/TIL/HeaderImage';
import Page from '@/contents-layouts/Page';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: 'Today I Learned',
  description: 'Short notes on front-end related topics.',
});

export default function TodayILearnedPage() {
  return (
    <Page
      frontMatter={{
        title: 'Today I Learned',
        description: 'Short notes on front-end related topics.',
      }}
      headerImage={<HeaderImage />}
    >
      <TILContents />
    </Page>
  );
}
