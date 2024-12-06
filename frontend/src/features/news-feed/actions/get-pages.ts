import { MOCK_PAGES } from '@/__mocks__/user';

// Types
import { ApiDataResponse } from '@/types';
import { SocialPageModel } from '@/models';

export const getPages = async (): Promise<
  ApiDataResponse<SocialPageModel[]>
> => ({ data: MOCK_PAGES });
