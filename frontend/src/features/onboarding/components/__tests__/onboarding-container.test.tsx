import { render, screen } from '@testing-library/react';

// Stores
import { useOnboardingStore } from '../../stores';

// Constants
import { ONBOARDING_STEPS } from '../../constants';

// Components
import { OnboardingContainer } from '../onboarding-container';

const mockSteps = {
  selectAccountType: (
    <div data-testid="select-account-type">Select Account Type</div>
  ),
  enterAboutInfo: <div data-testid="enter-about-info">Enter About Info</div>,
  uploadPictureProfile: (
    <div data-testid="upload-picture-profile">Upload Picture Profile</div>
  ),
  secureAccount: <div data-testid="secure-account">Secure Account</div>,
  confirmEmail: <div data-testid="confirm-email">Confirm Email</div>,
};

jest.mock('../../stores', () => ({
  useOnboardingStore: jest.fn(),
}));

describe('OnboardingContainer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct step based on the currentStep from the store', () => {
    (useOnboardingStore as unknown as jest.Mock).mockReturnValue(
      ONBOARDING_STEPS[0].stepNumber,
    );

    const { rerender } = render(<OnboardingContainer {...mockSteps} />);

    expect(screen.getByTestId('select-account-type')).toBeInTheDocument();
    expect(screen.queryByTestId('enter-about-info')).not.toBeInTheDocument();

    (useOnboardingStore as unknown as jest.Mock).mockReturnValue(
      ONBOARDING_STEPS[1].stepNumber,
    );
    rerender(<OnboardingContainer {...mockSteps} />);
    expect(screen.getByTestId('enter-about-info')).toBeInTheDocument();
    expect(screen.queryByTestId('select-account-type')).not.toBeInTheDocument();

    (useOnboardingStore as unknown as jest.Mock).mockReturnValue(
      ONBOARDING_STEPS[2].stepNumber,
    );
    rerender(<OnboardingContainer {...mockSteps} />);
    expect(screen.getByTestId('upload-picture-profile')).toBeInTheDocument();

    (useOnboardingStore as unknown as jest.Mock).mockReturnValue(
      ONBOARDING_STEPS[3].stepNumber,
    );
    rerender(<OnboardingContainer {...mockSteps} />);
    expect(screen.getByTestId('secure-account')).toBeInTheDocument();

    (useOnboardingStore as unknown as jest.Mock).mockReturnValue(
      ONBOARDING_STEPS[4].stepNumber,
    );
    rerender(<OnboardingContainer {...mockSteps} />);
    expect(screen.getByTestId('confirm-email')).toBeInTheDocument();
  });

  it('renders nothing if the currentStep does not match any defined step', () => {
    (useOnboardingStore as unknown as jest.Mock).mockReturnValue(99);

    render(<OnboardingContainer {...mockSteps} />);

    expect(screen.queryByTestId('select-account-type')).not.toBeInTheDocument();
    expect(screen.queryByTestId('enter-about-info')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('upload-picture-profile'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('secure-account')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-email')).not.toBeInTheDocument();
  });
});
