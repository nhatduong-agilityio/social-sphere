import { render } from '@testing-library/react';
import { Toaster } from '../toaster';
import { useToast } from '@/hooks/use-toast';

// Mock the `useToast` hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('Toaster', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders no toasts when `toasts` is empty', () => {
    (useToast as jest.Mock).mockReturnValue({ toasts: [] });

    const { queryByTestId } = render(<Toaster />);

    // There should be no Toast components rendered
    expect(queryByTestId('toast')).toBeNull();
  });

  it('renders multiple toasts when `toasts` are provided', () => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [
        { id: '1', title: 'Toast 1', description: 'Description 1' },
        { id: '2', title: 'Toast 2', description: 'Description 2' },
      ],
    });

    const { getAllByTestId, getByText } = render(<Toaster />);

    // Two Toast components should be rendered
    expect(getAllByTestId('toast')).toHaveLength(2);

    // Check for titles and descriptions of toasts
    expect(getByText('Toast 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('Toast 2')).toBeInTheDocument();
    expect(getByText('Description 2')).toBeInTheDocument();
  });

  it('renders a toast without a description', () => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [{ id: '3', title: 'Toast without description' }],
    });

    const { getByText, queryByText } = render(<Toaster />);

    // Check if the title is rendered
    expect(getByText('Toast without description')).toBeInTheDocument();

    // The description should not exist
    expect(queryByText('Description')).toBeNull();
  });
});
