import clsx from 'clsx';

import { CheckCircleIcon, XCircleIcon } from '@/components/Icons';

import { formatDate } from '@/helpers/post';

import type { PropsWithChildren, ReactElement } from 'react';

export function Do({ children = null }: PropsWithChildren) {
  return (
    <div className={clsx('mdx-do', 'md:min-w-0 md:flex-1')}>
      <div
        className={clsx(
          'relative flex items-start gap-2 pb-2 text-sm font-semibold text-slate-700',
          'dark:text-slate-300'
        )}
      >
        <div className={clsx('')}>
          <CheckCircleIcon
            className={clsx('h-5 w-5 text-green-600', 'dark:text-green-300')}
          />
          <div
            className={clsx(
              'absolute left-2.5 h-full w-[1px] bg-green-400 opacity-50',
              'dark:bg-green-900'
            )}
          />
        </div>
        推荐写法
      </div>
      <div className={clsx('')}>{children}</div>
    </div>
  );
}

export function Dont({ children = null }: PropsWithChildren) {
  return (
    <div className={clsx('mdx-dont', 'md:min-w-0 md:flex-1')}>
      <div
        className={clsx(
          'relative flex items-start gap-2 pb-2 text-sm font-semibold text-slate-700',
          'dark:text-slate-300'
        )}
      >
        <div className={clsx('')}>
          <XCircleIcon
            className={clsx('h-5 w-5 text-red-600', 'dark:text-red-300')}
          />
          <div
            className={clsx(
              'absolute left-2.5 h-full w-[1px] bg-red-400 opacity-50',
              'dark:bg-red-900'
            )}
          />
        </div>
        避免写法
      </div>
      <div className={clsx('')}>{children}</div>
    </div>
  );
}

export function DnD({ children = null }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        'mdx-dnd flex flex-col gap-6 rounded-xl border-divider-light',
        'lg:flex-row',
        'dark:border-divider-dark'
      )}
    >
      {children}
    </div>
  );
}

export function ItemTags({ children = null }: PropsWithChildren) {
  return <div className={clsx('-mt-1 mb-4 flex gap-2')}>{children}</div>;
}

export function ItemTag({ children = null }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        'inline-flex h-6 items-center gap-1 rounded-full bg-accent-600/[0.08] px-2 text-[13px] font-medium text-accent-600',
        'dark:dark:bg-accent-400/10 dark:font-normal dark:text-accent-400'
      )}
    >
      #{children}
    </div>
  );
}

export function Item({ children = null }: PropsWithChildren) {
  return (
    <article className={clsx('', 'md:pb-16')}>
      <div
        className={clsx(
          'pointer-events-none sticky top-[86px] -ml-8 pb-12',
          'md:-ml-12 lg:-ml-24',
          'fm:relative fm:top-0'
        )}
      >
        <div
          className={clsx(
            'absolute mt-2.5 -ml-0.5 h-4 w-4 rounded-full border-2 border-slate-700 bg-white',
            'md:mt-2 md:-ml-3 md:h-5 md:w-5',
            'dark:border-slate-300 dark:bg-slate-900'
          )}
        />
        <div
          className={clsx(
            'absolute z-[-1] mt-4 -ml-2 w-8 border border-slate-700',
            'md:-ml-4 md:w-10 lg:w-12',
            'dark:border-slate-300'
          )}
        />
      </div>
      <div className={clsx('-mt-12')}>{children}</div>
    </article>
  );
}

interface ItemsProps {
  date: string;
  children?: ReactElement<typeof Item> | ReactElement<typeof Item>[];
}

export function Items({
  date,
  children = null,
}: PropsWithChildren<ItemsProps>) {
  return (
    <div className={clsx('flex flex-row gap-6', 'md:gap-12 lg:gap-24')}>
      <div className={clsx('hidden', 'md:block md:pb-24')}>
        <div
          className={clsx(
            'mt-4 pt-1.5 md:sticky md:top-[86px]',
            'fm:relative fm:top-0'
          )}
        >
          <div
            className={clsx(
              'font-mono font-bold text-slate-700',
              'md:text-right',
              'dark:text-slate-300'
            )}
          >
            <time className={clsx('md:block lg:hidden')} dateTime={date}>
              {date}
            </time>
            <time className={clsx('md:hidden lg:block')} dateTime={date}>
              {formatDate(date)}
            </time>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'items-stretch border border-divider-light',
          'dark:border-divider-dark'
        )}
      />
      <div
        className={clsx(
          'flex min-w-0 flex-1 flex-col gap-16 py-8',
          'md:gap-0 md:py-4'
        )}
      >
        {children}
      </div>
    </div>
  );
}

const TIL = {
  Items,
  Item,
  ItemTags,
  ItemTag,
  DnD,
  Do,
  Dont,
};

export default TIL;
