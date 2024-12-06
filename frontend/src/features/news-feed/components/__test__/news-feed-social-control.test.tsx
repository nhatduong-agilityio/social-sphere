import { render } from '@testing-library/react';
import { NewsFeedSocialControl } from '../news-feed-social-control';
import { MOCK_FRIENDS } from '@/__mocks__';
import { NewsFeed } from '@/types';

describe('NewsFeedSocialControl', () => {
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

  const mockProps = {
    isLiked: false,
    authorId: '1',
    newsFeed: mockNewsFeed,
    onOpenComments: jest.fn(),
    onLike: jest.fn(),
    onShare: jest.fn(),
  };

  it('matches snapshot', () => {
    const { container } = render(<NewsFeedSocialControl {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when liked', () => {
    const { container } = render(
      <NewsFeedSocialControl {...mockProps} isLiked={true} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('applies correct styles for liked state', () => {
    const { container } = render(
      <NewsFeedSocialControl {...mockProps} isLiked={true} />,
    );
    const likeButton = container.querySelector('.shadow-sphere-destructive');
    expect(likeButton).toBeInTheDocument();
  });
});
