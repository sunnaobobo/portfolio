'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { EyeSlash } from '@/components/Icons';
import Image from '@/components/mdx/Image';

import type { ImageProps } from '@/components/mdx/Image';

type ImageSensitiveProps = ImageProps & {
  message?: string;
};

export default function ImageSensitive({
  message = '',
  alt = '',
  ...props
}: ImageSensitiveProps) {
  const [isShown, setShown] = useState<boolean>(false);

  return (
    <div className={clsx('mdx-image-sensitive relative')}>
      <button
        type="button"
        className={clsx(
          'absolute right-4 bottom-4 z-20 mt-4 flex h-8 items-center rounded-full border border-divider-light bg-white/70 px-4 text-sm',
          'md:right-6 md:bottom-6',
          'dark:border-divider-dark dark:bg-slate-900/80'
        )}
        onClick={() => setShown(!isShown)}
      >
        {isShown ? '隐藏图片' : '查看图片'}
      </button>
      {!isShown && (
        <div
          className={clsx(
            'background-grid absolute inset-0 z-10 flex items-center justify-center rounded-lg border border-divider-light',
            'dark:border-divider-dark'
          )}
        >
          <div
            className={clsx(
              'flex flex-col items-center gap-1 px-4 text-center'
            )}
          >
            <EyeSlash className={clsx('mb-2 h-5 w-5')} />
            <div className={clsx('font-bold')}>
              {message || '可能引起不适的内容'}
            </div>
            <p className={clsx('text-sm')}>提示：该图片已标记为敏感内容。</p>
          </div>
        </div>
      )}
      <Image alt={alt} immersive={isShown} {...props} />
    </div>
  );
}
