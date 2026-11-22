import clsx from 'clsx';

import { QuoteIcon } from '@/components/Icons';

function Quote() {
  return (
    <blockquote
      className={clsx(
        'flex items-start gap-3 pt-2 text-2xl text-slate-500',
        'sm:text-3xl md:gap-4 md:text-4xl lg:pt-0 lg:text-[2.75rem]',
        'dark:text-slate-400'
      )}
    >
      <QuoteIcon
        className={clsx(
          '-mt-1 h-9 shrink-0 text-slate-300',
          'md:-mt-2 md:h-14 lg:h-20',
          'dark:text-slate-800'
        )}
      />
      <span className={clsx('flex flex-col gap-2 tracking-wide', 'lg:gap-3')}>
        <span className={clsx('flex items-center gap-3 leading-[1.3]')}>
          <span
            className={clsx(
              'hidden h-0.5 w-8 rounded-full bg-slate-300',
              'sm:inline-block lg:h-1 lg:w-14',
              'dark:bg-slate-700'
            )}
          />
          <span>
            真正的
            <strong
              className={clsx(
                'mx-1 font-extrabold text-slate-700',
                'dark:text-slate-200'
              )}
            >
              智能自动化
            </strong>
            ，
          </span>
        </span>
        <span className={clsx('leading-[1.3]')}>
          始于模型推理，成于
          <strong
            className={clsx(
              'relative ml-1.5 inline-block font-extrabold text-slate-700',
              'dark:text-slate-200'
            )}
          >
            <span
              className={clsx(
                'absolute -inset-x-1.5 top-1 bottom-0 z-[-1] rounded-lg bg-slate-100',
                'lg:top-1.5',
                'dark:bg-slate-800'
              )}
            />
            工程确定性
          </strong>
          。
        </span>
      </span>
    </blockquote>
  );
}

export default Quote;
