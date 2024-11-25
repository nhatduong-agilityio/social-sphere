import { render } from '@testing-library/react';

// Components
import { ProfileNavTab } from '../profile-nav-tab';

const useParamsMock = {
  username: 'username',
};

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useParams: () => useParamsMock,
}));

describe('ProfileNavTab Component', () => {
  it('should render correctly', () => {
    const { container } = render(<ProfileNavTab />);

    expect(container).toMatchSnapshot();
  });
});
