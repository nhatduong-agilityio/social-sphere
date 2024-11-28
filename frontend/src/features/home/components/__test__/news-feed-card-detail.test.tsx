import { render, waitFor } from '@testing-library/react';
import { NewsFeedCardDetail } from '../news-feed-card-detail';
import { fetchNewsFeedDetailAndComments } from '@/actions';

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
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
}));

const MOCK_NEWS_FEED = {
  id: '1',
  content: 'Test content',
  author: {
    id: '1',
    username: 'testuser',
  },
  comments: [],
  likes: [],
  shares: [],
};

describe('NewsFeedCardDetail', () => {
  const mockProps = {
    newsFeedId: '1',
    authorId: '1',
  };

  beforeEach(() => {
    (fetchNewsFeedDetailAndComments as jest.Mock).mockResolvedValue(
      MOCK_NEWS_FEED,
    );
  });

  it('matches snapshot', async () => {
    const { container } = render(<NewsFeedCardDetail {...mockProps} />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
