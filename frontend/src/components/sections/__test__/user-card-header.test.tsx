import { render, screen } from '@testing-library/react';
import { UserCardHeader } from '../user-card-header';
import { MOCK_FRIENDS } from '@/__mocks__';
import { NEWS_FEED_COMMENT_MORE_OPTIONS } from '@/features/news-feed/constants';

describe('UserCardHeader Component', () => {
  const mockUser = MOCK_FRIENDS[0];

  const mockOptions = NEWS_FEED_COMMENT_MORE_OPTIONS;

  const defaultProps = {
    user: mockUser,
    title: 'User Profile',
    description: 'Profile details',
    moreOptions: mockOptions,
  };

  it('renders title and description', () => {
    render(<UserCardHeader {...defaultProps} />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Profile details')).toBeInTheDocument();
  });

  it('applies md variant styles', () => {
    render(<UserCardHeader {...defaultProps} variant="md" />);
    expect(screen.getByText('User Profile')).toHaveClass('text-xs');
  });

  it('matches snapshot', () => {
    const { container } = render(<UserCardHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
