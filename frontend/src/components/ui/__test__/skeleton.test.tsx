import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton data-testid="test-skeleton" />);
    const skeleton = screen.getByTestId('test-skeleton');
    expect(skeleton).toHaveClass('animate-pulse rounded-md bg-muted');
  });
});
