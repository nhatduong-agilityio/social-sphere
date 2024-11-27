import { render } from '@testing-library/react';
import { ProfileLayout } from '../profile-layout';
import { getProfile } from '@/features/profile/actions';
import { ProfileHeader, ProfileSubHeader } from '@/features/profile/components';

jest.mock('@/features/profile/actions');
jest.mock('@/features/profile/components', () => ({
  ProfileHeader: jest.fn(() => <div data-testid="profile-header" />),
  ProfileSubHeader: jest.fn(() => <div data-testid="profile-subheader" />),
}));

describe('ProfileLayout', () => {
  const mockUsername = 'testuser';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render profile layout with all components when profile exists', async () => {
    const mockProfile = {
      username: 'testuser',
      profilePicture: 'profile.jpg',
      banner: 'banner.jpg',
    };

    (getProfile as jest.Mock).mockResolvedValue(mockProfile);

    const container = await ProfileLayout({
      username: mockUsername,
      children: <div data-testid="child-content">Test Content</div>,
    });
    const { getByTestId } = render(container);

    expect(getProfile).toHaveBeenCalledWith(mockUsername);
    expect(getByTestId('profile-header')).toBeInTheDocument();
    expect(getByTestId('profile-subheader')).toBeInTheDocument();
    expect(getByTestId('child-content')).toBeInTheDocument();
  });

  it('should pass correct props to ProfileHeader', async () => {
    const mockProfile = {
      username: 'testuser',
      profilePicture: 'profile.jpg',
      banner: 'banner.jpg',
    };

    (getProfile as jest.Mock).mockResolvedValue(mockProfile);

    const container = await ProfileLayout({
      username: mockUsername,
      children: <div>Test Content</div>,
    });
    render(container);

    expect(ProfileHeader).toHaveBeenCalledWith(
      {
        username: mockUsername,
        imageUrl: mockProfile.profilePicture,
        bannerUrl: mockProfile.banner,
      },
      expect.any(Object),
    );
  });

  it('should pass profile data to ProfileSubHeader', async () => {
    const mockProfile = {
      username: 'testuser',
      profilePicture: 'profile.jpg',
      banner: 'banner.jpg',
    };

    (getProfile as jest.Mock).mockResolvedValue(mockProfile);

    const container = await ProfileLayout({
      username: mockUsername,
      children: <div>Test Content</div>,
    });
    render(container);

    expect(ProfileSubHeader).toHaveBeenCalledWith(
      {
        user: mockProfile,
      },
      expect.any(Object),
    );
  });
});
