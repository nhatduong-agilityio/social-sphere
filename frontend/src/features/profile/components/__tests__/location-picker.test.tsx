import { act, fireEvent, render, waitFor } from '@testing-library/react';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__';

// Models
import { UserModel } from '@/models';

// Components
import { LocationPicker } from '../location-picker';

// Actions
import { getLocations } from '@/features/home/actions';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
}));

jest.mock('@/features/home/actions', () => ({
  ...jest.requireActual('@/features/home/actions'),
  getLocations: jest.fn(() => ({
    data: {
      features: [
        { place_name: 'New York City', properties: { short_code: 'NY' } },
      ],
    },
  })),
}));

describe('LocationPicker component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<LocationPicker user={MOCK_FRIENDS[0]} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly without user', () => {
    const { container } = render(<LocationPicker user={{} as UserModel} />);

    expect(container).toBeInTheDocument();
  });

  it('handle submit location', async () => {
    const { getByPlaceholderText, getByTitle, getByText } = render(
      <LocationPicker user={MOCK_FRIENDS[0]} />,
    );

    const locationInput = getByPlaceholderText('Enter a location');
    const locationButton = getByTitle('location-button');

    act(() => {
      fireEvent.change(locationInput, { target: { value: 'New York' } });
    });

    await waitFor(() => {
      const locationOptions = getByText('New York City');

      expect(locationOptions).toBeInTheDocument();

      fireEvent.click(locationOptions);

      fireEvent.click(locationButton);

      expect(locationInput).toHaveValue('New York City');
    });
  });

  it('handle no data location', async () => {
    (getLocations as jest.Mock).mockResolvedValue({});

    const { getByPlaceholderText, getByTitle } = render(
      <LocationPicker user={MOCK_FRIENDS[0]} />,
    );

    const locationInput = getByPlaceholderText('Enter a location');
    const locationButton = getByTitle('location-button');

    act(() => {
      fireEvent.change(locationInput, { target: { value: 'Viet Nam' } });
    });

    fireEvent.click(locationButton);

    expect(locationInput).toHaveValue('Viet Nam');
  });

  it('should hidden location button', () => {
    const { getByTitle } = render(
      <LocationPicker user={MOCK_FRIENDS[0]} isDisabled />,
    );

    const locationButton = getByTitle('location-button');

    expect(locationButton).toHaveClass('hidden');
  });
});
