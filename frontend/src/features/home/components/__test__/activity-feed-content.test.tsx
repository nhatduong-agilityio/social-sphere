import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ActivityFeedContent } from '../activity-feed-content';
import { fetchNewsFeedIds } from '@/actions';
import { NewsFeedIdModel } from '@/models';
import { Pagination } from '@/types';

// Mock the dependencies
jest.mock('@/actions', () => ({
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

jest.mock('../stories-widget', () => ({
  StoriesWidget: ({ onAddStory }: { onAddStory: () => void }) => (
    <div data-testid="stories-widget">
      <button onClick={onAddStory}>Add Story</button>
    </div>
  ),
}));

jest.mock('../suggest-friends-widget', () => ({
  SuggestFriendsWidget: () => (
    <div data-testid="suggest-friends-widget">SuggestFriendsWidget</div>
  ),
}));

jest.mock('../news-feed-card-list', () => ({
  NewsFeedCardList: () => (
    <div data-testid="news-feed-card-list">NewsFeedCardList</div>
  ),
}));

jest.mock('../accept-friends-widget', () => ({
  AcceptFriendsWidget: () => (
    <div data-testid="accept-friends-widget">AcceptFriendsWidget</div>
  ),
}));

jest.mock('../groups-widget', () => ({
  GroupsWidget: () => <div data-testid="groups-widget">GroupsWidget</div>,
}));

const mockProps = {
  authorId: 'test-author-id',
  suggestFriends: [],
  acceptFriends: [],
  newsFeedIdsPagination: {
    data: [
      { id: 1, createdAt: '2024-01-01', documentId: '1' },
      { id: 2, createdAt: '2024-01-02', documentId: '2' },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 2,
        total: 15,
      },
    },
  },
  groups: {
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
        total: 0,
      },
    },
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

  it('loads more posts when clicking load more button', async () => {
    const mockNewPosts = {
      data: [
        { id: 3, attributes: { createdAt: '2024-01-03' } },
        { id: 4, attributes: { createdAt: '2024-01-04' } },
      ],
      meta: {
        pagination: {
          page: 2,
          pageSize: 10,
          pageCount: 2,
          total: 15,
        },
      },
    };

    (fetchNewsFeedIds as jest.Mock).mockResolvedValueOnce(mockNewPosts);

    render(<ActivityFeedContent {...mockProps} />);

    const loadMoreButton = screen.getByText('Load More Posts');
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(fetchNewsFeedIds).toHaveBeenCalledWith({
        authorId: 'test-author-id',
        page: 2,
        pageSize: 10,
      });
    });
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

  it('handles pagination with load more', async () => {
    const mockNewPosts = {
      data: [
        { id: 3, createdAt: '2024-01-03', documentId: '3' },
        { id: 4, createdAt: '2024-01-04', documentId: '4' },
      ],
      meta: {
        pagination: {
          page: 2,
          pageSize: 10,
          pageCount: 2,
          total: 15,
        },
      },
    };

    (fetchNewsFeedIds as jest.Mock).mockResolvedValueOnce(mockNewPosts);

    render(<ActivityFeedContent {...mockProps} />);

    const loadMoreButton = screen.getByText('Load More Posts');
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(fetchNewsFeedIds).toHaveBeenCalledWith({
        authorId: 'test-author-id',
        page: 2,
        pageSize: 10,
      });
    });
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
