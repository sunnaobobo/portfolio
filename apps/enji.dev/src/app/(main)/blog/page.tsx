import { buildPageMetadata } from '@/helpers/metadata';
import { getSortedPosts } from '@/lib/posts';

import BlogContents from '@/contents/blog';
import HeaderImage from '@/contents/blog/HeaderImage';
import Page from '@/contents-layouts/Page';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: '技术博客',
  description:
    '围绕 AI 智能体工程化、分布式后端架构与物联网高并发实践的技术沉淀。',
});

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <Page
      frontMatter={{
        title: '技术博客',
        description:
          '围绕 AI 智能体工程化、分布式后端架构与物联网高并发实践的技术沉淀。',
      }}
      headerImage={<HeaderImage />}
    >
      <BlogContents posts={posts} />
    </Page>
  );
}
