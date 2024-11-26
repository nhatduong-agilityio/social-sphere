import { render, screen } from '@testing-library/react';
import { Text } from '../text';

describe('Text Component', () => {
  it('renders with default variant and size', () => {
    render(<Text>Default Text</Text>);
    const text = screen.getByText('Default Text');
    expect(text).toHaveClass('text-sm');
    expect(text).toHaveClass('text-foreground');
  });

  it('renders with primary variant', () => {
    render(<Text variant="primary">Primary Text</Text>);
    const text = screen.getByText('Primary Text');
    expect(text).toHaveClass('text-neutral-100');
  });

  it('renders with error variant', () => {
    render(<Text variant="error">Error Text</Text>);
    const text = screen.getByText('Error Text');
    expect(text).toHaveClass('text-destructive');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Text size="xs">Extra Small</Text>);
    expect(screen.getByText('Extra Small')).toHaveClass('text-xs');

    rerender(<Text size="md">Medium</Text>);
    expect(screen.getByText('Medium')).toHaveClass('text-md');
  });

  it('applies custom className', () => {
    render(<Text className="custom-class">Custom Text</Text>);
    const text = screen.getByText('Custom Text');
    expect(text).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Text ref={ref}>Reference Text</Text>);
    expect(ref).toHaveBeenCalled();
  });
});
