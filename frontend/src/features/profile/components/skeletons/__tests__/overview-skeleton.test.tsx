import { render } from '@testing-library/react';

// Components
import { OverviewSkeleton } from '../overview-skeleton';

describe('OverviewSkeleton Component', () => {
  it('should render correctly', () => {
    const { container } = render(<OverviewSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
