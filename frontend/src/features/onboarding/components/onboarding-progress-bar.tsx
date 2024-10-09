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
                'text-gray-900 dark:text-neutral-100',
                index < currentStep &&
                  'border-primary dark:border-primary text-primary dark:text-primary shadow-sphere-secondary transition-all duration-300 ease-in-out',
                index === currentStep - 1 &&
                  'border-blue-600 dark:border-blue-600 text-blue-600 dark:text-blue-600 shadow-sphere-primary transition-all duration-300 ease-in-out',
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
