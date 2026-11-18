import { getPageOgImageUrl } from '@/helpers/page';
import { getPostOgImageUrl } from '@/helpers/post';

import type {
  TPageFrontMatter,
  TPostFrontMatter,
  TProjectFrontMatter,
} from '@/types';
import type { Metadata } from 'next';

export function buildPageMetadata({
  title,
  description,
  ogImage,
  overrideTitle = false,
}: {
  title: string;
  description: string;
  ogImage?: string;
  overrideTitle?: boolean;
}): Metadata {
  const resolvedOgImage =
    ogImage || getPageOgImageUrl({ title, description }).default;
  const imageAlt = `Image with "${title}" text.`;

  return {
    title: overrideTitle ? { absolute: title } : title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@enjidev',
      creator: '@enjidev',
      title,
      description,
      images: [
        {
          url: resolvedOgImage,
          alt: imageAlt,
        },
      ],
    },
  };
}

type TMdxMetadataInput =
  | ({ layout: 'Post' } & TPostFrontMatter)
  | ({ layout: 'Project' } & TProjectFrontMatter)
  | ({ layout?: string } & TPageFrontMatter);

export function buildMdxMetadata(data: TMdxMetadataInput): Metadata {
  if (data.layout === 'Post') {
    const postData = data as TPostFrontMatter;
    const ogImages = getPostOgImageUrl({
      category: postData.caption || postData.category,
      title: postData.title,
      date: postData.date,
      lang: postData.lang,
      tags: postData.tags,
    });

    return buildPageMetadata({
      title: postData.title,
      description: postData.description,
      ogImage: ogImages.default,
    });
  }

  const ogImage = getPageOgImageUrl({
    caption: data.caption,
    title: data.title,
    description: data.description,
  });

  return buildPageMetadata({
    title: data.title,
    description: data.description,
    ogImage: ogImage.default,
  });
}
