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
      {children}
    </div>
  ),
);

OnboardingFormWrapper.displayName = 'OnboardingFormWrapper';
