import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Hooks
import { toast } from '@/hooks/use-toast';

// Stores
import { useOnboardingStore } from '../../stores';

// Components
import { EnterAboutInfo } from '../enter-about-info';

// Actions
import { checkEmailExists } from '../../actions';

jest.mock('../../stores', () => ({
  useOnboardingStore: jest.fn(),
}));

jest.mock('../../actions', () => ({
  checkEmailExists: jest.fn(),
}));

jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn(),
}));

describe('EnterAboutInfo Component', () => {
  const mockSetCurrentStep = jest.fn();
  const mockSetOnboardingData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboardingStore as unknown as jest.Mock).mockReturnValue([
      1,
      mockSetCurrentStep,
      { aboutInfo: { firstName: '', lastName: '', email: '' } },
      mockSetOnboardingData,
    ]);
  });

  it('renders the form fields correctly', () => {
    const { getByPlaceholderText, getByRole } = render(<EnterAboutInfo />);

    expect(getByPlaceholderText('Enter your first name')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your last name')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('calls handleBackButton when Back button is clicked', () => {
    const { getByRole } = render(<EnterAboutInfo />);

    const backButton = getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);

    expect(mockSetCurrentStep).toHaveBeenCalledWith(0);
  });

  it('displays an error toast if email already exists', async () => {
    (checkEmailExists as jest.Mock).mockResolvedValue(true);

    const { getByPlaceholderText, getByRole } = render(<EnterAboutInfo />);

    const emailInput = getByPlaceholderText('Enter your email');
    const firstNameInput = getByPlaceholderText('Enter your first name');
    const lastNameInput = getByPlaceholderText('Enter your last name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });

    const nextButton = getByRole('button', { name: 'Next' });
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(checkEmailExists).toHaveBeenCalledWith('existing@example.com');
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error messages:',
          description: expect.anything(),
        }),
      );
    });
  });

  it('proceeds to the next step and updates onboardingData if email is valid', async () => {
    (checkEmailExists as jest.Mock).mockResolvedValue(false);

    const { getByRole, getByPlaceholderText } = render(<EnterAboutInfo />);

    const firstNameInput = getByPlaceholderText('Enter your first name');
    const lastNameInput = getByPlaceholderText('Enter your last name');
    const emailInput = getByPlaceholderText('Enter your email');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const nextButton = getByRole('button', { name: 'Next' });
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(checkEmailExists).toHaveBeenCalledWith('john.doe@example.com');
      expect(mockSetOnboardingData).toHaveBeenCalledWith({
        aboutInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      });
      expect(mockSetCurrentStep).toHaveBeenCalledWith(2);
    });
  });

  it('disables the Next button if form is invalid', () => {
    render(<EnterAboutInfo />);

    const nextButton = screen.getByRole('button', { name: 'Next' });

    expect(nextButton).toBeDisabled();
  });

  it('enables the Next button if form is valid', async () => {
    const { getByRole, getByPlaceholderText } = render(<EnterAboutInfo />);

    const firstNameInput = getByPlaceholderText('Enter your first name');
    const lastNameInput = getByPlaceholderText('Enter your last name');
    const emailInput = getByPlaceholderText('Enter your email');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    await waitFor(() => {
      const nextButton = getByRole('button', { name: 'Next' });
      expect(nextButton).toBeEnabled();
    });
  });
});
