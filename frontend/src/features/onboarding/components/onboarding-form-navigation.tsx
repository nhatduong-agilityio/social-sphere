import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface OnboardingFormNavigationProps {
  onBackClick: () => void;
}

export const OnboardingFormNavigation = memo(
  ({ onBackClick }: OnboardingFormNavigationProps) => (
    <div className="flex gap-2 justify-end">
      <Button onClick={onBackClick} variant="fixed" className="px-[22px]">
        Back
      </Button>
      <Button type="submit" variant="outline" className="px-[22px]">
        Next
      </Button>
    </div>
  ),
);

OnboardingFormNavigation.displayName = 'OnboardingFormNavigation';
