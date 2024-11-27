import { render, fireEvent, act } from '@testing-library/react';
import { GroupRemoveConfirmDialog } from '../group-remove-confirm-dialog';

const mockMutateRemoveGroup = jest.fn();

jest.mock('../../hooks', () => ({
  useRemoveGroup: () => ({
    isPending: false,
    mutateRemoveGroup: mockMutateRemoveGroup,
  }),
}));

describe('GroupRemoveConfirmDialog', () => {
  const mockProps = {
    groupId: 'group-1',
    groupName: 'Test Group',
    userId: 'user-1',
    trigger: <button>Delete Group</button>,
    onRemoveSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const { container } = render(<GroupRemoveConfirmDialog {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders trigger element', () => {
    const { getByText } = render(<GroupRemoveConfirmDialog {...mockProps} />);
    expect(getByText('Delete Group')).toBeInTheDocument();
  });

  it('handles remove group action successfully', async () => {
    mockMutateRemoveGroup.mockResolvedValueOnce({});

    const { getByText } = render(<GroupRemoveConfirmDialog {...mockProps} />);

    fireEvent.click(getByText('Delete Group'));
    const deleteButton = getByText('Delete');

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(mockMutateRemoveGroup).toHaveBeenCalledWith({
      groupId: 'group-1',
      groupName: 'Test Group',
      userId: 'user-1',
    });
    expect(mockProps.onRemoveSuccess).toHaveBeenCalledWith('group-1');
  });

  it('shows loading state while removing', async () => {
    jest.mock('../../hooks', () => ({
      useRemoveGroup: () => ({
        isPending: true,
        mutateRemoveGroup: mockMutateRemoveGroup,
      }),
    }));

    const { getByText } = render(<GroupRemoveConfirmDialog {...mockProps} />);

    fireEvent.click(getByText('Delete Group'));
    const deleteButton = getByText('Delete');

    expect(deleteButton).toHaveClass('disabled:pointer-events-none');
  });
});
