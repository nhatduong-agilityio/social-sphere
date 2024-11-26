import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

describe('Avatar', () => {
  it('renders Avatar with default props', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          data-testid="avatar-image"
        />
        <AvatarFallback data-testid="avatar-fallback">CN</AvatarFallback>
      </Avatar>,
    );
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('h-10 w-10 rounded-full');
  });

  it('renders Avatar with custom size', () => {
    render(
      <Avatar size="sm" data-testid="avatar">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          data-testid="avatar-image"
        />
        <AvatarFallback data-testid="avatar-fallback">CN</AvatarFallback>
      </Avatar>,
    );
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('h-8 w-8');
  });

  it('applies custom className', () => {
    render(<Avatar className="custom-class" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('custom-class');
  });
});
