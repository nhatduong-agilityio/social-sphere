import { render, fireEvent, act } from '@testing-library/react';
import { GroupLeaveConfirmDialog } from '../group-leave-confirm-dialog';

const mockMutateLeaveGroup = jest.fn();

jest.mock('../../hooks', () => ({
  useLeaveGroup: () => ({
    isPending: false,
    mutateLeaveGroup: mockMutateLeaveGroup,
  }),
}));

describe('GroupLeaveConfirmDialog', () => {
  const mockProps = {
    groupId: 'group-1',
    groupMemberId: 'member-1',
    groupName: 'Test Group',
    userId: 'user-1',
    trigger: <button>Leave Group</button>,
    onLeaveSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const { container } = render(<GroupLeaveConfirmDialog {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders trigger element', () => {
    const { getByText } = render(<GroupLeaveConfirmDialog {...mockProps} />);
    expect(getByText('Leave Group')).toBeInTheDocument();
  });

  it('handles leave group action successfully', async () => {
    mockMutateLeaveGroup.mockResolvedValueOnce({});

    const { getByText } = render(<GroupLeaveConfirmDialog {...mockProps} />);

    fireEvent.click(getByText('Leave Group'));
    const leaveButton = getByText('Leave');

    await act(async () => {
      fireEvent.click(leaveButton);
    });

    expect(mockMutateLeaveGroup).toHaveBeenCalledWith({
      groupId: 'group-1',
      groupMemberId: 'member-1',
      userId: 'user-1',
    });
    expect(mockProps.onLeaveSuccess).toHaveBeenCalledWith('group-1');
  });

  it('shows loading state while leaving', async () => {
    jest.mock('../../hooks', () => ({
      useLeaveGroup: () => ({
        isPending: true,
        mutateLeaveGroup: mockMutateLeaveGroup,
      }),
    }));

    const { getByText } = render(<GroupLeaveConfirmDialog {...mockProps} />);

    fireEvent.click(getByText('Leave Group'));
    const leaveButton = getByText('Leave');

    expect(leaveButton).toHaveClass('disabled:pointer-events-none');
  });
});
