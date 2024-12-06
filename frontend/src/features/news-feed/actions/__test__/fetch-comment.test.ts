// Types
import { ListCommentsResponse } from '@/models';

// Actions
import { fetchNewsFeedComments } from '../fetch-comment';

const mockResponse: ListCommentsResponse = {
  data: [
    {
      id: 1,
      content: 'Comment 1',
      media: 'https://example.com/image.jpg',
      tagFriends: ['friend1', 'friend2'],
      friend: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@gmail.com',
        username: 'johndoe',
        followedRelationships: [],
      },
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
      likes: [],
      replies: [],
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 1,
    },
  },
};

const mockParams = {
  newsFeedId: '12345',
  page: 1,
  pageSize: 10,
};

describe('fetchNewsFeedComments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch comments successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    ) as jest.Mock;

    const result = await fetchNewsFeedComments(mockParams);

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/comment/${mockParams.newsFeedId}?page=1&pageSize=10`,
    );

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    ) as jest.Mock;

    await expect(fetchNewsFeedComments(mockParams)).rejects.toThrow(
      'Failed to fetch comments',
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/comment/${mockParams.newsFeedId}?page=1&pageSize=10`,
    );
  });
});
