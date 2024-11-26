import { render } from '@testing-library/react';
import { NewFeedContent } from '../new-feed-content';
import { MOCK_NEWS_FEED, MOCK_NEWS_FEED_LIST } from '@/__mocks__';
import { NewsFeedIdModel } from '@/models';

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

jest.mock('@/actions', () => ({
  fetchNewsFeedDetailAndComments: () => MOCK_NEWS_FEED,
}));

describe('NewFeedContent Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <NewFeedContent
        authorId="1"
        newFriends={[]}
        newsFeedIds={MOCK_NEWS_FEED_LIST.data as NewsFeedIdModel[]}
        pagination={MOCK_NEWS_FEED_LIST.meta.pagination}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
