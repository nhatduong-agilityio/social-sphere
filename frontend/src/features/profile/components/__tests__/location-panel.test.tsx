import { render } from '@testing-library/react';
import { LocationPanel } from '../location-panel';

describe('LocationPanel Component', () => {
  it('should render correctly', () => {
    const { container } = render(<LocationPanel />);

    expect(container).toMatchSnapshot();
  });
});
