import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useGroupMembers } from '../../hooks';
import { fetchNewsFeedIds } from '@/features/news-feed/actions';
import { GroupMembersResponse, Pagination } from '@/types';
import { NewsFeedIdsResponse } from '@/models';
import { GroupFeedContent } from '../group-feed-content';

// Add mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
  useState: jest.requireActual('react').useState,
  useCallback: jest.requireActual('react').useCallback,
  useOptimistic: () => [{}, jest.fn()],
}));

jest.mock('../../hooks', () => ({
  useGroupMembers: jest.fn(),
}));

jest.mock('@/features/news-feed/actions', () => ({
  fetchNewsFeedIds: jest.fn(),
}));

jest.mock('../group-members-widget', () => ({
  GroupMembersWidget: () => <div data-testid="group-members-widget" />,
}));

jest.mock('@/features/news-feed/components/news-feed-card-list', () => ({
  NewsFeedCardList: () => <div data-testid="news-feed-card-list" />,
}));

describe('GroupFeedContent', () => {
  const mockProps = {
    authorId: '123',
    groupId: 1,
    groupMembersPagination: {
      data: [{ id: 1, user: { id: 1 } }],
      meta: { pagination: { pageCount: 2 } },
    } as GroupMembersResponse,
    newsFeedIdsPagination: {
      data: [{ id: 1 }],
      meta: { pagination: { pageCount: 2 } },
    } as NewsFeedIdsResponse,
  };

  const mockGroupMembersHook = {
    groupMembers: [{ id: 1, user: { id: 1 } }],
    hasMore: true,
    refreshGroupMembers: jest.fn(),
    loadMoreMembers: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGroupMembers as jest.Mock).mockReturnValue(mockGroupMembersHook);
  });

  it('renders group feed content with initial data', () => {
    render(<GroupFeedContent {...mockProps} />);

    expect(screen.getByTestId('group-members-widget')).toBeInTheDocument();
    expect(screen.getByTestId('news-feed-card-list')).toBeInTheDocument();
  });

  it('disables load more buttons while loading', async () => {
    render(<GroupFeedContent {...mockProps} />);

    const loadMoreMembersButton = screen.getByText('Load More Members');
    const loadMoreNewsButton = screen.getByText('Load More News Feed');

    fireEvent.click(loadMoreMembersButton);
    fireEvent.click(loadMoreNewsButton);

    expect(loadMoreMembersButton).toHaveClass('disabled:pointer-events-none');
    expect(loadMoreNewsButton).toHaveClass('disabled:pointer-events-none');
  });

  it('hides load more buttons when no more content', () => {
    (useGroupMembers as jest.Mock).mockReturnValue({
      ...mockGroupMembersHook,
      hasMore: false,
    });

    render(
      <GroupFeedContent
        {...mockProps}
        newsFeedIdsPagination={{
          data: [],
          meta: { pagination: { pageCount: 1 } as Pagination },
        }}
      />,
    );

    expect(screen.queryByText('Load More Members')).not.toBeInTheDocument();
    expect(screen.queryByText('Load More News Feed')).not.toBeInTheDocument();
  });

  it('loads and updates news feeds when clicking load more news feed button', async () => {
    const mockStartTransition = jest.fn((callback) => callback());
    jest
      .spyOn(React, 'useTransition')
      .mockImplementation(() => [false, mockStartTransition]);

    const mockNewFeeds = {
      data: [{ id: 2 }],
      meta: {
        pagination: {
          pageCount: 3,
        },
      },
    };

    (fetchNewsFeedIds as jest.Mock).mockResolvedValue(mockNewFeeds);

    render(<GroupFeedContent {...mockProps} />);

    const loadMoreButton = screen.getByText('Load More News Feed');

    await act(async () => {
      fireEvent.click(loadMoreButton);
      await Promise.resolve();
    });

    expect(fetchNewsFeedIds).toHaveBeenCalledWith({
      groupId: mockProps.groupId,
      page: 2,
      pageSize: 10,
    });
  });

  it('handles null response when loading more news feeds', async () => {
    (fetchNewsFeedIds as jest.Mock).mockResolvedValue(null);

    render(<GroupFeedContent {...mockProps} />);

    const loadMoreButton = screen.getByText('Load More News Feed');

    await act(async () => {
      fireEvent.click(loadMoreButton);
    });

    expect(screen.getByTestId('news-feed-card-list')).toBeInTheDocument();
  });

  it('hides load more buttons when no more content', () => {
    (useGroupMembers as jest.Mock).mockReturnValue({
      ...mockGroupMembersHook,
      hasMore: false,
    });

    render(
      <GroupFeedContent
        {...mockProps}
        newsFeedIdsPagination={{
          data: [],
          meta: { pagination: { pageCount: 1 } as Pagination },
        }}
      />,
    );

    expect(screen.queryByText('Load More Members')).not.toBeInTheDocument();
    expect(screen.queryByText('Load More News Feed')).not.toBeInTheDocument();
  });
});
