// Types
import { GroupMembersResponse, GroupRole, GroupsListResponse } from '@/types';

// Actions
import { fetchGroupMembers, fetchGroups } from '../fetch-group';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__';

describe('Group API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchGroups', () => {
    const mockParams = {
      authorId: '12345',
      page: 1,
      pageSize: 10,
    };

    const mockResponse: GroupsListResponse = {
      data: [
        {
          id: 1,
          name: 'Group 1',
          description: 'Description 1',
          documentId: '1',
          isPrivate: false,
          author: MOCK_FRIENDS[0],
          members: [],
          newsFeeds: [],
        },
        {
          id: 2,
          name: 'Group 2',
          description: 'Description 2',
          documentId: '2',
          isPrivate: false,
          author: MOCK_FRIENDS[1],
          members: [],
          newsFeeds: [],
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 2,
        },
      },
    };

    it('should fetch groups successfully', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        }),
      ) as jest.Mock;

      const result = await fetchGroups(mockParams);

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/group?authorId=12345&page=1&pageSize=10',
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        }),
      ) as jest.Mock;

      await expect(fetchGroups(mockParams)).rejects.toThrow(
        'Failed to fetch groups',
      );
    });
  });

  describe('fetchGroupMembers', () => {
    const mockParams = {
      groupId: 1,
      page: 1,
      pageSize: 10,
    };

    const mockResponse: GroupMembersResponse = {
      data: [
        {
          id: 1,
          documentId: '1',
          role: GroupRole.ADMIN,
          user: MOCK_FRIENDS[0],
        },
        {
          id: 2,
          documentId: '2',
          role: GroupRole.MEMBER,
          user: MOCK_FRIENDS[1],
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 2,
        },
      },
    };

    it('should fetch group members successfully', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        }),
      ) as jest.Mock;

      const result = await fetchGroupMembers(mockParams);

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/group-members?groupId=1&page=1&pageSize=10',
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        }),
      ) as jest.Mock;

      await expect(fetchGroupMembers(mockParams)).rejects.toThrow(
        'Failed to fetch group members',
      );
    });
  });
});
