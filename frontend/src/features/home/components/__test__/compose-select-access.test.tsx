import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComposeSelectAccess } from '../compose-select-access';
import { useForm, FormProvider } from 'react-hook-form';
import { ComposeFeedFormValues } from '../../hooks';

describe('ComposeSelectAccess', () => {
  const TestWrapper = ({ isOpenFriendsList = false }) => {
    const methods = useForm<ComposeFeedFormValues>({
      defaultValues: {
        accessItems: [],
        activityRole: '',
        storyRole: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <ComposeSelectAccess
          isOpenFriendsList={isOpenFriendsList}
          form={methods}
        />
      </FormProvider>
    );
  };

  it('renders access items with checkboxes', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('allows selecting access items', async () => {
    render(<TestWrapper />);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];

      // Test deselection
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).toHaveAttribute('data-state', 'unchecked');
    });
  });
});
