'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';

import useContentMeta from '@/hooks/useContentMeta';

import ProjectCard from '@/contents/projects/ProjectCard';

import type { TProjectFrontMatter } from '@/types';

export type ProjectsContentsProps = {
  projects: Array<{
    slug: string;
    frontMatter: TProjectFrontMatter;
  }>;
};

function ProjectsContents({ projects }: ProjectsContentsProps) {
  const { data } = useContentMeta();
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    projects.forEach(({ frontMatter }) => {
      const cat = frontMatter.category || '全栈工程';
      counts.set(cat, (counts.get(cat) || 0) + 1);
    });

    return [
      { name: '全部', count: projects.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({
        name,
        count,
      })),
    ];
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      projects.filter(({ frontMatter }) => {
        if (activeCategory === '全部') return true;
        return (frontMatter.category || '全栈工程') === activeCategory;
      }),
    [projects, activeCategory]
  );

  return (
    <div className={clsx('content-wrapper')}>
      <div
        className={clsx(
          'mb-8 flex flex-wrap items-center gap-2 border-b border-divider-light pb-5',
          'dark:border-divider-dark'
        )}
      >
        {categories.map(({ name, count }) => {
          const isActive = activeCategory === name;

          return (
            <button
              key={name}
              type="button"
              onClick={() => setActiveCategory(name)}
              className={clsx(
                'flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-accent-600/10 font-semibold text-accent-600 dark:bg-accent-400/15 dark:text-accent-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60'
              )}
            >
              <span>{name}</span>
              <span
                className={clsx(
                  'rounded-full px-2 py-0.5 font-mono text-xs',
                  isActive
                    ? 'bg-accent-600/15 text-accent-700 dark:bg-accent-400/20 dark:text-accent-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className={clsx('grid grid-cols-1 gap-6', 'md:grid-cols-2')}>
        {filteredProjects.map(({ slug, frontMatter }) => {
          const { shares, views } = data[slug]
            ? data[slug].meta
            : { shares: 0, views: 0 };

          return (
            <ProjectCard
              key={slug}
              slug={slug}
              views={views}
              shares={shares}
              featured={
                Boolean(frontMatter.pinned) && activeCategory === '全部'
              }
              {...frontMatter}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsContents;
