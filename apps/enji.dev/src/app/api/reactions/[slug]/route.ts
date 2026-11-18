import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getSessionId } from '@/helpers/server';
import { getReactionsBy, setReaction } from '@/lib/meta';

import { MAX_REACTIONS_PER_SESSION } from '@/constants/app';
import { ContentType, ReactionType } from '@/generated/prisma/enums';

import type { TApiResponse } from '@/types';
import type { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: rawSlug } = await params;
    const slug = z.string().parse(rawSlug);
    const sessionId = getSessionId(req);
    const body = await req.json();

    const contentType = z.enum(ContentType).parse(body.contentType);
    const contentTitle = z.string().parse(body.contentTitle);
    const type = z.enum(ReactionType).parse(body.type);
    const count = z.number().parse(body.count || 1);
    const section = z.string().nullish().parse(body.section);

    const reactionsDetailUser = await getReactionsBy(slug, sessionId);
    const currentCount = reactionsDetailUser[type] || 0;

    if (currentCount < MAX_REACTIONS_PER_SESSION) {
      const quota = Math.min(
        Math.max(1, count),
        MAX_REACTIONS_PER_SESSION - currentCount
      );

      await setReaction({
        slug,
        contentType,
        contentTitle,
        sessionId,
        type,
        count: quota,
        section: section ?? '',
      });

      return NextResponse.json<TApiResponse>(
        { message: 'Success' },
        { status: 200 }
      );
    }

    return NextResponse.json<TApiResponse>(
      { message: 'Max limit reached' },
      { status: 403 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json<TApiResponse>(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
