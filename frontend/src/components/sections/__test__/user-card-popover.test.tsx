import { render, screen } from '@testing-library/react';
import { UserCardPopover } from '../user-card-popover';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('UserCardPopover Component', () => {
  const mockUser = MOCK_FRIENDS[0];

  it('renders avatar fallback with initials when no image', () => {
    const userWithoutImage = { ...mockUser, profilePicture: '' };
    render(<UserCardPopover user={userWithoutImage} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<UserCardPopover user={mockUser} size="sm" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass('w-8 h-8');

    rerender(<UserCardPopover user={mockUser} size="md" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass('w-9 h-9');

    rerender(<UserCardPopover user={mockUser} size="lg" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass(
      'w-[38px] h-[38px]',
    );
  });

  it('applies stories border when isStories is true', () => {
    render(<UserCardPopover user={mockUser} isStories={true} />);
    expect(screen.getByTestId('avatar-trigger')).toHaveClass(
      'border',
      'border-gray-900',
    );
  });

  it('applies additional classes', () => {
    render(
      <UserCardPopover
        user={mockUser}
        additionalClass="custom-class"
        additionalAvatarClass="custom-avatar"
      />,
    );
    expect(screen.getByTestId('avatar-trigger')).toHaveClass('custom-class');
  });

  it('matches snapshot', () => {
    const { container } = render(<UserCardPopover user={mockUser} />);
    expect(container).toMatchSnapshot();
  });
});
