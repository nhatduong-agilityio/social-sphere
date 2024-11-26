import { render, screen } from '@testing-library/react';
import { Progress } from '../progress';

describe('Progress Component', () => {
  it('renders with default variant and size', () => {
    render(<Progress value={50} />);
    const progressBar = screen.getByLabelText('50-progress-bar');
    expect(progressBar).toHaveClass('h-4');
    expect(progressBar).toHaveClass('bg-gray-600');
  });

  it('renders with secondary variant', () => {
    render(<Progress variant="secondary" value={75} />);
    const progressBar = screen.getByLabelText('75-progress-bar');
    expect(progressBar).toHaveClass('border-6');
    expect(progressBar).toHaveClass('border-white');
  });

  it('renders with md size', () => {
    render(<Progress size="md" value={25} />);
    const progressBar = screen.getByLabelText('25-progress-bar');
    expect(progressBar).toHaveClass('h-[18px]');
  });

  it('applies custom className', () => {
    render(<Progress className="custom-class" value={60} />);
    const progressBar = screen.getByLabelText('60-progress-bar');
    expect(progressBar).toHaveClass('custom-class');
  });

  it('handles zero value correctly', () => {
    render(<Progress value={0} />);
    const progressBar = screen.getByLabelText('0-progress-bar');
    const indicator = progressBar.querySelector('[class*="bg-primary"]');
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
  });

  it('handles undefined value correctly', () => {
    render(<Progress />);
    const progressBar = screen.getByLabelText('undefined-progress-bar');
    const indicator = progressBar.querySelector('[class*="bg-primary"]');
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
  });

  it('handles full progress correctly', () => {
    render(<Progress value={100} />);
    const progressBar = screen.getByLabelText('100-progress-bar');
    const indicator = progressBar.querySelector('[class*="bg-primary"]');
    expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' });
  });
});
