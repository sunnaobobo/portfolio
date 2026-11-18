import { buildPageMetadata } from '@/helpers/metadata';

import ProjectsContents from '@/contents/projects';
import HeaderImage from '@/contents/projects/HeaderImage';
import Page from '@/contents-layouts/Page';

import type { Metadata } from 'next';

export const metadata: Metadata = buildPageMetadata({
  title: 'Projects',
  description: 'Showcase of my front-end related work.',
});

export default function ProjectsPage() {
  return (
    <Page
      frontMatter={{
        title: 'Projects',
        description: 'Showcase of my front-end related work.',
      }}
      headerImage={<HeaderImage />}
    >
      <ProjectsContents />
    </Page>
  );
}
