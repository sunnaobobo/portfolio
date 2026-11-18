'use client';

import clsx from 'clsx';
import NextImage from 'next/image';
import { useState } from 'react';

import type { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = NextImageProps & {
  immersive?: boolean;
};

export default function Image({
  immersive = true,
  className,
  src,
  ...props
}: ImageProps) {
  const [image, setImage] = useState<string>('');

  return (
    <div className={clsx('mdx-image relative')}>
      {immersive && image ? (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={clsx(
            'absolute -inset-8 z-[-1] rounded-[20%] bg-[length:180%_180%] bg-center opacity-25 blur-2xl',
            'hidden',
            'dark:block'
          )}
        />
      ) : null}
      <NextImage
        src={src}
        className={clsx(
          'rounded-lg border border-divider-light',
          'dark:border-divider-dark',
          className
        )}
        {...props}
        onLoad={(e) => {
          setImage(e.currentTarget.currentSrc);
        }}
      />
    </div>
  );
}
