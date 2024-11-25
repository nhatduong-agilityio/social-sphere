import { render, waitFor } from '@testing-library/react';

// Components
import { NewFeedList } from '../new-feed-list';

// Mocks
import {
  MOCK_ACCEPTED_FRIENDS,
  MOCK_NEWS_FEED,
  MOCK_NEWS_FEED_LIST,
} from '@/__mocks__';

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
jest.mock('@/api/friends-profile/route', () => ({
  getFriendListByUsername: () => MOCK_ACCEPTED_FRIENDS,
}));

jest.mock('../../actions', () => ({
  getNewsFeedIds: () => ({ data: MOCK_NEWS_FEED_LIST }),
}));

jest.mock('@/actions', () => ({
  fetchNewsFeedDetailAndComments: () => MOCK_NEWS_FEED,
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
