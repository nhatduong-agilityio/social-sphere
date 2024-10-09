import { memo, ReactNode } from 'react';

// Components
import { OnboardingHeader } from './onboarding-header';

interface OnboardingFormWrapperProps {
  title: string;
  children: ReactNode;
}

export const OnboardingFormWrapper = memo(
  ({ title, children }: OnboardingFormWrapperProps) => (
    <div className="w-full flex flex-col items-center gap-5">
      <OnboardingHeader title={title} />
      <div className="w-full max-w-[330px] md:max-w-[540px] animate-fade-in-left">
        {children}
      </div>
    </div>
  ),
);

OnboardingFormWrapper.displayName = 'OnboardingFormWrapper';
