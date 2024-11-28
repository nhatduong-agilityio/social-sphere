import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { NewsFeedShareDialog } from '../index';
import { SHARE_OPTIONS } from '@/features/home/constants/share-news-feed';
import { MOCK_FRIENDS } from '@/__mocks__';
import { MOODS } from '@/features/home/constants';
import { NewsFeed } from '@/types';
import { Dialog } from '@/components/ui';

// Mock child components
jest.mock('../../compose-activity-preview', () => ({
  ComposeActivityPreview: () => <div data-testid="activity-preview" />,
}));

jest.mock('../../news-feed-card-preview', () => ({
  NewsFeedCardPreview: () => <div data-testid="card-preview" />,
}));

jest.mock('../../tag-friends', () => ({
  TagFriends: () => <div data-testid="tag-friends" />,
}));

describe('NewsFeedShareDialog', () => {
  const renderDialog = (children: ReactNode) =>
    render(<Dialog defaultOpen>{children}</Dialog>);

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

  const mockProps = {
    authorId: '1',
    newsFeed: mockNewsFeed,
    onShare: jest.fn(),
  };

  it('matches snapshot', () => {
    const { container } = renderDialog(<NewsFeedShareDialog {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders share options dropdown', () => {
    renderDialog(<NewsFeedShareDialog {...mockProps} />);
    const firstOption = SHARE_OPTIONS[0].label;
    expect(screen.getByText(firstOption)).toBeInTheDocument();
  });

  it('renders news feed preview', () => {
    renderDialog(<NewsFeedShareDialog {...mockProps} />);
    expect(screen.getByTestId('card-preview')).toBeInTheDocument();
  });
});
