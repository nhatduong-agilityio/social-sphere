import { render } from '@testing-library/react';
import { SuggestFriendsContent } from '../suggest-friends-content';
import { auth } from '@/auth';
import { getNonFriendListByUserId } from '../../actions';
import { MOCK_FRIENDS } from '@/__mocks__';
import { TFollowed } from '@/models';

// Mock the dependencies
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('../../actions', () => ({
  getNonFriendListByUserId: jest.fn(),
}));

describe('SuggestFriendsContent', () => {
  const mockUser = MOCK_FRIENDS[0];

  const mockSuggestFriends = [
    {
      ...MOCK_FRIENDS[0],
      followedRelationships: [{ id: 2 }],
    },
    {
      ...MOCK_FRIENDS[1],
      followedRelationships: [{ id: 1 }],
    },
  ] as TFollowed[];

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue({ user: mockUser });
  });

  it('should render AcceptFriendsWidget when there are friends to accept', async () => {
    (getNonFriendListByUserId as jest.Mock).mockResolvedValue(
      mockSuggestFriends,
    );

    render(await SuggestFriendsContent());

    expect(auth).toHaveBeenCalled();
    expect(getNonFriendListByUserId).toHaveBeenCalledWith('1');
  });

  it('should not render anything when there are no friends to accept', async () => {
    (getNonFriendListByUserId as jest.Mock).mockResolvedValue([]);

    const { container } = render(await SuggestFriendsContent());

    expect(auth).toHaveBeenCalled();
    expect(getNonFriendListByUserId).toHaveBeenCalledWith('1');
    expect(container).toMatchSnapshot();
  });
});
