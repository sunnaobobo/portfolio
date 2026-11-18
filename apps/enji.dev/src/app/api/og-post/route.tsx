import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import path from 'path';

import { PostOgImage } from '@/components/meta/OgImages';

import { formatDate } from '@/helpers/post';

import type { NextRequest } from 'next/server';

const getFont400 = () =>
  readFile(
    path.join(process.cwd(), 'src/assets/fonts/PlusJakartaSans-Regular.ttf')
  );

const getFont800 = () =>
  readFile(
    path.join(process.cwd(), 'src/assets/fonts/PlusJakartaSans-ExtraBold.ttf')
  );

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const get = (param: string): string => searchParams.get(param) || '';

  const imageSize = {
    width: 1200,
    height: 630,
  };

  const aspectRatio = get('aspectRatio');

  switch (aspectRatio) {
    case '1/1':
      imageSize.width = 1200;
      imageSize.height = 1200;
      break;
    case '4/3':
      imageSize.width = 1200;
      imageSize.height = 900;
      break;
    case '16/9':
      imageSize.width = 1200;
      imageSize.height = 675;
      break;
    default:
      break;
  }

  try {
    const category = get('category');
    const title = get('title');
    const tags = get('tags') ? get('tags').split(',') : undefined;
    const date = get('date') ? formatDate(get('date')) : undefined;
    const lang = get('lang') as 'id' | 'en';

    const [font400, font800] = await Promise.all([getFont400(), getFont800()]);

    return new ImageResponse(
      <PostOgImage
        category={category}
        title={title}
        tags={tags}
        date={date}
        lang={lang}
      />,
      {
        width: imageSize.width,
        height: imageSize.height,
        emoji: 'fluent',
        fonts: [
          {
            data: font400,
            name: 'Plus Jakarta Sans',
            style: 'normal',
            weight: 400,
          },
          {
            data: font800,
            name: 'Plus Jakarta Sans',
            style: 'normal',
            weight: 800,
          },
        ],
      }
    );
  } catch {
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}
