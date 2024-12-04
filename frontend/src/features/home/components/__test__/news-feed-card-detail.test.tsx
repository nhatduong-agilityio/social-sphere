import { render, waitFor } from '@testing-library/react';

// Components
import { NewsFeedCardDetail } from '../news-feed-card-detail';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__';

// Types
import { NewsFeed } from '@/types';
import { ListCommentsResponse } from '@/models';

const mockNewsFeed = {
  id: 1,
  content: 'Test content',
  media: '/test-image.jpg',
  author: MOCK_FRIENDS[0],
  createdAt: '2024-01-01T12:00:00Z',
  likes: {
    likesTotal: 5,
    remainingLikes: 2,
    likesRecent: [
      {
        friend: MOCK_FRIENDS[1],
        createdAt: '2024-01-01T12:00:00Z',
      },
    ],
  },
  comments: {
    commentTotal: 3,
    data: [],
  },
  shares: [],
  isLiked: false,
} as unknown as NewsFeed;

const mockComments: ListCommentsResponse = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 10, total: 1, pageCount: 1 } },
};

jest.mock('@/actions', () => ({
  fetchNewsFeedDetailAndComments: jest.fn(),
}));

jest.mock('../../actions', () => ({
  publishComment: jest.fn(),
  shareNewFeeds: jest.fn(),
  toggleLikeNewsFeed: jest.fn(),
}));

jest.mock('../../stores', () => ({
  useCommentReplyStore: () => [{ commentId: null }, jest.fn()],
}));

// Mock useOptimistic hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
  useOptimistic: () => [mockNewsFeed, jest.fn()],
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
}));

const mockProps = {
  newsFeedId: '1',
  authorId: '1',
};

jest.mock('@/actions', () => ({
  fetchNewsFeedComments: jest.fn(() => Promise.resolve(mockComments)),
  fetchNewsFeedDetail: jest.fn(() => Promise.resolve(mockNewsFeed)),
}));

describe('NewsFeedCardDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', async () => {
    const { container } = render(<NewsFeedCardDetail {...mockProps} />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
