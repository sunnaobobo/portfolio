import { buildPageMetadata } from '@/helpers/metadata';
import { getSortedPosts } from '@/lib/posts';

import BlogContents from '@/contents/blog';
import HeaderImage from '@/contents/blog/HeaderImage';
import Page from '@/contents-layouts/Page';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: 'Personal Blog',
  description: 'Web development thoughts and stories.',
});

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <Page
      frontMatter={{
        title: 'Personal Blog',
        description: 'Web development thoughts and stories.',
      }}
      headerImage={<HeaderImage />}
    >
      <BlogContents posts={posts} />
    </Page>
  );
}
