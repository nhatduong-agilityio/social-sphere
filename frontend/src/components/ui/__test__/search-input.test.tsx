import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../search-input';

describe('SearchInput Component', () => {
  it('renders with default variant', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveClass(
      'transition-all duration-300 ease-in-out focus:border-ring',
    );
  });

  it('renders with primary variant', () => {
    render(<SearchInput variant="primary" />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveClass('border-gray-200 bg-gray-200');
  });

  it('handles focus and blur states', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search...');
    const searchIcon = screen.getByTestId('search-icon-wrapper');

    fireEvent.focus(input);
    expect(searchIcon).toHaveClass('text-ring');

    fireEvent.blur(input);
    expect(searchIcon).toHaveClass('text-gray-900');
  });

  it('handles focus and blur states with primary variant', () => {
    render(<SearchInput variant="primary" />);
    const input = screen.getByPlaceholderText('Search...');
    const searchIcon = screen.getByTestId('search-icon-wrapper');

    fireEvent.focus(input);
    expect(searchIcon).toHaveClass('text-neutral-200 dark:text-primary');

    fireEvent.blur(input);
    expect(searchIcon).toHaveClass('text-gray-900');
  });

  it('renders close button when onClose prop is provided', () => {
    const handleClose = jest.fn();
    render(<SearchInput onClose={handleClose} />);

    const closeButton = screen.getByTestId('close-icon');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<SearchInput className="custom-class" />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<SearchInput ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test');
  });
});
