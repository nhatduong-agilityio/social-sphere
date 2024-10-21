import { MapboxResponse } from '@/types/map-box';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') || '';
  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  try {
    const response = await fetch(
      `${MAPBOX_API_URL}/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place,address&limit=5`,
    );
    const data: MapboxResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 },
    );
  }
};
