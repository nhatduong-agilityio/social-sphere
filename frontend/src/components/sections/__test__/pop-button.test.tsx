import { render, screen, fireEvent } from '@testing-library/react';
import { PopButton } from '../pop-button';
import { Plus } from 'lucide-react';

describe('PopButton Component', () => {
  const defaultProps = {
    rotate: '45deg',
    icon: <Plus data-testid="plus-icon" />,
    isActive: true,
    onClick: jest.fn(),
  };

  it('renders with correct rotation transform when active', () => {
    render(<PopButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button.style.transform).toBe(
      'translate(-50%, -50%) rotate(45deg) translateY(-90px)',
    );
  });

  it('renders with inactive transform', () => {
    render(<PopButton {...defaultProps} isActive={false} />);
    const button = screen.getByRole('button');
    expect(button.style.transform).toBe('translate(0, -10px) rotate(10deg)');
  });

  it('handles click events', () => {
    render(<PopButton {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('renders icon correctly', () => {
    render(<PopButton {...defaultProps} />);
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  it('applies correct default classes', () => {
    render(<PopButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      '-z-10',
      'absolute',
      'border-none',
      'rounded-full',
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<PopButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
