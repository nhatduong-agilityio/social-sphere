import { render, screen } from '@testing-library/react';
import { NewsFeedCardContent } from '../news-feed-card-content';
import { MOODS } from '../../constants';
import { NewsFeed } from '@/types';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('NewsFeedCardContent', () => {
  const mockNewsFeed = {
    id: 1,
    content: 'Test content',
    author: MOCK_FRIENDS[0],
    createdAt: 'createdAt',
    gifUrl: 'test.gif',
    tagFriends: [MOCK_FRIENDS[0], MOCK_FRIENDS[1]],
    mood: {
      title: MOODS.DRINKING,
      content: 'water',
    },
    location: 'New York',
    sharedLink: 'https://example.com',
  } as NewsFeed;

  it('matches snapshot', () => {
    const { container } = render(
      <NewsFeedCardContent newsFeed={mockNewsFeed} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders content correctly', () => {
    render(<NewsFeedCardContent newsFeed={mockNewsFeed} />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders location', () => {
    render(<NewsFeedCardContent newsFeed={mockNewsFeed} />);
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('renders shared link', () => {
    render(<NewsFeedCardContent newsFeed={mockNewsFeed} />);
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });
});
