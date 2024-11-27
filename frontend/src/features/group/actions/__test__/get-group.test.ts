import { apiClient } from '@/services/api';
import {
  getGroups,
  getGroupByName,
  getGroupMembers,
  getNewsFeedIdsInGroup,
} from '../get-groups';

jest.mock('@/services/api');

describe('Group Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    const mockUserId = '123';

    it('should fetch groups successfully', async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            name: 'Test Group',
            groupMembers: [{ id: 1 }],
            createdUser: { id: 1 },
            posts: [{ id: 1 }],
          },
        ],
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getGroups(mockUserId);

      expect(apiClient.get).toHaveBeenCalledWith(
        'api/groups?filters[$or][0][createdUser][id][$eq]=123&filters[$or][1][groupMembers][user][id][$eq]=123&populate[groupMembers][populate]=user&populate=createdUser&filters[name][$containsi]=&sort[createdAt]=desc&pagination[page]=1&pagination[pageSize]=10',
        expect.any(Object),
      );

      expect(result.data?.data[0]).toEqual(
        expect.objectContaining({
          members: mockResponse.data[0].groupMembers,
          author: mockResponse.data[0].createdUser,
          newsFeeds: mockResponse.data[0].posts,
        }),
      );
    });

    it('should handle search parameter', async () => {
      const searchName = 'test';
      await getGroups(mockUserId, searchName);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('filters[name][$containsi]=test'),
        expect.any(Object),
      );
    });

    it('should handle error case', async () => {
      const mockError = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await getGroups(mockUserId);

      expect(result).toEqual({
        error: 'Network error',
      });
    });

    it('should handle default error message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await getGroups(mockUserId);

      expect(result).toEqual({
        error: 'Failed to fetch groups. Please try again.',
      });
    });
  });

  describe('getGroupByName', () => {
    const mockGroupName = 'test-group';

    it('should fetch group details successfully', async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            name: 'Test Group',
            groupMembers: [{ id: 1 }],
            createdUser: { id: 1 },
            posts: [{ id: 1 }],
          },
        ],
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getGroupByName(mockGroupName);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('filters[name][$eq]=test-group'),
        expect.any(Object),
      );

      expect(result.data).toEqual(
        expect.objectContaining({
          members: mockResponse.data[0].groupMembers,
          author: mockResponse.data[0].createdUser,
          newsFeeds: mockResponse.data[0].posts,
        }),
      );
    });

    it('should handle error case', async () => {
      const mockError = new Error('Not found');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await getGroupByName(mockGroupName);

      expect(result).toEqual({
        error: 'Not found',
      });
    });

    it('should handle default error message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await getGroupByName('test-group');

      expect(result).toEqual({
        error: 'Failed to fetch group detail. Please try again.',
      });
    });
  });

  describe('getGroupMembers', () => {
    const mockGroupId = 1;

    it('should fetch group members successfully', async () => {
      const mockResponse = {
        data: [{ id: 1, user: { id: 1 } }],
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getGroupMembers(mockGroupId);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('group-members'),
        expect.any(Object),
      );

      expect(result.data).toEqual(mockResponse);
    });

    it('should handle error case', async () => {
      const mockError = new Error('Failed to fetch members');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await getGroupMembers(mockGroupId);

      expect(result).toEqual({
        error: 'Failed to fetch members',
      });
    });

    it('should handle default error message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await getGroupMembers(1);

      expect(result).toEqual({
        error: 'Failed to fetch groups. Please try again.',
      });
    });
  });

  describe('getNewsFeedIdsInGroup', () => {
    const mockGroupId = 1;

    it('should fetch news feed ids successfully', async () => {
      const mockResponse = {
        data: [{ id: 1 }],
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getNewsFeedIdsInGroup(mockGroupId);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('posts'),
        expect.any(Object),
      );

      expect(result.data).toEqual(mockResponse);
    });

    it('should handle error case', async () => {
      const mockError = new Error('Failed to fetch news feeds');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await getNewsFeedIdsInGroup(mockGroupId);

      expect(result).toEqual({
        error: 'Failed to fetch news feeds',
      });
    });

    it('should handle default error message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await getNewsFeedIdsInGroup(mockGroupId);

      expect(result).toEqual({
        error: 'Failed to fetch news feed ids. Please try again.',
      });
    });
  });
});
