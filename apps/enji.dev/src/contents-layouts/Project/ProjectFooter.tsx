import clsx from 'clsx';
import Link from 'next/link';

import type { TProjectFrontMatter } from '@/types';
import type { PropsWithChildren } from 'react';

type ChipProps = {
  href: string;
};

function Chip({ href, children = null }: PropsWithChildren<ChipProps>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex h-6 items-center gap-1 rounded-full bg-accent-600/[0.08] px-2.5 text-[13px] font-medium text-accent-600',
        'dark:bg-accent-400/10 dark:font-normal dark:text-accent-400'
      )}
    >
      {children}
    </Link>
  );
}

interface ProjectFooterProps {
  category?: TProjectFrontMatter['category'];
  stack?: TProjectFrontMatter['stack'];
  githubUrl?: TProjectFrontMatter['githubUrl'];
}

function ProjectFooter({
  category = '',
  stack = [],
  githubUrl = '',
}: ProjectFooterProps) {
  return (
    <div
      className={clsx(
        'mt-24 flex flex-col gap-6 border-t border-divider-light pt-8 text-sm text-slate-600',
        'dark:border-divider-dark dark:text-slate-400'
      )}
    >
      {(category || stack.length > 0) && (
        <div className={clsx('flex flex-wrap items-center gap-x-1.5 gap-y-2')}>
          {category && (
            <>
              <span>所属领域：</span>
              <Link
                href="/projects"
                className={clsx(
                  'font-bold text-accent-600',
                  'dark:text-accent-400'
                )}
              >
                {category}
              </Link>
            </>
          )}
          {category && stack.length > 0 && <span>·</span>}
          {stack.length > 0 && (
            <>
              <span>技术架构：</span>
              <div className={clsx('flex flex-wrap gap-1.5')}>
                {stack.map((tech) => (
                  <Chip href="/projects" key={tech}>
                    {tech}
                  </Chip>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {githubUrl && (
        <div className={clsx('flex flex-wrap gap-x-1 gap-y-2')}>
          <div>
            有任何建议或反馈？欢迎前往 GitHub{' '}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer nofollow"
              className={clsx('link')}
            >
              提交 Issue 或参与讨论
            </a>
            。
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectFooter;
