import { render, screen } from '@testing-library/react';
import { LinkWithIcon } from '../link-with-icon';
import { Search } from 'lucide-react';

describe('LinkWithIcon', () => {
  it('renders link with text correctly', () => {
    render(
      <LinkWithIcon url="/test" text="Test Link" data-testid="test-link" />,
    );

    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/test');
  });

  it('renders with icon correctly', () => {
    render(
      <LinkWithIcon
        url="/test"
        text="Test Link"
        icon={<Search data-testid="search-icon" />}
      />,
    );

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<LinkWithIcon url="/test" text="Test Link" />);

    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveClass('rounded-lg border px-2 py-1');
    expect(link).toHaveClass('flex items-center hover:bg-slate-50');
  });

  it('applies additional custom classes', () => {
    render(
      <LinkWithIcon
        url="/test"
        text="Test Link"
        additionalClass="custom-class"
      />,
    );

    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveClass('custom-class');
  });

  it('renders with custom title', () => {
    render(<LinkWithIcon url="/test" text="Test Link" title="Custom Title" />);

    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveAttribute('title', 'Custom Title');
  });

  it('uses text as title when title prop is not provided', () => {
    render(<LinkWithIcon url="/test" text="Test Link" />);

    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveAttribute('title', 'Test Link');
  });
});
