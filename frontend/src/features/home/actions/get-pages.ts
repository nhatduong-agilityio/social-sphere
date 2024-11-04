import { MOCK_PAGES } from '@/__mocks__/user';

// Types
import { ApiDataResponse } from '@/types';
import { SocialPageModel } from '@/models';

export const getPages = async (): Promise<
  ApiDataResponse<SocialPageModel[]>
> => {
  try {
    return { data: MOCK_PAGES };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch pages. Please try again.';
    return { error: errorMessage };
  }
};
