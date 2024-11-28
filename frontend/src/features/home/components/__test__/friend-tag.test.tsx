import { render } from '@testing-library/react';
import { FriendTag } from '../friend-tag';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('FriendTag', () => {
  const mockFriend = MOCK_FRIENDS[0];

  it('matches snapshot', () => {
    const { container } = render(
      <FriendTag friend={mockFriend} onRemove={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
