import { render, screen, fireEvent } from '@testing-library/react';
import { ComposeSearchBar } from '../compose-search-bar';
import { MOCK_FRIENDS } from '@/__mocks__';

jest.mock('@/hooks', () => ({
  useDisclosure: () => ({
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  }),
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
}));

describe('ComposeSearchBar', () => {
  const mockProps = {
    searchFriend: '',
    setSearchFriend: jest.fn(),
    friendsList: <div>Friends List</div>,
    selectedFriends: MOCK_FRIENDS,
  };

  it('renders search input when search is opened', () => {
    render(<ComposeSearchBar {...mockProps} />);
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('calls setSearchFriend when search input changes', () => {
    render(<ComposeSearchBar {...mockProps} />);
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockProps.setSearchFriend).toHaveBeenCalledWith('test');
  });

  it('renders selected friends list with correct names', () => {
    render(<ComposeSearchBar {...mockProps} />);
    const createGroupButton = screen.getByText('Create Group');
    fireEvent.click(createGroupButton);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
