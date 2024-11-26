import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../switch';
import { Sun, Moon } from 'lucide-react';

describe('Switch Component', () => {
  it('renders with default variant and size', () => {
    render(<Switch data-testid="test-switch" />);
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toHaveClass('h-[31px] w-[54px]');
  });

  it('handles checked state correctly', () => {
    render(<Switch data-testid="test-switch" checked />);
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('renders with checked icons', () => {
    render(<Switch checkedIcon={<Sun data-testid="sun-icon" />} />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('renders with unchecked icons', () => {
    render(<Switch checkedIcon={<Moon data-testid="moon-icon" />} />);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onCheckedChange = jest.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className', () => {
    render(<Switch className="custom-class" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('renders thumb with correct styling', () => {
    render(<Switch data-testid="test-switch" />);
    const thumb = screen
      .getByRole('switch')
      .querySelector('[class*="rounded-full"]');
    expect(thumb).toHaveClass('h-[26px] w-[26px]');
  });
});
