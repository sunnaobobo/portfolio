import WithReactions from '@/components/layouts/WithReactions';
import WithTableOfContents from '@/components/layouts/WithTableOfContents';
import SkipNavigation from '@/components/navigations/SkipNavigation';
import PageHeader from '@/components/PageHeader';

import { getSortedProjects } from '@/lib/projects';

import ProjectFooter from '@/contents-layouts/Project/ProjectFooter';
import ProjectMeta from '@/contents-layouts/Project/ProjectMeta';

import type { TProjectFrontMatter, TTableOfContents } from '@/types';
import type { PropsWithChildren } from 'react';

interface ProjectLayoutProps {
  frontMatter: TProjectFrontMatter;
  tableOfContents: TTableOfContents;
}

function ProjectLayout({
  frontMatter: {
    title,
    description,
    caption,
    category,
    role,
    period,
    stack,
    githubUrl,
    npmUrl,
  },
  tableOfContents,
  children = null,
}: PropsWithChildren<ProjectLayoutProps>) {
  const fallback =
    !role || !stack?.length
      ? getSortedProjects().find((item) => item.frontMatter.title === title)
          ?.frontMatter
      : undefined;

  const resolvedCategory = category || fallback?.category;
  const resolvedRole = role || fallback?.role;
  const resolvedPeriod = period || fallback?.period;
  const resolvedStack = stack?.length ? stack : fallback?.stack;

  return (
    <>
      <SkipNavigation />
      <PageHeader
        title={title}
        description={description}
        caption={caption || resolvedCategory}
      />
      <ProjectMeta
        role={resolvedRole}
        period={resolvedPeriod}
        githubUrl={githubUrl}
        npmUrl={npmUrl}
      />
      <WithTableOfContents tableOfContents={tableOfContents}>
        {children}
        <ProjectFooter
          category={resolvedCategory}
          stack={resolvedStack}
          githubUrl={githubUrl}
        />
      </WithTableOfContents>
      <WithReactions contentTitle={title} contentType="PROJECT" />
    </>
  );
}

export default ProjectLayout;
