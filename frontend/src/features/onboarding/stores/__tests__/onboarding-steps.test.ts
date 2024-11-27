import { act, renderHook } from '@testing-library/react';
import { useOnboardingStore } from '../onboarding-steps';
import { AUTH_INITIAL_STATE, ONBOARDING_STEPS } from '../../constants';
import { OnboardingAccountType } from '../../models';

const mockNewData = {
  accountType: OnboardingAccountType.PublicPerson,
  aboutInfo: {
    firstName: '',
    lastName: '',
    email: '',
  },
  profilePicture: '',
  accountSecure: {
    phoneNumber: '',
  },
};

describe('useOnboardingStore', () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  it('should initialize with the correct state', () => {
    const { result } = renderHook(() => useOnboardingStore());

    expect(result.current.currentStep).toBe(ONBOARDING_STEPS[0].stepNumber);
    expect(result.current.onboardingData).toEqual({
      ...AUTH_INITIAL_STATE,
    });
  });

  it('should update currentStep when setCurrentStep is called', () => {
    const { result } = renderHook(() => useOnboardingStore());

    const newStep = 2;
    act(() => {
      result.current.setCurrentStep(newStep);
    });

    expect(result.current.currentStep).toBe(newStep);
  });

  it('should update onboardingData when setOnboardingData is called', () => {
    const { result } = renderHook(() => useOnboardingStore());

    act(() => {
      result.current.setOnboardingData(mockNewData);
    });

    expect(result.current.onboardingData).toEqual(mockNewData);
  });

  it('should reset state when clearOnboardingData is called', () => {
    const { result } = renderHook(() => useOnboardingStore());

    act(() => {
      result.current.setOnboardingData(mockNewData);
      result.current.setCurrentStep(2);
    });

    act(() => {
      result.current.clearOnboardingData();
    });

    expect(result.current.currentStep).toBe(ONBOARDING_STEPS[0].stepNumber);
    expect(result.current.onboardingData).toEqual(AUTH_INITIAL_STATE);
  });

  it('should persist state to sessionStorage when state changes', () => {
    const { result } = renderHook(() => useOnboardingStore());

    act(() => {
      result.current.setCurrentStep(2);
    });

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'onboarding-steps',
      expect.any(String),
    );
  });
});
