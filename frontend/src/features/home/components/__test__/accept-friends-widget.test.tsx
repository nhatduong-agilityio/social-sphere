import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { AcceptFriendsWidget } from '../accept-friends-widget';
import { acceptedFriend, rejectedFriend } from '../../actions';
import { MOCK_FRIENDS } from '@/__mocks__';

// Mock the actions
jest.mock('../../actions', () => ({
  acceptedFriend: jest.fn(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  ),
  rejectedFriend: jest.fn(),
}));

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

describe('AcceptFriendsWidget', () => {
  const defaultProps = {
    authorId: 'author123',
    friends: mockFriends,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the widget with friend information', () => {
    render(<AcceptFriendsWidget {...defaultProps} />);

    expect(screen.getByText('Accepted Friends')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Melbourne')).toBeInTheDocument();
  });

  it('handles friend acceptance correctly', async () => {
    const user = userEvent.setup();
    render(<AcceptFriendsWidget {...defaultProps} />);

    // Open the dropdown menu
    const dropdownTrigger = screen.getByTestId('dropdown-trigger');
    await user.click(dropdownTrigger);

    // Wait for dropdown content to be visible and click accept
    const acceptButton = await screen.findByTestId('accept-friend-dropdown');
    await user.click(acceptButton);

    await waitFor(() => {
      expect(acceptedFriend).toHaveBeenCalledWith('author123', '1', 'rel1');
    });
  });

  it('handles friend rejection correctly', async () => {
    const user = userEvent.setup();
    render(<AcceptFriendsWidget {...defaultProps} />);

    // Open the dropdown menu
    const dropdownTrigger = screen.getByTestId('dropdown-trigger');
    await user.click(dropdownTrigger);

    // Wait for dropdown content to be visible and click reject
    const rejectButton = await screen.findByTestId('reject-friend-dropdown');
    await user.click(rejectButton);

    await waitFor(() => {
      expect(rejectedFriend).toHaveBeenCalledWith('rel1', 'author123');
    });
  });
});
