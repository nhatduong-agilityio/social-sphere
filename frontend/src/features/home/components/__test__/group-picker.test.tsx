import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GroupPicker } from '../group-picker';
import { getGroups } from '@/features/group/actions';

jest.mock('@/features/group/actions', () => ({
  getGroups: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
  useDebounce: jest.fn((value) => value),
}));

const MOCK_GROUPS = {
  data: [
    {
      id: '1',
      name: 'Test Group 1',
      description: 'First test group',
      avatar: 'avatar1.jpg',
    },
    {
      id: '2',
      name: 'Test Group 2',
      description: 'Second test group',
      avatar: 'avatar2.jpg',
    },
  ],
};

describe('GroupPicker', () => {
  const mockProps = {
    authorId: '1',
    onSelectGroup: jest.fn(),
    onCloseGroupPicker: jest.fn(),
  };

  beforeEach(() => {
    (getGroups as jest.Mock).mockResolvedValue({ data: MOCK_GROUPS });
  });

  it('matches snapshot', () => {
    const { container } = render(<GroupPicker {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders search input and handles search', async () => {
    render(<GroupPicker {...mockProps} />);

    const searchInput = screen.getByPlaceholderText("Your group's name");
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(getGroups).toHaveBeenCalledWith('1', 'Test');
    });
  });

  it('displays group suggestions after search', async () => {
    render(<GroupPicker {...mockProps} />);

    const searchInput = screen.getByPlaceholderText("Your group's name");
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    await waitFor(() => {
      MOCK_GROUPS.data.forEach((group) => {
        expect(screen.getByText(group.name)).toBeInTheDocument();
        expect(screen.getByText(group.description)).toBeInTheDocument();
      });
    });
  });

  it('selects group when clicking suggestion', async () => {
    render(<GroupPicker {...mockProps} />);

    const searchInput = screen.getByPlaceholderText("Your group's name");
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    await waitFor(() => {
      const firstGroup = screen.getByText(MOCK_GROUPS.data[0].name);
      fireEvent.click(firstGroup);
      expect(mockProps.onSelectGroup).toHaveBeenCalledWith('1');
    });
  });

  it('renders with secondary variant', () => {
    render(
      <GroupPicker {...mockProps} variant="secondary" label="Custom Label" />,
    );
    expect(screen.getByText('Custom Label :')).toBeInTheDocument();
  });
});
