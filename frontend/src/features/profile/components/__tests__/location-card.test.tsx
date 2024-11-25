import { render } from '@testing-library/react';

// Components
import { LocationCard } from '../location-card';

describe('LocationCard Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <LocationCard
        title="Test Place"
        src="https://example.com/test-place.jpg"
        alt="Test Place"
        rating={4.5}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
