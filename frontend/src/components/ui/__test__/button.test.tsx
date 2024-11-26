import { render, screen } from '@testing-library/react';
import { Button, buttonVariants } from '../button';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button data-testid="test-button">Default Button</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toHaveClass('bg-white text-button');
    expect(button).toHaveClass('h-10 px-4 py-2');
  });

  it('renders with loading state', () => {
    render(<Button isLoading>Loading Button</Button>);
    const loaderIcon = screen.getByTestId('loader-button');
    expect(loaderIcon).toHaveClass('animate-spin-fast');
  });

  it('applies custom className', () => {
    render(
      <Button data-testid="custom-button" className="custom-class">
        Custom Button
      </Button>,
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a data-testid="link-button" href="#">
          Link Button
        </a>
      </Button>,
    );
    const link = screen.getByTestId('link-button');
    expect(link).toHaveClass('bg-white text-button');
  });

  it('generates correct class names with buttonVariants', () => {
    const defaultClasses = buttonVariants();
    expect(defaultClasses).toContain('bg-white');
    expect(defaultClasses).toContain('text-button');

    const customClasses = buttonVariants({
      variant: 'fixed',
      size: 'sm',
      className: 'custom-class',
    });
    expect(customClasses).toContain('text-neutral-800');
    expect(customClasses).toContain('h-9');
    expect(customClasses).toContain('custom-class');
  });
});
