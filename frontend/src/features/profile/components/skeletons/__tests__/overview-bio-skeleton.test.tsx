import { render } from '@testing-library/react';

// Components
import { OverviewBioSkeleton } from '../overview-bio-skeleton';

describe('OverviewBioSkeleton Component', () => {
  it('should render correctly', () => {
    const { container } = render(<OverviewBioSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
