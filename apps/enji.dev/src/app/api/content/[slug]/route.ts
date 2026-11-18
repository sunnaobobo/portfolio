import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getSessionId } from '@/helpers/server';
import {
  getContentMeta,
  getReactions,
  getReactionsBy,
  getSectionMeta,
} from '@/lib/meta';

import type { TApiResponse, TContentMetaDetail } from '@/types';
import type { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: rawSlug } = await params;
    const slug = z.string().parse(rawSlug);
    const sessionId = getSessionId(req);

    const meta = await getContentMeta(slug);
    const metaSection = await getSectionMeta(slug);
    const reactionsDetail = await getReactions(slug);
    const reactionsDetailUser = await getReactionsBy(slug, sessionId);

    const reactionsSum =
      (reactionsDetail.AMAZED || 0) +
      (reactionsDetail.CLAPPING || 0) +
      (reactionsDetail.THINKING || 0);

    return NextResponse.json<TContentMetaDetail>(
      {
        meta: {
          shares: meta.shares,
          views: meta.views,
          reactions: reactionsSum,
          reactionsDetail,
        },
        metaUser: {
          reactionsDetail: reactionsDetailUser,
        },
        metaSection,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json<TApiResponse>(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
