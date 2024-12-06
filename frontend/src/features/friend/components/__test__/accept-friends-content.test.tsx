import { render, screen } from '@testing-library/react';
import { AcceptFriendsContent } from '../accept-friends-content';
import { auth } from '@/auth';
import { getAcceptFriendListByUserId } from '../../actions';
import { MOCK_FRIENDS } from '@/__mocks__';

// Mock the dependencies
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('../../actions', () => ({
  getAcceptFriendListByUserId: jest.fn(),
}));

describe('AcceptFriendsContent', () => {
  const mockUser = {
    id: 'user123',
    name: 'Test User',
  };

  const mockFriends = [
    {
      id: 1,
      follower: {
        ...MOCK_FRIENDS[0],
        followedRelationships: [],
      },
      documentId: 'rel1',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue({ user: mockUser });
  });

  it('should render AcceptFriendsWidget when there are friends to accept', async () => {
    (getAcceptFriendListByUserId as jest.Mock).mockResolvedValue(mockFriends);

    render(await AcceptFriendsContent());

    expect(auth).toHaveBeenCalled();
    expect(getAcceptFriendListByUserId).toHaveBeenCalledWith('user123');
    expect(screen.getByText('Accepted Friends')).toBeInTheDocument();
  });

  it('should not render anything when there are no friends to accept', async () => {
    (getAcceptFriendListByUserId as jest.Mock).mockResolvedValue([]);

    const { container } = render(await AcceptFriendsContent());

    expect(auth).toHaveBeenCalled();
    expect(getAcceptFriendListByUserId).toHaveBeenCalledWith('user123');
    expect(container).toBeEmptyDOMElement();
  });
});
