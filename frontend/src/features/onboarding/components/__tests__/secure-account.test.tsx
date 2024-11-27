import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Hooks
import { toast } from '@/hooks/use-toast';

// Stores
import { useOnboardingStore } from '../../stores';

// Components
import { SecureAccount } from '../secure-account';

// Actions
import { register } from '../../actions';

jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn(),
}));

jest.mock('../../stores', () => ({
  useOnboardingStore: jest.fn(),
}));

jest.mock('../../actions', () => ({
  register: jest.fn(),
}));

describe('SecureAccount Component', () => {
  const mockSetCurrentStep = jest.fn();
  const mockSetOnboardingData = jest.fn();

  const mockOnboardingData = {
    aboutInfo: {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    profilePicture: 'profile.jpg',
    accountType: 'user',
    accountSecure: {
      phoneNumber: '123456789',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboardingStore as unknown as jest.Mock).mockReturnValue([
      4,
      mockSetCurrentStep,
      mockOnboardingData,
      mockSetOnboardingData,
    ]);
  });

  it('renders the component with form fields', () => {
    const { getByPlaceholderText } = render(<SecureAccount />);

    expect(getByPlaceholderText('Choose a password')).toBeInTheDocument();
    expect(getByPlaceholderText('Repeat your password')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your phone number')).toBeInTheDocument();
  });

  it('validates the form and handles successful submission', async () => {
    (register as jest.Mock).mockResolvedValueOnce(null);

    const { getByPlaceholderText } = render(<SecureAccount />);

    fireEvent.change(getByPlaceholderText('Choose a password'), {
      target: { value: '1@Dzxcvb' },
    });
    fireEvent.change(getByPlaceholderText('Repeat your password'), {
      target: { value: '1@Dzxcvb' },
    });
    fireEvent.change(getByPlaceholderText('Enter your phone number'), {
      target: { value: '8423456789' },
    });

    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        username: mockOnboardingData.aboutInfo.email,
        firstName: mockOnboardingData.aboutInfo.firstName,
        lastName: mockOnboardingData.aboutInfo.lastName,
        email: mockOnboardingData.aboutInfo.email,
        password: '1@Dzxcvb',
        phoneNumber: '8423456789',
        profilePicture: mockOnboardingData.profilePicture,
        accountType: mockOnboardingData.accountType,
      });

      expect(mockSetOnboardingData).toHaveBeenCalledWith({
        ...mockOnboardingData,
        accountSecure: {
          phoneNumber: '8423456789',
        },
      });
      expect(mockSetCurrentStep).toHaveBeenCalled();
    });
  });

  it('shows an error message if registration fails', async () => {
    (register as jest.Mock).mockResolvedValueOnce({ error: 'Error message' });

    const { getByPlaceholderText, getByRole } = render(<SecureAccount />);

    fireEvent.change(getByPlaceholderText('Choose a password'), {
      target: { value: '1@Dzxcvb' },
    });
    fireEvent.change(getByPlaceholderText('Repeat your password'), {
      target: { value: '1@Dzxcvb' },
    });
    fireEvent.change(getByPlaceholderText('Enter your phone number'), {
      target: { value: '8423456789' },
    });

    const nextButton = getByRole('button', { name: 'Next' });
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(register).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith({
        title: 'Error messages:',
        description: expect.anything(),
      });
      expect(mockSetOnboardingData).not.toHaveBeenCalled();
      expect(mockSetCurrentStep).not.toHaveBeenCalled();
    });
  });

  it('navigates to the previous step when the back button is clicked', async () => {
    const { getByRole } = render(<SecureAccount />);

    const backButton = getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);

    expect(mockSetCurrentStep).toHaveBeenCalled();
  });
});
