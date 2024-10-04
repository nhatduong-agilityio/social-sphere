import { OnboardingProgressBar } from '@/features/onboarding/components/onboarding-progress-bar';

const OnboardingPage = () => {
  return (
    <div className="w-full flex justify-center">
      <OnboardingProgressBar currentStep={3} />
    </div>
  );
};

export default OnboardingPage;
