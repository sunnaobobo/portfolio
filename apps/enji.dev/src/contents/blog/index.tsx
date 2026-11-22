'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';

import useContentMeta from '@/hooks/useContentMeta';

import PostPreview from '@/contents/blog/PostPreview';

import type { TPostFrontMatter } from '@/types';

const PINNED_POST = 'agent-harness-in-production';

export type BlogContentsProps = {
  posts: Array<{
    slug: string;
    frontMatter: TPostFrontMatter;
  }>;
};

type TPostPreview = TPostFrontMatter & {
  slug: string;
  shares: number;
  views: number;
};

function BlogContents({ posts }: BlogContentsProps) {
  const { data } = useContentMeta();
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    posts.forEach(({ frontMatter }) => {
      counts.set(
        frontMatter.category,
        (counts.get(frontMatter.category) || 0) + 1
      );
    });

    return [
      { name: '全部', count: posts.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({
        name,
        count,
      })),
    ];
  }, [posts]);

  let pinnedPost: TPostPreview | undefined;
  const postsPreview: Array<TPostPreview> = [];

  posts.forEach(({ slug, frontMatter }) => {
    if (activeCategory !== '全部' && frontMatter.category !== activeCategory) {
      return;
    }

    const { shares, views } = data[slug]
      ? data[slug].meta
      : { shares: 0, views: 0 };

    const preview: TPostPreview = {
      slug,
      views,
      shares,
      ...frontMatter,
    };

    if (slug === PINNED_POST && activeCategory === '全部') {
      pinnedPost = preview;
    } else {
      postsPreview.push(preview);
    }
  });

  return (
    <div className={clsx('content-wrapper')}>
      <div
        className={clsx(
          'flex flex-col gap-8',
          'md:flex-row md:gap-10 lg:gap-16'
        )}
      >
        <aside className={clsx('md:w-56 md:shrink-0')}>
          <div className={clsx('md:sticky md:top-24')}>
            <div
              className={clsx(
                'mb-3 text-xs font-bold tracking-wider text-slate-500',
                'dark:text-slate-400'
              )}
            >
              文章分类
            </div>
            <div
              className={clsx('flex flex-wrap gap-2', 'md:flex-col md:gap-1.5')}
            >
              {categories.map(({ name, count }) => {
                const isActive = activeCategory === name;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActiveCategory(name)}
                    className={clsx(
                      'flex items-center justify-between gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition',
                      isActive
                        ? 'bg-accent-600/10 font-semibold text-accent-600 dark:bg-accent-400/15 dark:text-accent-400'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60'
                    )}
                  >
                    <span>{name}</span>
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 font-mono text-xs',
                        isActive
                          ? 'bg-accent-600/15 text-accent-700 dark:bg-accent-400/20 dark:text-accent-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
        <div className={clsx('flex-1')}>
          {pinnedPost && (
            <div
              className={clsx(
                'mb-8 flex items-start gap-4',
                'md:mb-10 md:gap-6'
              )}
            >
              <div className={clsx('flex-1')}>
                <PostPreview
                  pinned
                  slug={pinnedPost.slug}
                  category={pinnedPost.category}
                  title={pinnedPost.title}
                  description={pinnedPost.description}
                  date={pinnedPost.date}
                  lang={pinnedPost.lang}
                  tags={pinnedPost.tags}
                  views={pinnedPost.views}
                  shares={pinnedPost.shares}
                />
              </div>
            </div>
          )}

          {postsPreview.map(
            ({
              slug,
              category,
              title,
              description,
              date,
              lang,
              tags,
              views,
              shares,
            }) => (
              <div
                key={slug}
                className={clsx(
                  'mb-8 flex items-start gap-4',
                  'md:mb-4 md:gap-6'
                )}
              >
                <div
                  className={clsx(
                    'mt-14 hidden w-8 -translate-y-1 border-b border-divider-light',
                    'md:mt-16 md:w-14 lg:block',
                    'dark:border-divider-dark'
                  )}
                />
                <div className={clsx('flex-1')}>
                  <PostPreview
                    slug={slug}
                    category={category}
                    title={title}
                    description={description}
                    date={date}
                    lang={lang}
                    tags={tags}
                    views={views}
                    shares={shares}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogContents;
