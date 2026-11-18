import { NextResponse } from 'next/server';

import { getAllContentMeta } from '@/lib/meta';

import type { TApiResponse, TContentMeta } from '@/types';

export async function GET() {
  try {
    const result = await getAllContentMeta();

    return NextResponse.json<Record<string, TContentMeta>>(result, {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json<TApiResponse>(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
