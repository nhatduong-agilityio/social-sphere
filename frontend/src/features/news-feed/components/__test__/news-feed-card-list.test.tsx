import { render, screen, waitFor } from '@testing-library/react';
import { NewsFeedCardList } from '../news-feed-card-list';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Add mock for NewsFeedCardDetail component
jest.mock('../news-feed-card-detail', () => ({
  NewsFeedCardDetail: ({
    newsFeedId,
    authorId,
  }: {
    newsFeedId: string;
    authorId: string;
  }) => (
    <div data-testid="news-feed-card">
      News Feed {newsFeedId} by Author {authorId}
    </div>
  ),
}));

describe('NewsFeedCardList', () => {
  const mockNewsFeedIds = [
    { id: 1, createdAt: '2024-01-01', documentId: 'doc1' },
    { id: 2, createdAt: '2024-01-02', documentId: 'doc2' },
    { id: 3, createdAt: '2024-01-03', documentId: 'doc3' },
    { id: 4, createdAt: '2024-01-04', documentId: 'doc4' },
  ];

  it('matches snapshot', () => {
    const { container } = render(
      <NewsFeedCardList authorId="1" newsFeedIds={mockNewsFeedIds} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('initially renders first batch of news feeds', async () => {
    render(<NewsFeedCardList authorId="1" newsFeedIds={mockNewsFeedIds} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('news-feed-card')).toHaveLength(2);
    });
  });

  it('loads more items when intersection observer triggers', async () => {
    render(<NewsFeedCardList authorId="1" newsFeedIds={mockNewsFeedIds} />);

    // Simulate intersection observer callback
    const [observerCallback] = mockIntersectionObserver.mock.calls[0];
    observerCallback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(screen.getAllByTestId('news-feed-card')).toHaveLength(4);
    });
  });

  it('handles empty news feed list', () => {
    const { container } = render(
      <NewsFeedCardList authorId="1" newsFeedIds={[]} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('disconnects observer on unmount', () => {
    const disconnect = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect,
    });

    const { unmount } = render(
      <NewsFeedCardList authorId="1" newsFeedIds={mockNewsFeedIds} />,
    );

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
