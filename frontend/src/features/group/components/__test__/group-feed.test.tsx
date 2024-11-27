import { render, screen } from '@testing-library/react';
import { GroupFeed } from '../group-feed';
import { getGroupMembers, getNewsFeedIdsInGroup } from '../../actions';
import { notFound } from 'next/navigation';
import { GroupDetail } from '@/types';

jest.mock('../../actions', () => ({
  getGroupMembers: jest.fn(),
  getNewsFeedIdsInGroup: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('../group-feed-content', () => ({
  GroupFeedContent: () => <div data-testid="group-feed-content" />,
}));

describe('GroupFeed', () => {
  const mockProps = {
    authorId: '123',
    group: {
      id: 1,
      name: 'Test Group',
    } as GroupDetail,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders group feed with content when data is available', async () => {
    const mockGroupMembers = {
      data: { data: [{ id: 1 }], meta: { pagination: { pageCount: 1 } } },
    };
    const mockNewsFeedIds = {
      data: { data: [{ id: 1 }], meta: { pagination: { pageCount: 1 } } },
    };

    (getGroupMembers as jest.Mock).mockResolvedValue(mockGroupMembers);
    (getNewsFeedIdsInGroup as jest.Mock).mockResolvedValue(mockNewsFeedIds);

    const component = await GroupFeed(mockProps);
    render(component);

    expect(screen.getByTestId('group-feed-content')).toBeInTheDocument();
  });

  it('calls notFound when group members data is missing', async () => {
    (getGroupMembers as jest.Mock).mockResolvedValue({ data: null });
    (getNewsFeedIdsInGroup as jest.Mock).mockResolvedValue({
      data: { data: [], meta: { pagination: { pageCount: 1 } } },
    });

    await GroupFeed(mockProps);
    expect(notFound).toHaveBeenCalled();
  });

  it('calls notFound when news feed data is missing', async () => {
    (getGroupMembers as jest.Mock).mockResolvedValue({
      data: { data: [], meta: { pagination: { pageCount: 1 } } },
    });
    (getNewsFeedIdsInGroup as jest.Mock).mockResolvedValue({ data: null });

    await GroupFeed(mockProps);
    expect(notFound).toHaveBeenCalled();
  });
});
