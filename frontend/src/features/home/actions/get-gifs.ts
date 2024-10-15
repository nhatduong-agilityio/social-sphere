import { ApiDataResponse } from '@/types/api';
import { GifResponse, GifItem } from '../models/gif';
import { API_ENDPOINT } from '@/constants/api-endpoint';

export const getGifs = async (
  queryParams?: string,
): Promise<ApiDataResponse<GifItem[]>> => {
  try {
    const response = await fetch(
      `${API_ENDPOINT.TENOR_PROXY}?query=${queryParams}`,
      {
        cache: 'no-store',
      },
    );

    const data: GifResponse = await response.json();
    return { data: data.results };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch gifs. Please try again.';
    return { error: errorMessage };
  }
};
