import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

// Models
import { OnboardingStepData } from '../models';

// Constants
import { AUTH_INITIAL_STATE, ONBOARDING_STEPS } from '../constants';

export type OnboardingState = {
  currentStep: number;
  onboardingData: OnboardingStepData;
};

export type OnboardingActions = {
  setCurrentStep: (step: number) => void;
  setOnboardingData: (data: OnboardingStepData) => void;
  clearOnboardingData: () => void;
};

export type OnboardingStore = OnboardingState & OnboardingActions;

export const onboardingInitState: OnboardingState = {
  currentStep: ONBOARDING_STEPS[0].stepNumber,
  onboardingData: AUTH_INITIAL_STATE,
};

export const useOnboardingStore = createWithEqualityFn<OnboardingStore>()(
  persist(
    (set) => ({
      ...onboardingInitState,
      setCurrentStep: (step) => {
        set((state) => ({
          ...state,
          currentStep: step,
        }));
      },
      setOnboardingData: (data) => {
        set((state) => ({
          ...state,
          onboardingData: data,
        }));
      },
      clearOnboardingData: () => {
        set({
          ...onboardingInitState,
        });
      },
    }),
    {
      name: 'onboarding-steps',
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
  shallow,
);
