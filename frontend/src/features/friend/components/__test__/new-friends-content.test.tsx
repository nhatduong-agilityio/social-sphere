import { render } from '@testing-library/react';
import { NewFriendsContent } from '../new-friends-content';
import { getFriendListByUsername } from '../../actions';
import { MOCK_FRIENDS } from '@/__mocks__';

// Mock the actions
jest.mock('../../actions', () => ({
  getFriendListByUsername: jest.fn(),
}));

describe('NewFriendsContent', () => {
  const mockFriends = [
    {
      id: 1,
      followed: MOCK_FRIENDS[0],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getFriendListByUsername as jest.Mock).mockResolvedValue(mockFriends);
  });

  it('matches snapshot', async () => {
    const { container } = render(
      await NewFriendsContent({ username: 'testuser' }),
    );
    expect(container).toMatchSnapshot();
  });
});
