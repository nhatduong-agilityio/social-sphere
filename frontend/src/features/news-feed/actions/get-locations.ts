import { ApiDataResponse, MapboxResponse } from '@/types';
import { API_ENDPOINT } from '@/constants';

export const getLocations = async (
  queryParams: string,
): Promise<ApiDataResponse<MapboxResponse>> => {
  try {
    const response = await fetch(
      `${API_ENDPOINT.MAPBOX_GEOCODING}?query=${encodeURIComponent(queryParams)}`,
      {
        cache: 'no-store',
      },
    );

    const data: MapboxResponse = await response.json();
    return { data };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to fetch locations. Please try again.';
    return { error: errorMessage };
  }
};
