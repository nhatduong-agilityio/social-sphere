'use client';

import { ReactNode } from 'react';

// Stores
import { useOnboardingStore } from '../stores/onboarding-steps';
import { ONBOARDING_STEPS } from '../constants/onboarding';

interface OnboardingContainerProps {
  selectAccountType: ReactNode;
  enterAboutInfo: ReactNode;
  uploadPictureProfile: ReactNode;
  secureAccount: ReactNode;
  confirmEmail: ReactNode;
}

export const OnboardingContainer = ({
  selectAccountType,
  enterAboutInfo,
  uploadPictureProfile,
  secureAccount,
  confirmEmail,
}: OnboardingContainerProps) => {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  return (
    <div className="container m-auto 2xl:max-w-[1088px]">
      {currentStep === ONBOARDING_STEPS[0].stepNumber && selectAccountType}
      {currentStep === ONBOARDING_STEPS[1].stepNumber && enterAboutInfo}
      {currentStep === ONBOARDING_STEPS[2].stepNumber && uploadPictureProfile}
      {currentStep === ONBOARDING_STEPS[3].stepNumber && secureAccount}
      {currentStep === ONBOARDING_STEPS[4].stepNumber && confirmEmail}
    </div>
  );
};
