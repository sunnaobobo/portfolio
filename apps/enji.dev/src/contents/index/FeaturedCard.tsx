import clsx from 'clsx';

import type { ReactElement } from 'react';

interface FeaturedCardProps {
  icon: ReactElement;
  title: string;
  desc: string;
}

function FeaturedCard({ icon, title, desc }: FeaturedCardProps) {
  return (
    <div
      className={clsx(
        'relative z-10 flex-1 overflow-hidden rounded-2xl border border-divider-light bg-white',
        'dark:border-divider-dark dark:bg-slate-900'
      )}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-9 z-[-1] border-t border-divider-light',
          'dark:border-divider-dark'
        )}
      />
      <div
        className={clsx(
          'absolute inset-y-0 left-9 z-[-1] border-l border-divider-light',
          'dark:border-divider-dark'
        )}
      />
      <div className={clsx('pt-4 pr-4 pl-4')}>
        <div
          className={clsx(
            'flex items-center gap-3.5 rounded-full bg-slate-100 pr-4',
            'dark:bg-slate-800'
          )}
        >
          <div className={clsx('-my-1 shrink-0')}>{icon}</div>
          <div
            className={clsx(
              'truncate py-2 text-[15px] font-bold tracking-wide text-slate-800',
              'dark:text-slate-200'
            )}
          >
            {title}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'px-5 pt-4 pb-5 text-sm leading-7 text-slate-600',
          'dark:text-slate-400'
        )}
      >
        {desc}
      </div>
    </div>
  );
}

export default FeaturedCard;
