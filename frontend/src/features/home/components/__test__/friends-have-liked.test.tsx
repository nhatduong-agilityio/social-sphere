import { render } from '@testing-library/react';
import { FriendsHaveLiked } from '../friends-have-liked';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('FriendsHaveLiked', () => {
  const mockNewsFeedLikes = {
    likesTotal: 3,
    remainingLikes: 1,
    likesRecent: [
      {
        friend: MOCK_FRIENDS[0],
        createdAt: 'createdAt',
      },
      {
        friend: MOCK_FRIENDS[1],
        createdAt: 'createdAt',
      },
    ],
  };

  it('matches snapshot with multiple likes', () => {
    const { container } = render(
      <FriendsHaveLiked newsFeedLikes={mockNewsFeedLikes} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with single like', () => {
    const singleLike = {
      ...mockNewsFeedLikes,
      likesTotal: 1,
      remainingLikes: 0,
      likesRecent: [mockNewsFeedLikes.likesRecent[0]],
    };
    const { container } = render(
      <FriendsHaveLiked newsFeedLikes={singleLike} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with no likes', () => {
    const noLikes = {
      likesTotal: 0,
      remainingLikes: 0,
      likesRecent: [],
    };
    const { container } = render(<FriendsHaveLiked newsFeedLikes={noLikes} />);
    expect(container).toMatchSnapshot();
  });
});
