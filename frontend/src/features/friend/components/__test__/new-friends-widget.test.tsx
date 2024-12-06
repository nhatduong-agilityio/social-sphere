import { render } from '@testing-library/react';
import { NewFriendsWidget } from '../new-friends-widget';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('NewFriendsWidget', () => {
  const mockFriends = [
    {
      id: 1,
      followed: MOCK_FRIENDS[0],
    },
  ];

  it('matches snapshot', async () => {
    const { container } = render(<NewFriendsWidget friends={mockFriends} />);
    expect(container).toMatchSnapshot();
  });
});
