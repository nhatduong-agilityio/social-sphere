import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TagFriends } from '../tag-friends';
import { getFriendsByName } from '../../actions';
import { MOCK_FRIENDS } from '@/__mocks__';

jest.mock('../../actions', () => ({
  getFriendsByName: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
  useDebounce: jest.fn((value) => value),
}));

describe('TagFriends', () => {
  const mockProps = {
    onSelectFriend: jest.fn(),
    onCloseTagFriends: jest.fn(),
  };

  beforeEach(() => {
    (getFriendsByName as jest.Mock).mockResolvedValue({ data: MOCK_FRIENDS });
  });

  it('matches snapshot', () => {
    const { container } = render(<TagFriends {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders search input', () => {
    render(<TagFriends {...mockProps} />);
    expect(
      screen.getByPlaceholderText('Who are you with?'),
    ).toBeInTheDocument();
  });

  it('shows friends list after search', async () => {
    render(<TagFriends {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Who are you with?');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
    });
  });

  it('handles friend selection', async () => {
    render(<TagFriends {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Who are you with?');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
      const friendItem = screen.getByText('John Doe');
      fireEvent.click(friendItem);
      expect(mockProps.onSelectFriend).toHaveBeenCalledWith('1');
    });
  });

  it('renders with secondary variant', () => {
    render(
      <TagFriends
        {...mockProps}
        variant="secondary"
        label="Custom Label"
        hasSelectedValue={true}
      />,
    );
    expect(screen.getByText('Custom Label :')).toBeInTheDocument();
  });
});
