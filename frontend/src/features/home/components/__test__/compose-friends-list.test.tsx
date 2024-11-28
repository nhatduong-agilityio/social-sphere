import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { ComposeFriendsList } from '../compose-friends-list';
import { useForm, FormProvider } from 'react-hook-form';
import { getFriends, getFriendsByName } from '../../actions';
import { MOCK_FRIENDS } from '@/__mocks__/user';
import { ComposeFeedFormValues } from '../../hooks';

jest.mock('../../actions', () => ({
  getFriends: jest.fn(),
  getFriendsByName: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useDisclosure: jest.fn(() => ({
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  })),
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
  useDebounce: jest.fn((value) => value),
}));

describe('ComposeFriendsList', () => {
  const TestWrapper = () => {
    const methods = useForm<ComposeFeedFormValues>({
      defaultValues: {
        sendFriends: [],
      },
    });

    return (
      <FormProvider {...methods}>
        <ComposeFriendsList form={methods} />
      </FormProvider>
    );
  };

  beforeEach(() => {
    (getFriends as jest.Mock).mockResolvedValue({ data: MOCK_FRIENDS });
    (getFriendsByName as jest.Mock).mockResolvedValue({ data: MOCK_FRIENDS });
  });

  it('renders friends list with search bar', async () => {
    const { container } = render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Nelly Schwartz')).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('handles friend selection and deselection correctly', async () => {
    render(<TestWrapper />);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];

      // Test deselection
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).toHaveAttribute('data-state', 'unchecked');
    });
  });

  it('calls getFriendsByName after debounce delay', async () => {
    render(<TestWrapper />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Fast-forward debounce timer
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(getFriendsByName).toHaveBeenCalledWith('John');
    });
  });
});
