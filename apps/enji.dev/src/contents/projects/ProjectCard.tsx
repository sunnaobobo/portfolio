'use client';

import clsx from 'clsx';
import { m } from 'framer-motion';
import Link from 'next/link';

import CountUp from '@/components/CountUp';
import { ChevronRightIcon, InsightIcon, PinIcon } from '@/components/Icons';

import type { TProjectFrontMatter } from '@/types';

export type ProjectCardProps = TProjectFrontMatter & {
  slug: string;
  views?: number;
  shares?: number;
  featured?: boolean;
};

function ProjectCard({
  slug,
  title,
  description,
  role = '全栈开发',
  period = '',
  category = '',
  highlights = [],
  stack = [],
  views = 0,
  shares = 0,
  featured = false,
}: ProjectCardProps) {
  const visibleStack = featured ? stack.slice(0, 7) : stack.slice(0, 5);
  const restStackCount = stack.length - visibleStack.length;

  return (
    <article className={clsx('h-full', featured && 'md:col-span-2')}>
      <Link
        href={`/projects/${slug}`}
        className={clsx(
          'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-divider-light bg-white p-6 transition duration-200',
          'hover:border-accent-400 md:p-7',
          'dark:border-divider-dark dark:bg-slate-900 dark:hover:border-accent-500'
        )}
      >
        {featured && (
          <m.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 1, 0, 0] }}
            transition={{
              delay: 1.2,
              duration: 1.84,
              ease: [0.85, 0, 0.15, 1],
            }}
            className="pointer-events-none absolute -inset-x-64 inset-y-0 z-0"
          >
            <div
              className={clsx(
                'absolute inset-y-0 w-10 scale-[4] -rotate-45 bg-black opacity-[0.05]',
                'dark:bg-white dark:opacity-[0.08]'
              )}
            />
          </m.div>
        )}

        <div className={clsx('relative z-10')}>
          {featured && (
            <div
              className={clsx(
                'mb-3 flex items-center gap-2 text-xs font-bold text-accent-600',
                'dark:text-accent-400'
              )}
            >
              <PinIcon className={clsx('h-3.5 w-3.5')} />
              重点代表项目
            </div>
          )}

          <div
            className={clsx(
              'mb-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500',
              'dark:text-slate-400'
            )}
          >
            <div className={clsx('flex flex-wrap items-center gap-1.5')}>
              {category && (
                <span
                  className={clsx(
                    'font-semibold text-slate-700',
                    'dark:text-slate-300'
                  )}
                >
                  {category}
                </span>
              )}
              {category && role && <span>&middot;</span>}
              {role && <span>{role}</span>}
            </div>
            {period && <span className={clsx('font-mono')}>{period}</span>}
          </div>

          <h2
            className={clsx(
              'mb-2.5 text-xl leading-snug font-extrabold text-slate-800 transition-colors group-hover:text-accent-600',
              featured ? 'md:text-2xl' : 'md:text-[1.35rem]',
              'dark:text-slate-100 dark:group-hover:text-accent-400'
            )}
          >
            {title}
          </h2>

          <p
            className={clsx(
              'mb-4 text-sm leading-7 text-slate-600',
              featured && 'max-w-4xl',
              'dark:text-slate-400'
            )}
          >
            {description}
          </p>

          {highlights.length > 0 && (
            <div className={clsx('mb-5 flex flex-wrap gap-2')}>
              {highlights.map((metric) => (
                <span
                  key={metric}
                  className={clsx(
                    'rounded-md bg-accent-600/[0.08] px-2.5 py-1 font-mono text-xs font-semibold text-accent-700',
                    'dark:bg-accent-400/10 dark:text-accent-300'
                  )}
                >
                  {metric}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className={clsx(
            'relative z-10 flex flex-col gap-3 border-t border-divider-light pt-4',
            'sm:flex-row sm:items-center sm:justify-between',
            'dark:border-divider-dark'
          )}
        >
          <div className={clsx('flex flex-wrap items-center gap-1.5')}>
            {visibleStack.map((tech) => (
              <span
                key={tech}
                className={clsx(
                  'rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600',
                  'dark:bg-slate-800 dark:text-slate-400'
                )}
              >
                {tech}
              </span>
            ))}
            {restStackCount > 0 && (
              <span
                className={clsx(
                  'rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500',
                  'dark:bg-slate-800 dark:text-slate-400'
                )}
              >
                +{restStackCount}
              </span>
            )}
          </div>

          <div
            className={clsx(
              'flex shrink-0 items-center justify-between gap-4 sm:justify-end'
            )}
          >
            <div
              className={clsx(
                'flex items-center gap-1.5 text-xs text-slate-500',
                'dark:text-slate-400'
              )}
            >
              <InsightIcon className={clsx('-mt-0.5 h-3.5 w-3.5')} />
              <span>
                <CountUp from={0} to={views} /> 阅读
              </span>
              {shares > 0 && (
                <>
                  <span>&middot;</span>
                  <span>
                    <CountUp from={0} to={shares} /> 分享
                  </span>
                </>
              )}
            </div>

            <div
              className={clsx(
                'inline-flex items-center gap-1 text-sm font-semibold text-accent-600',
                'dark:text-accent-400'
              )}
            >
              查看详情
              <ChevronRightIcon className="mt-0.5 h-3 w-3 transition group-hover:animate-bounce-x" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
