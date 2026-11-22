'use client';

import clsx from 'clsx';
import { m } from 'framer-motion';

import type { ReactNode } from 'react';

const animation = {
  hide: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

interface PageHeaderProps {
  title: string;
  description: string;
  caption?: string;
  headerImage?: ReactNode;
}

function PageHeader({
  title,
  description,
  caption = '',
  headerImage = null,
}: PageHeaderProps) {
  return (
    <header
      id="page-header"
      className={clsx(
        'background-grid background-grid--fade-out z-[900] mb-10 border-b border-divider-light pt-32 pb-10',
        'md:mb-0 md:border-none md:pt-40 md:pb-20',
        'dark:border-divider-dark'
      )}
    >
      {headerImage && (
        <div
          className={clsx('content-wrapper absolute inset-0 overflow-hidden')}
        >
          <div
            className={clsx(
              'background-image background-image--fade-out pointer-events-none absolute inset-0 hidden select-none',
              'lg:block'
            )}
          >
            <div className={clsx('content-wrapper relative h-full')}>
              <div className={clsx('absolute -top-24 right-0 bottom-0')}>
                {headerImage}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={clsx('content-wrapper')}>
        {caption && (
          <m.div
            initial={animation.hide}
            animate={animation.show}
            transition={{ delay: 0 }}
          >
            <span
              className={clsx(
                'mb-2 block text-base leading-none font-bold tracking-wide text-accent-600',
                'md:mb-3 md:text-xl',
                'dark:text-accent-400'
              )}
            >
              {caption}
            </span>
          </m.div>
        )}
        <m.div
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.1 }}
        >
          <h1
            className={clsx(
              'text-[2.25rem] leading-[1.2] font-extrabold tracking-tight text-slate-800',
              'md:text-6xl md:leading-[1.18]',
              'dark:text-slate-200'
            )}
          >
            {title}
          </h1>
        </m.div>
        <m.div
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.2 }}
        >
          <p
            className={clsx(
              'mt-4 text-base leading-relaxed text-slate-600',
              'md:mt-5 md:text-xl md:leading-relaxed lg:max-w-[540px] xl:max-w-[680px]',
              'dark:text-slate-400'
            )}
          >
            {description}
          </p>
        </m.div>
      </div>
    </header>
  );
}

export default PageHeader;
