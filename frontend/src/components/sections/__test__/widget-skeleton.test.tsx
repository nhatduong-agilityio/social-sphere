import { render } from '@testing-library/react';
import { WidgetSkeleton } from '../widget-skeleton';

describe('WidgetSkeleton Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<WidgetSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
