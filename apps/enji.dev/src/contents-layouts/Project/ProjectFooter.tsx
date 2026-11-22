import clsx from 'clsx';

import { TProjectFrontMatter } from '@/types';

interface ProjectFooterProps {
  githubUrl?: TProjectFrontMatter['githubUrl'];
}

function ProjectFooter({ githubUrl = '' }: ProjectFooterProps) {
  if (!githubUrl) return null;

  return (
    <div
      className={clsx(
        'mt-24 flex flex-col gap-6 text-sm text-slate-600',
        'md:flex-row md:items-center md:justify-between',
        'dark:text-slate-500'
      )}
    >
      <div className={clsx('flex flex-wrap gap-x-1 gap-y-2')}>
        <div className={clsx('')}>
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
    </div>
  );
}

export default ProjectFooter;
