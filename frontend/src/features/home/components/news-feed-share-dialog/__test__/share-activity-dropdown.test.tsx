import { render, screen, waitFor } from '@testing-library/react';
import { ShareActivityDropdown } from '../share-activity-dropdown';
import { ACTIVITY_ROLES } from '@/features/home/constants';
import { useForm, FormProvider } from 'react-hook-form';
import { ShareFormValues } from '@/features/home/hooks';
import userEvent from '@testing-library/user-event';

describe('ShareActivityDropdown', () => {
  const TestWrapper = () => {
    const methods = useForm<ShareFormValues>({
      defaultValues: {
        activityRole: ACTIVITY_ROLES[0].value,
      },
    });

    const mockProps = {
      form: methods,
      trigger: <button>Trigger Button</button>,
    };

    return (
      <FormProvider {...methods}>
        <ShareActivityDropdown {...mockProps} />
      </FormProvider>
    );
  };

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('renders trigger element', () => {
    render(<TestWrapper />);
    expect(screen.getByText('Trigger Button')).toBeInTheDocument();
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
