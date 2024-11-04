import { MOCK_GROUPS } from '@/__mocks__/user';

// Types
import { ApiDataResponse, GroupDetail } from '@/types';

export const getGroups = async (): Promise<ApiDataResponse<GroupDetail[]>> => {
  try {
    return { data: MOCK_GROUPS };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch groups. Please try again.';
    return { error: errorMessage };
  }
};

export const getGroupsByName = async (
  name: string,
): Promise<ApiDataResponse<GroupDetail[]>> => {
  try {
    const groups = MOCK_GROUPS.filter((group) =>
      group.name.toLowerCase().includes(name.toLowerCase()),
    );
    return { data: groups };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch groups. Please try again.';
    return { error: errorMessage };
  }
};
