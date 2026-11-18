import { NextResponse } from 'next/server';

import { getNewPosts } from '@/lib/meta';

import type { TApiResponse } from '@/types';

export async function GET() {
  try {
    const newPosts = await getNewPosts();

    return NextResponse.json(newPosts, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json<TApiResponse>(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
