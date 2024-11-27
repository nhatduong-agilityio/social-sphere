import { render } from '@testing-library/react';
import { OnboardingLayout } from '../onboarding-layout';

describe('OnboardingLayout Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <OnboardingLayout>
        <div>Children Components</div>
      </OnboardingLayout>,
    );
    expect(container).toMatchSnapshot();
  });
});
