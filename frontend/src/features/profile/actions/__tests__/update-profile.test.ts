import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

// Services
import { apiClient } from '@/services';

// Types
import { UserDetail } from '@/types';

// Constants
import { API_ENDPOINT } from '@/constants';

// Actions
import { getProfile } from '../get-profile';
import { updateProfile } from '../update-profile';

const params = 'testuser';
const mockProfile: UserDetail = {
  id: 1,
  username: 'testuser',
  email: 'testuser@example.com',
  followedRelationships: [],
  firstName: '',
  lastName: '',
};

const updatedProfile: UserDetail = {
  id: 1,
  username: 'updateduser',
  email: 'updateduser@example.com',
  followedRelationships: [],
  firstName: '',
  lastName: '',
};

jest.mock('../get-profile', () => ({
  getProfile: jest.fn(),
}));

jest.mock('@/services', () => ({
  apiClient: {
    put: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('updateProfile Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the user profile successfully', async () => {
    (getProfile as jest.Mock).mockResolvedValue(mockProfile);
    (apiClient.put as jest.Mock).mockResolvedValue(updatedProfile);

    const result = await updateProfile(params, updatedProfile);

    expect(getProfile).toHaveBeenCalledWith(params);
    expect(apiClient.put).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${mockProfile.id}`,
      JSON.stringify(updatedProfile),
    );
    expect(revalidateTag).toHaveBeenCalled();
    expect(result).toEqual(updatedProfile);
  });

  it('should call notFound if the updated profile is null', async () => {
    (getProfile as jest.Mock).mockResolvedValue(mockProfile);
    (apiClient.put as jest.Mock).mockResolvedValue(null);

    const result = await updateProfile(params, updatedProfile);

    expect(getProfile).toHaveBeenCalledWith(params);
    expect(apiClient.put).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${mockProfile.id}`,
      JSON.stringify(updatedProfile),
    );
    expect(notFound).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should throw an error if getProfile fails', async () => {
    const errorMessage = 'Profile not found';
    (getProfile as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(updateProfile(params, updatedProfile)).rejects.toThrow(
      errorMessage,
    );

    expect(getProfile).toHaveBeenCalledWith(params);
    expect(apiClient.put).not.toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('should throw an error if apiClient.put fails', async () => {
    const errorMessage = 'Update failed';
    (getProfile as jest.Mock).mockResolvedValue(mockProfile);
    (apiClient.put as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(updateProfile(params, updatedProfile)).rejects.toThrow(
      errorMessage,
    );

    expect(getProfile).toHaveBeenCalledWith(params);
    expect(apiClient.put).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${mockProfile.id}`,
      JSON.stringify(updatedProfile),
    );
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
