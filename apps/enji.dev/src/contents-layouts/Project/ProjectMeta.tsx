import clsx from 'clsx';
import Link from 'next/link';

import {
  CalendarIcon,
  ChevronRightIcon,
  CodeIcon,
  GitHubIcon,
  NpmIcon,
} from '@/components/Icons';

import type { TProjectFrontMatter } from '@/types';

interface ProjectMetaProps {
  role?: TProjectFrontMatter['role'];
  period?: TProjectFrontMatter['period'];
  githubUrl?: TProjectFrontMatter['githubUrl'];
  npmUrl?: TProjectFrontMatter['npmUrl'];
}

function ProjectMeta({
  role = '',
  period = '',
  githubUrl = '',
  npmUrl = '',
}: ProjectMetaProps) {
  return (
    <div className={clsx('content-wrapper mb-10')}>
      <div
        className={clsx(
          'flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600',
          'dark:text-slate-400'
        )}
      >
        <Link
          href="/projects"
          className={clsx(
            'group inline-flex items-center gap-1.5 font-semibold text-accent-600 transition hover:text-accent-700',
            'dark:text-accent-400 dark:hover:text-accent-300'
          )}
        >
          <ChevronRightIcon
            className={clsx(
              'h-3 w-3 rotate-180 transition group-hover:-translate-x-0.5'
            )}
          />
          返回项目列表
        </Link>
        {role && (
          <div className={clsx('flex items-center gap-1.5')}>
            <CodeIcon className={clsx('h-4 w-4')} />
            <span>担任角色：{role}</span>
          </div>
        )}
        {period && (
          <div className={clsx('flex items-center gap-1.5')}>
            <CalendarIcon className={clsx('h-4 w-4')} />
            <span>{period}</span>
          </div>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx('button button--soft')}
          >
            <GitHubIcon className={clsx('h-5 w-5')} />
            GitHub
          </a>
        )}
        {npmUrl && (
          <a
            href={npmUrl}
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx('button button--soft')}
          >
            <NpmIcon className={clsx('h-5 w-5')} />
            npm
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectMeta;
