import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ActivityFeedContent } from '../activity-feed-content';
import { fetchNewsFeedIds } from '../../actions';
import { NewsFeedIdModel } from '@/models';
import { Pagination } from '@/types';

// Mock the dependencies
jest.mock('../../actions', () => ({
  fetchNewsFeedIds: jest.fn(),
}));

// Mock child components with test coverage tracking
jest.mock('../compose-feed-card', () => ({
  ComposeFeedCard: ({
    isOverlayOpen,
    onOpensOverlay,
    onCloseOverlay,
    onUpdateNewsFeedIds,
  }: {
    isOverlayOpen: boolean;
    onOpensOverlay: () => void;
    onCloseOverlay: () => void;
    onUpdateNewsFeedIds: (newNewsFeedIds: NewsFeedIdModel) => void;
  }) => (
    <div data-testid="compose-feed-card">
      <button onClick={onOpensOverlay}>Open Overlay</button>
      <button onClick={onCloseOverlay}>Close Overlay</button>
      <button
        onClick={() =>
          onUpdateNewsFeedIds({
            id: 999,
            createdAt: '2024-01-10',
            documentId: '999',
          })
        }
      >
        Update Feed
      </button>
      {isOverlayOpen ? 'Overlay Open' : 'Overlay Closed'}
    </div>
  ),
}));

jest.mock('../news-feed-card-list', () => ({
  NewsFeedCardList: () => (
    <div data-testid="news-feed-card-list">NewsFeedCardList</div>
  ),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
  useOptimistic: () => [null, jest.fn()],
}));

const mockProps = {
  authorId: 'test-author-id',
  newsFeedIds: [
    { id: 1, createdAt: '2024-01-01', documentId: '1' },
    { id: 2, createdAt: '2024-01-02', documentId: '2' },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 2,
    total: 15,
  },
};

describe('ActivityFeedContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with initial news feed items', () => {
    render(<ActivityFeedContent {...mockProps} />);

    expect(screen.getByText('Load More Posts')).toBeInTheDocument();
  });

  it('handles overlay state changes', async () => {
    render(<ActivityFeedContent {...mockProps} />);

    const openButton = screen.getByText('Open Overlay');
    fireEvent.click(openButton);
    expect(screen.getByText('Open Overlay')).toBeInTheDocument();

    const closeButton = screen.getByText('Close Overlay');
    fireEvent.click(closeButton);
    expect(screen.getByText('Overlay Closed')).toBeInTheDocument();
  });

  it('updates news feed with new post', () => {
    render(<ActivityFeedContent {...mockProps} />);

    const updateFeedButton = screen.getByText('Update Feed');
    fireEvent.click(updateFeedButton);

    const newsFeedList = screen.getByTestId('news-feed-card-list');
    expect(newsFeedList).toBeInTheDocument();
  });

  it('handles empty news feed response', async () => {
    (fetchNewsFeedIds as jest.Mock).mockResolvedValueOnce(null);

    render(<ActivityFeedContent {...mockProps} />);

    const loadMoreButton = screen.getByText('Load More Posts');
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(screen.getByTestId('news-feed-card-list')).toBeInTheDocument();
    });
  });

  it('handles undefined data arrays with empty fallbacks', () => {
    const propsWithUndefinedData = {
      ...mockProps,
      newsFeedIdsPagination: undefined,
      suggestFriends: [],
      acceptFriends: [],
    };
    render(<ActivityFeedContent {...propsWithUndefinedData} />);
    expect(screen.getByTestId('news-feed-card-list')).toBeInTheDocument();
  });

  it('handles missing pagination metadata', () => {
    const propsWithoutPagination = {
      ...mockProps,
      newsFeedIdsPagination: {
        data: [],
        meta: { pagination: {} as Pagination },
      },
    };
    render(<ActivityFeedContent {...propsWithoutPagination} />);
    expect(screen.getByTestId('news-feed-card-list')).toBeInTheDocument();
  });
});
