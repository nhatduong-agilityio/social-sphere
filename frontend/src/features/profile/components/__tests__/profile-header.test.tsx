import { render } from '@testing-library/react';

// Components
import { ProfileHeader } from '../profile-header';

const useParamsMock = {
  username: 'admin@gmail.com',
};

const usePathnameMock = '/user-profile/admin@gmail.com/personal-info';

jest.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock,
  useParams: () => useParamsMock,
}));

describe('ProfileHeader Component', () => {
  it('should render correctly', () => {
    const { container } = render(<ProfileHeader username="admin@gmail.com" />);

    expect(container).toMatchSnapshot();
  });
});
