import clsx from 'clsx';

export interface ProjectMetricItem {
  value: string;
  label: string;
  detail?: string;
}

interface ProjectMetricStripProps {
  items: Array<ProjectMetricItem>;
}

function ProjectMetricStrip({ items }: ProjectMetricStripProps) {
  return (
    <div
      className={clsx(
        'my-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-divider-light bg-white',
        'sm:grid-cols-2 lg:grid-cols-4',
        'dark:border-divider-dark dark:bg-slate-900'
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className={clsx(
            'flex flex-col justify-between gap-1.5 px-4 py-4',
            'sm:px-5 sm:py-4',
            index > 0 &&
              'border-t border-divider-light dark:border-divider-dark',
            index === 1 && 'border-t-0 border-l',
            index === 3 && 'border-l',
            index > 0 && 'lg:border-t-0 lg:border-l'
          )}
        >
          <span
            className={clsx(
              'font-mono text-xl leading-tight font-extrabold tracking-tight text-accent-600',
              'md:text-2xl',
              'dark:text-accent-400'
            )}
          >
            {item.value}
          </span>
          <div className={clsx('flex flex-col gap-0.5')}>
            <span
              className={clsx(
                'text-xs font-bold text-slate-700',
                'dark:text-slate-200'
              )}
            >
              {item.label}
            </span>
            {item.detail && (
              <span
                className={clsx(
                  'text-[11px] leading-snug text-slate-500',
                  'dark:text-slate-400'
                )}
              >
                {item.detail}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectMetricStrip;
