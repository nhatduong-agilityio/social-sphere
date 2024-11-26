import { render, screen } from '@testing-library/react';
import { BannerSkeleton } from '../banner-skeleton';

describe('BannerSkeleton Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<BannerSkeleton />);
    expect(container).toMatchSnapshot();
  });

  it('renders with default variant', () => {
    render(<BannerSkeleton />);
    const skeleton = screen.getByTestId('banner-skeleton');
    expect(skeleton).toHaveClass('relative w-full h-56 md:h-80 group');
  });
});
