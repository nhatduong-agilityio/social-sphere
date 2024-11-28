import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShareLocationPicker } from '../share-location-picker';
import { useForm, FormProvider } from 'react-hook-form';
import { ShareFormValues } from '@/features/home/hooks';
import { getLocations } from '@/features/home/actions';

jest.mock('@/features/home/actions', () => ({
  getLocations: jest.fn(),
}));

const MOCK_LOCATIONS = {
  data: {
    features: [{ place_name: 'New York, USA' }, { place_name: 'London, UK' }],
  },
};

describe('ShareLocationPicker', () => {
  const TestWrapper = () => {
    const methods = useForm<ShareFormValues>({
      defaultValues: {
        location: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <ShareLocationPicker form={methods} onCloseLocationPicker={jest.fn()} />
      </FormProvider>
    );
  };

  beforeEach(() => {
    (getLocations as jest.Mock).mockResolvedValue(MOCK_LOCATIONS);
  });

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('renders location input with correct label', () => {
    render(<TestWrapper />);
    expect(screen.getByText('Location :')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Where are you?')).toBeInTheDocument();
  });

  it('fetches and displays location suggestions', async () => {
    render(<TestWrapper />);
    const input = screen.getByPlaceholderText('Where are you?');
    fireEvent.change(input, { target: { value: 'New' } });

    await waitFor(() => {
      expect(getLocations).toHaveBeenCalledWith('New');
      expect(screen.getByText('New York, USA')).toBeInTheDocument();
      expect(screen.getByText('London, UK')).toBeInTheDocument();
    });
  });

  it('selects location when suggestion is clicked', async () => {
    render(<TestWrapper />);
    const input = screen.getByPlaceholderText('Where are you?');
    fireEvent.change(input, { target: { value: 'New' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('New York, USA'));
      expect(input).toHaveValue('New York, USA');
    });
  });
});
