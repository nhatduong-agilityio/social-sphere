import { memo } from 'react';

// Icons
import {
  FlagIcon,
  ImageIcon,
  LockIcon,
  SmileIcon,
  UserIcon,
} from 'lucide-react';

// Components
import { Circle } from '@/components/ui/circle';
import { Progress } from '@/components/ui/progress';

// Utils
import { cn } from '@/utils/cn';

interface OnboardingStep {
  label: string;
  description: string;
  icon: JSX.Element;
}

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps?: OnboardingStep[];
}

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    label: 'Select an account type',
    description: 'Select an account type to get started',
    icon: <SmileIcon size={16} />,
  },
  {
    label: 'About your info',
    description: 'About your info to get started',
    icon: <UserIcon size={16} />,
  },
  {
    label: 'Update image profile',
    description: 'Update image profile to get started',
    icon: <ImageIcon size={16} />,
  },
  {
    label: 'Secure your account',
    description: 'Secure your account to get started',
    icon: <LockIcon size={16} />,
  },
  {
    label: 'Completed',
    description: 'Completed to get started',
    icon: <FlagIcon size={16} />,
  },
];

export const OnboardingProgressBar = memo(
  ({ currentStep, totalSteps = DEFAULT_STEPS }: OnboardingProgressBarProps) => {
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
