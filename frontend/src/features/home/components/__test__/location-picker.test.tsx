import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LocationPicker } from '../location-picker';
import { getLocations } from '../../actions';
import { useForm, FormProvider } from 'react-hook-form';
import { ComposeFeedFormValues } from '../../hooks';

jest.mock('../../actions', () => ({
  getLocations: jest.fn(),
}));

const MOCK_LOCATIONS = {
  features: [
    {
      place_name: 'New York, USA',
    },
    {
      place_name: 'New Orleans, USA',
    },
  ],
};

describe('LocationPicker', () => {
  const TestWrapper = () => {
    const methods = useForm<ComposeFeedFormValues>({
      defaultValues: {
        location: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <LocationPicker form={methods} onCloseLocationPicker={jest.fn()} />
      </FormProvider>
    );
  };

  beforeEach(() => {
    (getLocations as jest.Mock).mockResolvedValue({ data: MOCK_LOCATIONS });
  });

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('shows location suggestions after typing', async () => {
    render(<TestWrapper />);

    const input = screen.getByPlaceholderText('Enter a location');
    fireEvent.change(input, { target: { value: 'New' } });

    await waitFor(() => {
      MOCK_LOCATIONS.features.forEach((location) => {
        expect(screen.getByText(location.place_name)).toBeInTheDocument();
      });
    });
  });

  it('selects location when clicking suggestion', async () => {
    render(<TestWrapper />);

    const input = screen.getByPlaceholderText('Enter a location');
    fireEvent.change(input, { target: { value: 'New' } });

    await waitFor(() => {
      const firstSuggestion = screen.getByText(
        MOCK_LOCATIONS.features[0].place_name,
      );
      fireEvent.click(firstSuggestion);
    });
  });

  it('does not fetch locations for short queries', async () => {
    render(<TestWrapper />);

    const input = screen.getByPlaceholderText('Enter a location');
    fireEvent.change(input, { target: { value: 'Ne' } });

    await waitFor(() => {
      expect(getLocations).not.toHaveBeenCalled();
    });
  });

  it('clears location on close', () => {
    render(<TestWrapper />);

    const closeButton = screen.getByTestId('close-icon');
    fireEvent.click(closeButton);
  });
});
