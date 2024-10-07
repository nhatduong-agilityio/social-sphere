import { memo } from 'react';

// Constants
import { ONBOARDING_STEPS } from '../constants/onboarding';

// Components
import { Circle } from '@/components/ui/circle';
import { Progress } from '@/components/ui/progress';

// Utils
import { cn } from '@/utils/cn';

// Models
import { OnboardingStep } from '../models/onboarding';

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps?: OnboardingStep[];
}

export const OnboardingProgressBar = memo(
  ({
    currentStep,
    totalSteps = ONBOARDING_STEPS,
  }: OnboardingProgressBarProps) => {
    const progressIncrement = 100 / (totalSteps.length - 1);
    const progress = Math.min((currentStep - 1) * progressIncrement, 100);

    return (
      <div className="w-full relative py-5 max-w-[320px] md:max-w-[520px]">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
          <Progress value={progress} variant="secondary" size="md" />
        </div>
        <div className="relative flex w-full justify-between">
          {totalSteps.map(({ icon, label }, index) => (
            <Circle
              key={label}
              size="lg"
              variant="primary"
              className={cn(
                'text-icon-secondary',
                index < currentStep &&
                  'border-sphere-30 text-sphere-30 shadow-sphere-secondary transition-all duration-300 ease-in-out',
                index === currentStep - 1 &&
                  'border-sphere-50 text-sphere-50 shadow-sphere-primary transition-all duration-300 ease-in-out',
              )}
            >
              {icon}
            </Circle>
          ))}
        </div>
      </div>
    );
  },
);

OnboardingProgressBar.displayName = 'OnboardingProgressBar';
