import { buildPageMetadata } from '@/helpers/metadata';

import ProjectsContents from '@/contents/projects';
import HeaderImage from '@/contents/projects/HeaderImage';
import Page from '@/contents-layouts/Page';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: '项目实践',
  description:
    '聚焦 AI 智能体自动化、高并发业务平台与城市级物联网系统的核心工程实践。',
});

export default function ProjectsPage() {
  return (
    <Page
      frontMatter={{
        title: '项目实践',
        description:
          '聚焦 AI 智能体自动化、高并发业务平台与城市级物联网系统的核心工程实践。',
      }}
      headerImage={<HeaderImage />}
    >
      <ProjectsContents />
    </Page>
  );
}
