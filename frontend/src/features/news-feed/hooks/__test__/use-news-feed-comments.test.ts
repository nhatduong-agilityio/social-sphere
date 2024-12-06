import { renderHook, act } from '@testing-library/react';
import { useNewsFeedComments } from '../use-news-feed-comments';
import { fetchNewsFeedComments } from '../../actions';
import { ListCommentsResponse } from '@/models';

jest.mock('../../actions', () => ({
  fetchNewsFeedComments: jest.fn(),
}));

// Mock useOptimistic hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useOptimistic: () => [
    [
      {
        id: 1,
        content: 'Test comment',
        friend: { id: 1 },
        replies: [],
        likes: [],
      },
    ],
    jest.fn(),
  ],
}));

const mockInitialData = {
  data: [
    {
      id: 1,
      content: 'Test comment',
      friend: { id: 1 },
      replies: [],
      likes: [],
    },
    {
      id: 2,
      content: 'Test comment 2',
      friend: { id: 2 },
      replies: [
        {
          id: 3,
          content: 'Test reply',
          friend: { id: 1 },
          likes: [],
        },
      ],
      likes: [],
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 2,
      total: 20,
    },
  },
} as unknown as ListCommentsResponse;

describe('useNewsFeedComments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct initial data', () => {
    const { result } = renderHook(() =>
      useNewsFeedComments('1', '1', mockInitialData),
    );

    expect(result.current.hasMore).toBe(true);
  });

  it('should load more comments when loadListComments is called', async () => {
    const mockNextPageData = {
      data: [
        {
          id: 4,
          content: 'Next page comment',
          friend: { id: 2 },
          replies: [],
          likes: [],
        },
      ],
      meta: {
        pagination: {
          page: 2,
          pageSize: 10,
          pageCount: 2,
          total: 20,
        },
      },
    };

    (fetchNewsFeedComments as jest.Mock).mockResolvedValueOnce(
      mockNextPageData,
    );

    const { result } = renderHook(() =>
      useNewsFeedComments('1', '1', mockInitialData),
    );

    await act(async () => {
      await result.current.loadListComments();
    });

    expect(result.current.hasMore).toBe(false);
  });
});
