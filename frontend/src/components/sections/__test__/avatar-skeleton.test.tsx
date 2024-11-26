import { render, screen } from '@testing-library/react';
import { AvatarSkeleton } from '../avatar-skeleton';

describe('AvatarSkeleton Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<AvatarSkeleton />);
    expect(container).toMatchSnapshot();
  });

  it('renders with default variant', () => {
    render(<AvatarSkeleton />);
    const skeleton = screen.getByTestId('avatar-skeleton');
    expect(skeleton).toHaveClass('w-24 h-24 rounded-full');
  });
});
