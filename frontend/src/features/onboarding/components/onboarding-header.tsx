import { memo } from 'react';

// Components
import { Heading } from '@/components/ui/heading';

interface OnboardingHeaderProps {
  title: string;
}

export const OnboardingHeader = memo(({ title }: OnboardingHeaderProps) => (
  <Heading headingLevel="h2" className="animate-fade-in-up">
    {title}
  </Heading>
));

OnboardingHeader.displayName = 'OnboardingHeader';
