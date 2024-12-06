import { render } from '@testing-library/react';
import { PostListSkeleton } from '../post-list-skeleton';

describe('PostListSkeleton Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<PostListSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
