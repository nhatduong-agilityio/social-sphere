import { render } from '@testing-library/react';

// Components
import { OverviewInputSkeleton } from '../overview-input-skeleton';

describe('OverviewInputSkeleton  Component', () => {
  it('should render correctly', () => {
    const { container } = render(<OverviewInputSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
