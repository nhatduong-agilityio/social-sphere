import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { GroupInviteMembersInput } from '../group-invite-members-input';
import { ToastProps } from '@/components/ui';

const mockToast = jest.fn();
const mockGetFriendsByUserId = jest.fn();
const mockInviteToGroup = jest.fn();
const mockStartTransition = jest.fn((cb) => cb());

jest.mock('@/hooks', () => ({
  toast: ({ ...props }: ToastProps) => mockToast(props),
  useDebounce: (value: string) => value,
  useOnClickOutside: jest.fn(),
  useFocusState: () => ({
    isFocused: true,
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
  }),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, mockStartTransition],
}));

jest.mock('../../actions', () => ({
  inviteToGroup: (groupId: number, userId: string) =>
    mockInviteToGroup(groupId, userId),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
}));

jest.mock('@/features/home/actions', () => ({
  getFriendsByUserId: (
    userId: string,
    searchName?: string,
    page?: number,
    pageSize?: number,
  ) => mockGetFriendsByUserId(userId, searchName, page, pageSize),
}));

describe('GroupInviteMembersInput', () => {
  const mockProps = {
    groupMembers: [],
    groupId: 1,
    authorId: '1',
    addOptimisticMember: jest.fn(),
  };

  const mockFriends = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      profilePicture: 'avatar.jpg',
      location: { city: 'New York', countryCode: 'US' },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFriendsByUserId.mockResolvedValue({ data: mockFriends });
  });

  it('matches snapshot', () => {
    const { container } = render(<GroupInviteMembersInput {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('searches friends on input change', async () => {
    const { getByPlaceholderText } = render(
      <GroupInviteMembersInput {...mockProps} />,
    );

    const searchInput = getByPlaceholderText('Search friends to invite...');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'John' } });
    });

    expect(mockGetFriendsByUserId).toHaveBeenCalledWith(
      '1',
      'John',
      undefined,
      undefined,
    );
  });

  it('handles friend invitation successfully', async () => {
    mockGetFriendsByUserId.mockResolvedValue({ data: mockFriends });
    mockInviteToGroup.mockResolvedValue({});

    const { getByTestId, getByPlaceholderText, getByText } = render(
      <GroupInviteMembersInput {...mockProps} />,
    );

    // Trigger search to show friends list
    const searchInput = getByPlaceholderText('Search friends to invite...');
    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Wait for friends list to appear
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click invite button
    const inviteButton = getByTestId('button-invite');
    await act(async () => {
      fireEvent.click(inviteButton);
    });

    expect(mockStartTransition).toHaveBeenCalled();
    expect(mockInviteToGroup).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      variant: 'success',
      title: 'Success',
      description: 'Friend invited successfully',
    });
  });

  it('handles invitation error', async () => {
    mockGetFriendsByUserId.mockResolvedValue({ data: mockFriends });
    mockInviteToGroup.mockRejectedValue(new Error('Failed to invite'));

    const { getByPlaceholderText, getByTestId, getByText } = render(
      <GroupInviteMembersInput {...mockProps} />,
    );

    // Trigger search to show friends list
    const searchInput = getByPlaceholderText('Search friends to invite...');
    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Wait for friends list to appear
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click invite button
    const inviteButton = getByTestId('button-invite');
    await act(async () => {
      fireEvent.click(inviteButton);
    });

    expect(mockToast).toHaveBeenCalledWith({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to invite friend',
    });
    expect(mockGetFriendsByUserId).toHaveBeenCalled();
  });
});
