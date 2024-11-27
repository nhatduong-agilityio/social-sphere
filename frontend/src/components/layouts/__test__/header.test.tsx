import { render, fireEvent } from '@testing-library/react';
import { Header } from '../header';
import { useDisclosure } from '@/hooks';
import { MOCK_FRIENDS } from '@/__mocks__';

jest.mock('@/hooks', () => ({
  useDisclosure: jest.fn(() => ({
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  })),
  useFocusState: jest.fn(() => ({
    isFocused: false,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
}));

describe('Header', () => {
  const mockUser = MOCK_FRIENDS[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders authenticated header with user data', () => {
    const { getByRole, getAllByRole } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    expect(getByRole('banner')).toHaveClass('h-[58px]');
    expect(getAllByRole('button')).toHaveLength(9); // All navigation buttons
  });

  it('renders unauthenticated header', () => {
    const { getByRole } = render(<Header isAuthenticated={false} />);

    expect(getByRole('banner')).toHaveClass('h-[55px]');
    expect(getByRole('link')).toBeInTheDocument(); // BrandLink
  });

  it('handles search button click', () => {
    const mockOnOpen = jest.fn();
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: false,
      onOpen: mockOnOpen,
      onClose: jest.fn(),
    });

    const { getByTestId } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    const searchButton = getByTestId('button-item-navigation-5');
    fireEvent.click(searchButton);

    expect(mockOnOpen).toHaveBeenCalled();
  });

  it('handles click navigation 0', () => {
    const { getByTestId } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    const searchButton = getByTestId('button-item-navigation-0');
    fireEvent.click(searchButton);
  });
  it('handles click navigation 1', () => {
    const { getByTestId } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    const searchButton = getByTestId('button-item-navigation-1');
    fireEvent.click(searchButton);
  });
  it('handles click navigation 2', () => {
    const { getByTestId } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    const searchButton = getByTestId('button-item-navigation-2');
    fireEvent.click(searchButton);
  });
  it('handles click navigation 3', () => {
    const { getByTestId } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    const searchButton = getByTestId('button-item-navigation-3');
    fireEvent.click(searchButton);
  });
  it('handles click navigation 4', () => {
    const { getByTestId } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    const searchButton = getByTestId('button-item-navigation-4');
    fireEvent.click(searchButton);
  });

  it('renders navigation items with correct icons', () => {
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });

    const { container } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    const navigationIcons = container.querySelectorAll('svg');
    expect(navigationIcons.length).toBeGreaterThan(0);
  });

  it('applies correct responsive classes', () => {
    const { container } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    expect(container.querySelector('.lg\\:hidden')).toBeInTheDocument();
    expect(container.querySelector('.hidden.lg\\:flex')).toBeInTheDocument();
  });

  it('renders brand link with animation', () => {
    const { container } = render(
      <Header isAuthenticated={true} user={mockUser} />,
    );

    expect(container.querySelector('.animate-heartbeat')).toBeInTheDocument();
  });
});
