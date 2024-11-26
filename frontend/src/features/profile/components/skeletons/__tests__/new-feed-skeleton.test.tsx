import { render } from '@testing-library/react';

// Components
import { NewFeedSkeleton } from '../new-feed-skeleton';

describe('NewFeedSkeleton Component', () => {
  it('should render correctly', () => {
    const { container } = render(<NewFeedSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
