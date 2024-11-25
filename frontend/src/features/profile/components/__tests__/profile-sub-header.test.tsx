import { render } from '@testing-library/react';

// Components
import { ProfileSubHeader } from '../profile-sub-header';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__/user';

describe('ProfileSubHeader Component', () => {
  it('should render correctly', () => {
    const { container } = render(<ProfileSubHeader user={MOCK_FRIENDS[0]} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly without user', () => {
    const { container } = render(<ProfileSubHeader />);

    expect(container).toBeInTheDocument();
  });
});
