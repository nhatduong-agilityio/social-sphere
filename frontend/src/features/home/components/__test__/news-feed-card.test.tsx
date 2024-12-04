import { render } from '@testing-library/react';
import { NewsFeedCard } from '../news-feed-card';
import { MOCK_FRIENDS } from '@/__mocks__';
import { NewsFeed } from '@/types';

jest.mock('@/hooks', () => ({
  useDisclosure: jest.fn(() => ({
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  })),
  useOnClickOutside: jest.fn(),
  useFocusState: jest.fn(() => ({
    isFocused: false,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
  useDebounce: (value: string) => value,
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
  useFormStatus: () => ({ pending: false }),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
  useOptimistic: () => [[], jest.fn()],
}));

describe('NewsFeedCard', () => {
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
    authorId: '1',
    newsFeed: mockNewsFeed,
    onLike: jest.fn(),
    onComment: jest.fn(),
    onShare: jest.fn(),
  };

  it('matches snapshot with default state', () => {
    const { container } = render(<NewsFeedCard {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with media content', () => {
    const newsFeedWithMedia = {
      ...mockNewsFeed,
      media: '/test-image.jpg',
    };
    const { container } = render(
      <NewsFeedCard {...mockProps} newsFeed={newsFeedWithMedia} />,
    );
    expect(container).toMatchSnapshot();
  });
});
