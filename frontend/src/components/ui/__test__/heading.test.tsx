import { render, screen } from '@testing-library/react';
import { Heading, headingVariants } from '../heading';

describe('Heading', () => {
  it('renders with default props', () => {
    render(<Heading data-testid="default-heading">Default Heading</Heading>);
    const heading = screen.getByTestId('default-heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-heading');
  });

  it('renders with different heading levels', () => {
    const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    levels.forEach((level) => {
      render(
        <Heading data-testid={`${level}-heading`} headingLevel={level}>
          {level} Heading
        </Heading>,
      );
      const heading = screen.getByTestId(`${level}-heading`);
      expect(heading.tagName).toBe(level.toUpperCase());
    });
  });

  it('renders with title variant', () => {
    render(
      <Heading data-testid="title-heading" variant="title">
        Title Heading
      </Heading>,
    );
    const heading = screen.getByTestId('title-heading');
    expect(heading).toHaveClass(
      'font-roboto font-medium text-neutral-700 dark:text-gray-100',
    );
  });

  it('renders with different sizes', () => {
    render(
      <Heading data-testid="base-heading" size="base">
        Base Heading
      </Heading>,
    );
    const heading = screen.getByTestId('base-heading');
    expect(heading).toHaveClass('text-base');
  });

  it('applies custom className', () => {
    render(
      <Heading data-testid="custom-heading" className="custom-class">
        Custom Heading
      </Heading>,
    );
    const heading = screen.getByTestId('custom-heading');
    expect(heading).toHaveClass('custom-class');
  });

  it('generates correct class names with headingVariants', () => {
    const defaultClasses = headingVariants();
    expect(defaultClasses).toContain('text-heading');

    const customClasses = headingVariants({
      variant: 'caption',
      size: '2xl',
      className: 'custom-class',
    });
    expect(customClasses).toContain(
      'text-gray-50 [text-shadow:_4px_4px_#3180e1,_8px_8px_#3180e1]',
    );
    expect(customClasses).toContain('text-2xl');
    expect(customClasses).toContain('custom-class');
  });
});
