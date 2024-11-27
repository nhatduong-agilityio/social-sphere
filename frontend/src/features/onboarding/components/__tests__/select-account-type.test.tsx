import { render, fireEvent } from '@testing-library/react';

// Stores
import { useOnboardingStore } from '../../stores';

// Components
import { SelectAccountType } from '../select-account-type';

// Constants
import { SELECT_ACCOUNT_TYPES } from '../../constants';

jest.mock('../../stores', () => ({
  useOnboardingStore: jest.fn(),
}));

describe('SelectAccountType Component', () => {
  const mockSetCurrentStep = jest.fn();
  const mockSetOnboardingData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboardingStore as unknown as jest.Mock).mockReturnValue([
      1,
      mockSetCurrentStep,
      { accountType: null },
      mockSetOnboardingData,
    ]);
  });

  it('renders all account types', () => {
    const { getByText } = render(<SelectAccountType />);

    SELECT_ACCOUNT_TYPES.forEach(({ title, description }) => {
      expect(getByText(title)).toBeInTheDocument();
      expect(getByText(description)).toBeInTheDocument();
    });
  });

  it('calls setCurrentStep and setOnboardingData when clicking "Continue"', () => {
    const { getAllByText } = render(<SelectAccountType />);

    const continueButton = getAllByText('Continue', { selector: 'button' })[0];
    fireEvent.click(continueButton);

    expect(mockSetCurrentStep).toHaveBeenCalledWith(2);
    expect(mockSetOnboardingData).toHaveBeenCalledWith({
      accountType: 'Company',
    });
  });

  it('renders images for account types', () => {
    const { getByAltText } = render(<SelectAccountType />);

    SELECT_ACCOUNT_TYPES.forEach(({ mainSrc, title }) => {
      const image = getByAltText(title);
      expect(image).toHaveAttribute('src', mainSrc);
    });
  });

  it('renders the header with the correct title', () => {
    const { getByText } = render(<SelectAccountType />);
    expect(getByText('Welcome, select an account type.')).toBeInTheDocument();
  });
});
