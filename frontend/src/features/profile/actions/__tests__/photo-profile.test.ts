// Services
import { apiClient } from '@/services';

// Mocks
import { MOCK_PHOTOS } from '@/__mocks__';

// Actions
import { getPhotoListByUsername } from '../photo-profile';

jest.mock('@/services', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('getPhotoListByUsername', () => {
  const username = 'testuser';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch photo list by username and filter out items without media', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: MOCK_PHOTOS });

    await getPhotoListByUsername(username);

    expect(apiClient.get).toHaveBeenCalled();
  });

  it('should return an empty array if no photos with media are found', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: [] });

    const result = await getPhotoListByUsername(username);

    expect(result).toEqual([]);
  });

  it('should throw an error when the API request fails', async () => {
    const errorMessage = 'Network Error';
    (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getPhotoListByUsername(username)).rejects.toThrow(
      errorMessage,
    );
  });
});
