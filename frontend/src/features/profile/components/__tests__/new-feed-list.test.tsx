import { render, waitFor } from '@testing-library/react';

// Components
import { NewFeedList } from '../new-feed-list';

// Mocks
import {
  MOCK_ACCEPTED_FRIENDS,
  MOCK_FRIENDS,
  MOCK_NEWS_FEED,
  MOCK_NEWS_FEED_LIST,
} from '@/__mocks__';
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

export class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}

window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{}, jest.fn()],
}));

// Mock the API function
jest.mock('../../actions/friends-profile', () => ({
  getFriendListByUsername: () => MOCK_ACCEPTED_FRIENDS,
}));

jest.mock('../../actions', () => ({
  getNewsFeedIds: () => ({ data: MOCK_NEWS_FEED_LIST }),
}));

jest.mock('@/actions', () => ({
  fetchNewsFeedDetailAndComments: () => MOCK_NEWS_FEED,
  fetchNewsFeedDetail: () => mockNewsFeed,
  fetchNewsFeedComments: () => mockComments,
}));

describe('NewFeedList component', () => {
  it('should render correctly', async () => {
    const { container } = render(
      await NewFeedList({ username: 'admin@gmail.com', authorId: '1' }),
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
