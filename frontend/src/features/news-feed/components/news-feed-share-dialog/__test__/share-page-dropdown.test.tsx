import { render, screen, waitFor } from '@testing-library/react';
import { SharePageDropdown } from '../share-page-dropdown';
import { useForm, FormProvider } from 'react-hook-form';
import { ShareFormValues } from '../../../hooks';
import { MOCK_PAGES } from '@/__mocks__';
import userEvent from '@testing-library/user-event';

describe('SharePageDropdown', () => {
  const mockPages = MOCK_PAGES;

  const TestWrapper = () => {
    const methods = useForm<ShareFormValues>({
      defaultValues: {
        page: mockPages[0].id,
      },
    });

    return (
      <FormProvider {...methods}>
        <SharePageDropdown form={methods} pages={mockPages} />
      </FormProvider>
    );
  };

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('applies active styles when dropdown is open', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    // Open the dropdown menu
    const dropdownTrigger = screen.getByTestId('dropdown-trigger');
    await user.click(dropdownTrigger);

    // Wait for dropdown content to be visible and click accept
    const button = await screen.getAllByTestId('dropdown-item');
    await user.click(button[0]);

    await waitFor(() => {
      expect(dropdownTrigger).toHaveClass('items-center');
    });
  });
});
