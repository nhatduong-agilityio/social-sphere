import { render } from '@testing-library/react';

// Components
import { OnboardingProgressBar } from '../onboarding-progress-bar';

describe('OnboardingProgressBar Component', () => {
  it('renders the correct number of steps', () => {
    const { container } = render(<OnboardingProgressBar currentStep={1} />);

    expect(container).toMatchSnapshot();
  });
});
