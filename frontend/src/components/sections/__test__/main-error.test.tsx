import { render, screen, fireEvent } from '@testing-library/react';
import { MainError } from '../main-error';

describe('MainError Component', () => {
  const mockError = new Error('Test Error Message');
  const mockReset = jest.fn();

  it('displays the error message', () => {
    render(<MainError error={mockError} reset={mockReset} />);
    expect(screen.getByTestId('global-error-heading')).toHaveTextContent(
      'Test Error Message',
    );
  });

  it('calls reset function when try again button is clicked', () => {
    render(<MainError error={mockError} reset={mockReset} />);
    const resetButton = screen.getByTestId('global-error-button');

    fireEvent.click(resetButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MainError error={mockError} reset={mockReset} />,
    );
    expect(container).toMatchSnapshot();
  });
});
