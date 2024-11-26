import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from 'lucide-react';
import { AutoCompleteInput } from '../auto-complete-input';

describe('AutoCompleteInput Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <AutoCompleteInput
        startIcon={<Search data-testid="search-icon" />}
        placeholder="Search..."
        className="custom-class"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with default variant', () => {
    render(<AutoCompleteInput data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('border-input');
  });

  it('renders with square variant', () => {
    render(<AutoCompleteInput variant="square" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('rounded-[4px]');
  });

  it('handles focus and blur states', () => {
    render(
      <AutoCompleteInput
        startIcon={<Search data-testid="search-icon" />}
        data-testid="input"
      />,
    );

    const input = screen.getByTestId('input');
    const icon = screen.getByTestId('search-icon');

    fireEvent.focus(input);
    expect(icon.parentElement).toHaveClass('text-ring');

    fireEvent.blur(input);
    expect(icon.parentElement).toHaveClass('text-gray-900');
  });

  it('renders close button and handles close action', () => {
    const handleClose = jest.fn();
    render(<AutoCompleteInput onClose={handleClose} data-testid="input" />);

    const closeButton = screen.getByTestId('close-icon');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<AutoCompleteInput className="custom-class" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-class');
  });

  it('applies additional start icon class', () => {
    render(
      <AutoCompleteInput
        startIcon={<Search data-testid="search-icon" />}
        additionalStartIconClass="extra-icon-class"
      />,
    );

    const iconWrapper = screen.getByTestId('search-icon').parentElement;
    expect(iconWrapper).toHaveClass('extra-icon-class');
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    render(<AutoCompleteInput onChange={handleChange} data-testid="input" />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test');
  });
});
