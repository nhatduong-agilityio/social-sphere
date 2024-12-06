import { render, screen } from '@testing-library/react';
import { StoriesWidget } from '../stories-widget';
import { MOCK_FRIENDS } from '@/__mocks__/user';

describe('StoriesWidget', () => {
  const mockProps = {
    onAddStory: jest.fn(),
  };

  it('matches snapshot', () => {
    const { container } = render(<StoriesWidget {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders add story button', () => {
    render(<StoriesWidget {...mockProps} />);
    expect(screen.getByText('Add a new story')).toBeInTheDocument();
    expect(
      screen.getByText('Share an image, a video or some text'),
    ).toBeInTheDocument();
  });

  it('renders friends stories', () => {
    render(<StoriesWidget {...mockProps} />);

    const firstThreeFriends = MOCK_FRIENDS.slice(0, 3);
    firstThreeFriends.forEach((friend) => {
      const fullName = `${friend.firstName} ${friend.lastName}`;
      expect(screen.getByText(fullName)).toBeInTheDocument();
      if (friend.location?.city) {
        expect(screen.getByText(friend.location.city)).toBeInTheDocument();
      }
    });
  });
});
