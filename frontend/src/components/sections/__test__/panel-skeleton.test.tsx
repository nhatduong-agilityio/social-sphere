import { render } from '@testing-library/react';
import { PanelSkeleton } from '../panel-skeleton';

describe('PanelSkeleton Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<PanelSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
