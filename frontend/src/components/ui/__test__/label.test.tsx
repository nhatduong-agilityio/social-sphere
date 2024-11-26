import { render, screen } from '@testing-library/react';
import { Label, labelVariants } from '../label';

describe('Label', () => {
  it('renders with default props', () => {
    render(<Label data-testid="test-label">Test Label</Label>);
    const label = screen.getByTestId('test-label');
    expect(label).toHaveClass(
      'font-roboto peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    );
  });

  it('applies custom className', () => {
    render(
      <Label data-testid="custom-label" className="custom-class">
        Custom Label
      </Label>,
    );
    const label = screen.getByTestId('custom-label');
    expect(label).toHaveClass('custom-class');
  });

  it('generates correct class names with labelVariants', () => {
    const defaultClasses = labelVariants();
    expect(defaultClasses).toContain('text-neutral-400');
    expect(defaultClasses).toContain('text-xs');

    const customClasses = labelVariants({
      variant: 'neutral',
      size: 'tiny',
      className: 'custom-class',
    });
    expect(customClasses).toContain('text-neutral-700');
    expect(customClasses).toContain('text-4xs');
    expect(customClasses).toContain('custom-class');
  });
});
