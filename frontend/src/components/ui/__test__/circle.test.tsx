import { render, screen } from '@testing-library/react';
import { Circle, circleVariants } from '../circle';

describe('Circle', () => {
  it('renders with default variant and size', () => {
    render(<Circle data-testid="test-circle">Default Circle</Circle>);
    const circle = screen.getByTestId('test-circle');
    expect(circle).toHaveClass('bg-blue-600');
    expect(circle).toHaveClass('h-8 w-8');
  });

  it('applies custom className', () => {
    render(
      <Circle data-testid="custom-circle" className="custom-class">
        Custom Circle
      </Circle>,
    );
    const circle = screen.getByTestId('custom-circle');
    expect(circle).toHaveClass('custom-class');
  });

  it('generates correct class names with checkboxVariants', () => {
    const defaultClasses = circleVariants();
    expect(defaultClasses).toContain('bg-blue-600');
    expect(defaultClasses).toContain('h-8 w-8');

    const customClasses = circleVariants({
      variant: 'primary',
      size: 'tiny',
      className: 'custom-class',
    });
    expect(customClasses).toContain('border-[1.4px] border-gray-600');
    expect(customClasses).toContain('w-2.5 h-2.5');
    expect(customClasses).toContain('custom-class');

    const customClassesSecondary = circleVariants({
      variant: 'secondary',
      size: 'md',
    });
    expect(customClassesSecondary).toContain('border border-gray-600');
    expect(customClassesSecondary).toContain('h-[34px] w-[34px]');

    const customClassesSizeLarge = circleVariants({
      size: 'lg',
    });
    expect(customClassesSizeLarge).toContain('h-[38px] w-[38px]');

    const customClassesSizeExtraLarge = circleVariants({
      size: 'xl',
    });
    expect(customClassesSizeExtraLarge).toContain('h-10 w-10');
  });
});
