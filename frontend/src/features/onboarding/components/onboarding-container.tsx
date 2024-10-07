import { ReactNode } from 'react';

export const OnboardingContainer = ({ children }: { children: ReactNode }) => (
  <div className="container m-auto 2xl:max-w-[1088px]">{children}</div>
);
