import { notFound } from 'next/navigation';

// Services
import { apiClient } from '@/services';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__';

// Actions
import { getProfile } from '../get-profile';

jest.mock('@/services', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('getProfile Service', () => {
  const username = 'testuser';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the user profile successfully', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue([MOCK_FRIENDS[0]]);

    const result = await getProfile(username);

    expect(apiClient.get).toHaveBeenCalled();

    expect(result).toEqual({
      ...MOCK_FRIENDS[0],
      countFriends: MOCK_FRIENDS[0].followedRelationships.length,
    });
  });

  it('should call notFound if no profile is returned', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue([]);

    await getProfile(username);

    expect(notFound).toHaveBeenCalled();
  });

  it('should throw an error if the API call fails', async () => {
    const errorMessage = 'Network Error';
    (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getProfile(username)).rejects.toThrow(errorMessage);
    expect(apiClient.get).toHaveBeenCalled();
  });
});
