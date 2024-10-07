'use client';

import { OnboardingProgressBar } from '@/features/onboarding/components/onboarding-progress-bar';
import { useOnboardingStore } from '@/features/onboarding/stores/onboarding-steps';

const OnboardingPage = () => {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  return (
    <div className="w-full flex justify-center">
      <OnboardingProgressBar currentStep={currentStep} />
    </div>
  );
};

export default OnboardingPage;
