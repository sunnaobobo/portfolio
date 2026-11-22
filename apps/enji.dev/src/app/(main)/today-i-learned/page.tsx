import { buildPageMetadata } from '@/helpers/metadata';

import TILContents from '@/contents/TIL';
import HeaderImage from '@/contents/TIL/HeaderImage';
import Page from '@/contents-layouts/Page';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: '今日所学',
  description:
    '记录 AI 智能体开发、分布式中间件调优与全栈工程中的实战速记与避坑心得。',
});

export default function TodayILearnedPage() {
  return (
    <Page
      frontMatter={{
        title: '今日所学',
        description:
          '记录 AI 智能体开发、分布式中间件调优与全栈工程中的实战速记与避坑心得。',
      }}
      headerImage={<HeaderImage />}
    >
      <TILContents />
    </Page>
  );
}
