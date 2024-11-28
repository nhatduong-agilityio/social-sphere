import { render } from '@testing-library/react';
import { ActivityFeed } from '../activity-feed';
import { getNewsFeedIds } from '../../actions';
import { getGroups } from '@/features/group/actions';
import {
  getAcceptFriendListByUserId,
  getNonFriendListByUserId,
} from '@/features/profile/actions/friends-profile';

jest.mock('../../actions');
jest.mock('@/features/group/actions');
jest.mock('@/features/profile/actions/friends-profile');
jest.mock('../activity-feed-content', () => ({
  ActivityFeedContent: () => (
    <div data-testid="mocked-content">Mocked Content</div>
  ),
}));

const mockData = {
  newsFeed: {
    data: {
      data: [{ id: 1, attributes: { title: 'Test Post' } }],
      meta: { pagination: { page: 1, pageSize: 10, total: 1 } },
    },
  },
  suggestFriends: [{ id: 1, attributes: { name: 'John Doe' } }],
  acceptFriends: [{ id: 2, attributes: { name: 'Jane Doe' } }],
  groups: {
    data: {
      data: [{ id: 1, attributes: { name: 'Test Group' } }],
      meta: { pagination: { page: 1, pageSize: 10, total: 1 } },
    },
  },
};

describe('ActivityFeed', () => {
  beforeAll(() => {
    (getNewsFeedIds as jest.Mock).mockResolvedValue(mockData.newsFeed);
    (getNonFriendListByUserId as jest.Mock).mockResolvedValue(
      mockData.suggestFriends,
    );
    (getAcceptFriendListByUserId as jest.Mock).mockResolvedValue(
      mockData.acceptFriends,
    );
    (getGroups as jest.Mock).mockResolvedValue(mockData.groups);
  });

  it('renders successfully with all data', async () => {
    const component = await ActivityFeed({ authorId: 'test-id' });
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  it('calls all required APIs', async () => {
    await ActivityFeed({ authorId: 'test-id' });

    expect(getNewsFeedIds).toHaveBeenCalledWith('test-id');
    expect(getNonFriendListByUserId).toHaveBeenCalledWith('test-id');
    expect(getAcceptFriendListByUserId).toHaveBeenCalledWith('test-id');
    expect(getGroups).toHaveBeenCalledWith('test-id');
  });
});
