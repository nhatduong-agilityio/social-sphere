import { render, screen } from '@testing-library/react';
import { BrandLink } from '../brand-link';

describe('BrandLink Component', () => {
  it('renders with default size', () => {
    render(<BrandLink />);
    const link = screen.getByTestId('brand-link');
    const icon = link.querySelector('svg');
    expect(icon).toHaveAttribute('width', '38');
    expect(icon).toHaveAttribute('height', '38');
  });

  it('renders with custom size', () => {
    const customSize = 50;
    render(<BrandLink size={customSize} />);
    const link = screen.getByTestId('brand-link');
    const icon = link.querySelector('svg');
    expect(icon).toHaveAttribute('width', customSize.toString());
    expect(icon).toHaveAttribute('height', customSize.toString());
  });

  it('has correct link attributes', () => {
    render(<BrandLink />);
    const link = screen.getByTestId('brand-link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('aria-label', 'brand-link');
    expect(link).toHaveClass('w-fit', 'outline-none');
  });

  it('matches snapshot', () => {
    const { container } = render(<BrandLink size={45} />);
    expect(container).toMatchSnapshot();
  });
});
