import { buildPageMetadata } from '@/helpers/metadata';
import { getBaseUrl } from '@/helpers/url';

import IndexContents from '@/contents/index';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: '孙靖 · AI 全栈开发工程师',
  description:
    '孙靖（Sun Jing）的个人网站与技术博客，聚焦 AI 智能体（Agent）工程化、Spring 分布式架构与现代全栈开发实践。',
  ogImage: `${getBaseUrl()}/assets/images/og-image.png`,
  overrideTitle: true,
});

export default function IndexPage() {
  return <IndexContents />;
}
