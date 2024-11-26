import { render, screen } from '@testing-library/react';
import { UserContentPopover } from '../user-content-popover';
import { MOCK_FRIENDS } from '@/__mocks__';
import { ROUTER } from '@/constants';

describe('UserContentPopover Component', () => {
  const mockUser = MOCK_FRIENDS[0];

  it('renders banner image correctly', () => {
    render(<UserContentPopover user={mockUser} />);
    const banner = screen.getByTestId('banner-image');
    expect(banner).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fbanners%2Fprofile-banner.webp&w=3840&q=100',
    );
  });

  it('renders user avatar correctly', () => {
    render(<UserContentPopover user={mockUser} />);
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('links to correct profile page', () => {
    render(<UserContentPopover user={mockUser} />);
    const profileLink = screen.getByTestId('profile-link');
    expect(profileLink).toHaveAttribute(
      'href',
      ROUTER.PROFILE_ID_PERSONAL_INFO('johndoe'),
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<UserContentPopover user={mockUser} />);
    expect(container).toMatchSnapshot();
  });
});
