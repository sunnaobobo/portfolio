import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getSessionId } from '@/helpers/server';
import { getViewsBy, setView } from '@/lib/meta';

import { MAX_VIEWS_PER_SESSION } from '@/constants/app';
import { ContentType } from '@/generated/prisma/enums';

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
    const currentViews = await getViewsBy(slug, sessionId);

    if (currentViews < MAX_VIEWS_PER_SESSION) {
      await setView({
        slug,
        contentType,
        contentTitle,
        sessionId,
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
