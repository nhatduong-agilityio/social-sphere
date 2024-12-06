import { renderHook, act } from '@testing-library/react';
import { useGroupMembers } from '../use-group-members';
import { fetchGroupMembers } from '../../actions';
import { GroupMembersResponse } from '@/types';

jest.mock('../../actions', () => ({
  fetchGroupMembers: jest.fn(),
}));

describe('useGroupMembers', () => {
  const mockInitialData = {
    data: [{ id: 1, user: { id: 1 } }],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 2,
        total: 15,
      },
    },
  } as GroupMembersResponse;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with initial data', () => {
    const { result } = renderHook(() => useGroupMembers(1, mockInitialData));

    expect(result.current.groupMembers).toEqual(mockInitialData.data);
    expect(result.current.hasMore).toBe(true);
  });

  it('should refresh group members', async () => {
    const mockNewData = {
      data: [{ id: 2, user: { id: 2 } }],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 1,
        },
      },
    };

    (fetchGroupMembers as jest.Mock).mockResolvedValue(mockNewData);

    const { result } = renderHook(() => useGroupMembers(1, mockInitialData));

    await act(async () => {
      await result.current.refreshGroupMembers();
    });

    expect(result.current.groupMembers).toEqual(mockNewData.data);
    expect(result.current.hasMore).toBe(false);
  });

  it('should load more members', async () => {
    const mockNextPageData = {
      data: [{ id: 3, user: { id: 3 } }],
      meta: {
        pagination: {
          page: 2,
          pageSize: 10,
          pageCount: 2,
          total: 15,
        },
      },
    };

    (fetchGroupMembers as jest.Mock).mockResolvedValue(mockNextPageData);

    const { result } = renderHook(() => useGroupMembers(1, mockInitialData));

    await act(async () => {
      await result.current.loadMoreMembers();
    });

    expect(result.current.groupMembers).toEqual([
      ...mockInitialData.data,
      ...mockNextPageData.data,
    ]);
    expect(result.current.hasMore).toBe(false);
  });
});
