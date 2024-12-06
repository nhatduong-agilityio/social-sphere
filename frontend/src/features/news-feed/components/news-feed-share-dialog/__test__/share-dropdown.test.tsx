import { render, screen, waitFor } from '@testing-library/react';
import { ShareDropdown } from '../share-dropdown';
import { SHARE_OPTIONS } from '../../../constants/share-news-feed';
import userEvent from '@testing-library/user-event';

describe('ShareDropdown', () => {
  const mockProps = {
    options: SHARE_OPTIONS,
    selectedOption: SHARE_OPTIONS[0],
    onSelectedOption: jest.fn(),
  };

  it('matches snapshot', () => {
    const { container } = render(<ShareDropdown {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders selected option', () => {
    render(<ShareDropdown {...mockProps} />);
    expect(screen.getByText(SHARE_OPTIONS[0].label)).toBeInTheDocument();
  });

  it('applies active styles when dropdown is open', async () => {
    const user = userEvent.setup();
    render(<ShareDropdown {...mockProps} />);

    // Open the dropdown menu
    const dropdownTrigger = screen.getByTestId('dropdown-trigger');
    await user.click(dropdownTrigger);

    // Wait for dropdown content to be visible and click accept
    const button = await screen.getAllByTestId('dropdown-item');
    await user.click(button[0]);

    await waitFor(() => {
      expect(dropdownTrigger).toHaveClass('bg-black-haze-50');
    });
  });
});
