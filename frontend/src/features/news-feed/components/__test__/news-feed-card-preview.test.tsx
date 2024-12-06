import { render } from '@testing-library/react';
import { NewsFeedCardPreview } from '../news-feed-card-preview';
import { NewsFeed } from '@/types';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('NewsFeedCardPreview', () => {
  const mockNewsFeed = {
    id: 1,
    content: 'Test content',
    media: '/test-image.jpg',
    createdAt: 'createdAt',
    author: MOCK_FRIENDS[0],
    tagFriends: [],
  } as NewsFeed;

  it('matches snapshot with media', () => {
    const { container } = render(
      <NewsFeedCardPreview newsFeed={mockNewsFeed} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot without media', () => {
    const newsFeedWithoutMedia = {
      ...mockNewsFeed,
      media: undefined,
    };
    const { container } = render(
      <NewsFeedCardPreview newsFeed={newsFeedWithoutMedia} />,
    );
    expect(container).toMatchSnapshot();
  });
});
