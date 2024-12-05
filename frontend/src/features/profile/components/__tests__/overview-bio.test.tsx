import { act, fireEvent, render, waitFor } from '@testing-library/react';

// Components
import { OverviewBio } from '../overview-bio';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__';

// Models
import { UserModel } from '@/models';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
}));

describe('OverviewBio Component', () => {
  it('should render correctly', () => {
    const { container } = render(<OverviewBio user={MOCK_FRIENDS[0]} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly without user', () => {
    const { container } = render(<OverviewBio user={{} as UserModel} />);

    expect(container).toBeInTheDocument();
  });

  it('should hidden bio button', () => {
    const { getByTitle } = render(
      <OverviewBio user={MOCK_FRIENDS[0]} isDisabled />,
    );

    const locationButton = getByTitle('bio-button');

    expect(locationButton).toHaveClass('hidden');
  });

  it('handle submit bio', async () => {
    const { getByPlaceholderText, getByTitle, getByText } = render(
      <OverviewBio user={MOCK_FRIENDS[0]} />,
    );

    const bioInput = getByPlaceholderText('Enter your bio');
    const bioButton = getByTitle('bio-button');

    act(() => {
      fireEvent.change(bioInput, { target: { value: 'Whats up' } });
    });

    act(() => {
      fireEvent.click(bioButton);
    });

    await waitFor(() => {
      expect(getByText('Whats up')).toBeInTheDocument();
    });
  });
});
