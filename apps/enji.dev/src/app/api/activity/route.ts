import { NextResponse } from 'next/server';

import { getContentActivity } from '@/lib/meta';

import type { TApiResponse, TContentActivity } from '@/types';

export async function GET() {
  try {
    const contentActivity = await getContentActivity();

    return NextResponse.json<TContentActivity[]>(contentActivity, {
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
