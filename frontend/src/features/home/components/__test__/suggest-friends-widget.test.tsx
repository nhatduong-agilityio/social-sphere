import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SuggestFriendsWidget } from '../suggest-friends-widget';
import { requestAddFriends } from '../../actions';
import { MOCK_FRIENDS } from '@/__mocks__';
import { TFollowed } from '@/models';

jest.mock('../../actions', () => ({
  requestAddFriends: jest.fn(),
}));

describe('SuggestFriendsWidget', () => {
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

  const mockProps = {
    authorId: '123',
    suggestFriends: mockSuggestFriends,
  };

  it('matches snapshot', () => {
    const { container } = render(<SuggestFriendsWidget {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders suggested friends list', () => {
    render(<SuggestFriendsWidget {...mockProps} />);

    mockSuggestFriends.forEach((friend) => {
      expect(
        screen.getByText(`${friend.firstName} ${friend.lastName}`),
      ).toBeInTheDocument();
    });
  });

  it('handles add friend action', async () => {
    render(<SuggestFriendsWidget {...mockProps} />);

    const addButtons = screen.getAllByRole('button');
    fireEvent.click(addButtons[1]); // Click first add friend button

    await waitFor(() => {
      expect(requestAddFriends).toHaveBeenCalledWith('123', '1');
    });
  });

  it('disables button after adding friend', async () => {
    render(<SuggestFriendsWidget {...mockProps} />);

    const addButton = screen.getAllByRole('button')[1];
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addButton).toBeDisabled();
    });
  });
});
