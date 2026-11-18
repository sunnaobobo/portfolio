import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import path from 'path';

import { PageOgImage } from '@/components/meta/OgImages';

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

  try {
    const caption = get('caption');
    const title = get('title');
    const description = get('description');

    const [font400, font800] = await Promise.all([getFont400(), getFont800()]);

    return new ImageResponse(
      <PageOgImage caption={caption} title={title} description={description} />,
      {
        width: 1200,
        height: 630,
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
