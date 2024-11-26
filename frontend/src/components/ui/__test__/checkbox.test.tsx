import { render, screen } from '@testing-library/react';
import { Checkbox, checkboxVariants } from '../checkbox';

describe('Checkbox', () => {
  it('renders with default variant and size', () => {
    render(<Checkbox data-testid="test-checkbox">Default Checkbox</Checkbox>);
    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).toHaveClass('rounded-sm');
  });

  it('applies custom className', () => {
    render(
      <Checkbox data-testid="custom-checkbox" className="custom-class">
        Custom Button
      </Checkbox>,
    );
    const checkbox = screen.getByTestId('custom-checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('generates correct class names with checkboxVariants', () => {
    const defaultClasses = checkboxVariants();
    expect(defaultClasses).toContain('rounded-sm');

    const customClasses = checkboxVariants({
      variant: 'circle',
      className: 'custom-class',
    });
    expect(customClasses).toContain('rounded-full');
    expect(customClasses).toContain('custom-class');
  });
});
