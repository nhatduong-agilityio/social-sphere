import { memo } from 'react';
import { Button } from '@/components/ui';

interface OnboardingFormNavigationProps {
  isDisabled?: boolean;
  onBackClick: () => void;
}

export const OnboardingFormNavigation = memo(
  ({ isDisabled = false, onBackClick }: OnboardingFormNavigationProps) => (
    <div className="flex gap-2 justify-end">
      <Button onClick={onBackClick} variant="fixed" className="px-[22px]">
        Back
      </Button>
      <Button
        type="submit"
        variant="outline"
        disabled={isDisabled}
        className="px-[22px]"
      >
        Next
      </Button>
    </div>
  ),
);

OnboardingFormNavigation.displayName = 'OnboardingFormNavigation';
