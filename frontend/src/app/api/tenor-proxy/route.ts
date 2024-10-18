import { NextRequest, NextResponse } from 'next/server';

// Models
import { GifResponse } from '@/features/home/models/gif';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const TENOR_API_KEY = process.env.NEXT_PUBLIC_TENOR_API_KEY;
  const TENOR_API_URL = 'https://tenor.googleapis.com/v2';

  try {
    const response = await fetch(
      `${TENOR_API_URL}/search?q=${query}&key=${TENOR_API_KEY}&client_key=gifs&limit=12`,
    );
    const data: GifResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GIFs' },
      { status: 500 },
    );
  }
};
