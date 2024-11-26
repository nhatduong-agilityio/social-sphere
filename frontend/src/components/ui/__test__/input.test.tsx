import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../input';
import { Search, Mail } from 'lucide-react';

describe('Input Component', () => {
  it('renders input element correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByTestId('input-element');
    expect(input).toBeInTheDocument();
  });

  it('handles different variants correctly', () => {
    const { rerender } = render(<Input variant="default" />);
    expect(screen.getByTestId('input-element')).toHaveClass('border-input');

    rerender(<Input variant="ghost" />);
    expect(screen.getByTestId('input-element')).toHaveClass('border-0');

    rerender(<Input variant="icon" />);
    expect(screen.getByTestId('input-element')).toHaveClass('transition-all');
  });

  it('renders start and end icons correctly', () => {
    render(
      <Input
        startIcon={<Search data-testid="start-icon" />}
        endIcon={<Mail data-testid="end-icon" />}
      />,
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('handles focus and blur states', () => {
    render(<Input startIcon={<Search data-testid="start-icon" />} />);
    const input = screen.getByTestId('input-element');

    fireEvent.focus(input);
    expect(screen.getByTestId('start-icon').parentElement).toHaveClass(
      'text-ring',
    );

    fireEvent.blur(input);
    expect(screen.getByTestId('start-icon').parentElement).toHaveClass(
      'text-gray-900',
    );
  });

  it('applies custom className correctly', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByTestId('input-element')).toHaveClass('custom-class');
  });

  it('handles disabled state correctly', () => {
    render(<Input disabled />);
    const input = screen.getByTestId('input-element');
    expect(input).toBeDisabled();
  });
});
