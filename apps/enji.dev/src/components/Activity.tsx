'use client';

import clsx from 'clsx';
import { m } from 'framer-motion';
import Link from 'next/link';

import useContentActivity from '@/hooks/useContentActivity';

import { relativeTime } from '@/helpers/date';

import type { TContentActivity, TContentActivityReaction } from '@/types';
import type { Variants } from 'framer-motion';

interface ActivityItemProps {
  data: TContentActivity;
}

function formatContentType(contentType: TContentActivity['contentType']) {
  switch (contentType) {
    case 'POST':
      return '博客文章';
    case 'PROJECT':
      return '项目文档';
    default:
      return '页面';
  }
}

function formatActivityType(activityType: TContentActivity['activityType']) {
  return activityType === 'REACTION' ? '互动反馈' : '分享动态';
}

function ActivityItem({
  data: {
    activityType,
    type,
    slug: _slug,
    contentTitle,
    contentType,
    createdAt: _createdAt,
    ...rest
  },
}: ActivityItemProps) {
  const typeLabel = formatContentType(contentType);

  if (activityType === 'REACTION') {
    const { count } = rest as Pick<TContentActivityReaction, 'count'>;

    let reactionType = '';
    switch (type) {
      case 'AMAZED':
        reactionType = '😲';
        break;
      case 'CLAPPING':
        reactionType = '👏';
        break;
      case 'THINKING':
        reactionType = '🧐';
        break;
      default:
        break;
    }

    return (
      <div className={clsx('flex flex-wrap items-baseline gap-x-1 leading-6')}>
        <span>{typeLabel}</span>
        <span
          className={clsx(
            'font-semibold text-accent-600',
            'dark:text-accent-400'
          )}
        >
          《{contentTitle}》
        </span>
        <span>收到了新的</span>
        {count !== 1 && (
          <span
            className={clsx(
              'rounded-md border border-divider-dark bg-slate-200 px-1 font-mono text-xs font-bold',
              'dark:border-divider-light dark:bg-slate-800'
            )}
          >
            x{count}
          </span>
        )}
        <span>{reactionType}</span>
      </div>
    );
  }

  return (
    <div className={clsx('flex flex-wrap items-baseline gap-x-1 leading-6')}>
      <span>{typeLabel}</span>
      <span
        className={clsx(
          'font-semibold text-accent-600',
          'dark:text-accent-400'
        )}
      >
        《{contentTitle}》
      </span>
      <span>被分享</span>
      {type === 'TWITTER' && <span>到了 Twitter！</span>}
    </div>
  );
}

const animation: Variants = {
  hide: { y: -48, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.12,
    },
  },
};

interface ActivityProps {
  onItemClick?: () => void;
}

function Activity({ onItemClick = () => {} }: ActivityProps) {
  const { data, isLoading } = useContentActivity();

  const renderData = () => {
    if (isLoading) {
      return (
        <m.div
          className={clsx('text-sm text-slate-700', 'dark:text-slate-400')}
          variants={animation}
        >
          正在加载动态…
        </m.div>
      );
    }

    if (Array.isArray(data) && data.length === 0) {
      return (
        <m.div
          className={clsx('text-sm text-slate-700', 'dark:text-slate-400')}
          variants={animation}
        >
          近 24 小时暂无新动态。
        </m.div>
      );
    }

    if (!Array.isArray(data)) {
      return (
        <m.div
          className={clsx('text-sm text-slate-700', 'dark:text-slate-400')}
          variants={animation}
        >
          动态暂时无法加载，请稍后重试。
        </m.div>
      );
    }

    return data.map((activity) => {
      const { createdAt, contentType, slug } = activity;

      const link =
        contentType === 'POST' ? `/blog/${slug}` : `/projects/${slug}`;

      return (
        <m.div key={createdAt} variants={animation}>
          <Link
            href={link}
            onClick={() => {
              onItemClick();
            }}
            className={clsx(
              'block rounded-xl border border-divider-light bg-white/60 p-4 text-[13px] backdrop-blur',
              'dark:border-divider-dark dark:bg-slate-900/60'
            )}
          >
            <div
              className={clsx(
                'mb-1 flex justify-between text-xs text-slate-600',
                'dark:text-slate-400'
              )}
            >
              <span>{formatActivityType(activity.activityType)}</span>
              <span>{relativeTime(activity.createdAt)}</span>
            </div>
            <ActivityItem data={activity} />
          </Link>
        </m.div>
      );
    });
  };

  return (
    <m.div
      initial="hide"
      animate="show"
      transition={{
        delayChildren: 0.12,
        staggerChildren: 0.06,
      }}
      className={clsx('flex flex-1 flex-col gap-2')}
    >
      <m.div variants={animation} className={clsx('px-2 text-xl font-bold')}>
        近期动态
      </m.div>
      <div
        className={clsx(
          'scrollbar-hide flex flex-1 basis-0 flex-col gap-2 overflow-y-auto p-2 pb-4',
          'sm:pb-8'
        )}
      >
        {renderData()}
      </div>
    </m.div>
  );
}

export default Activity;
