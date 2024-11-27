import { getTaggedFriends } from '../get-tagged-friends';
import { getFriends } from '../get-friends';
import { MOCK_FRIENDS } from '@/__mocks__/user';

jest.mock('../get-friends');

describe('getTaggedFriends', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return filtered friends by ids', async () => {
    const friendIds = [MOCK_FRIENDS[0].id.toString()];
    (getFriends as jest.Mock).mockResolvedValue({ data: MOCK_FRIENDS });

    const result = await getTaggedFriends(friendIds);

    expect(getFriends).toHaveBeenCalled();
    expect(result).toEqual([
      expect.objectContaining({ id: parseInt(friendIds[0]) }),
    ]);
  });

  it('should return empty array when no friends data available', async () => {
    (getFriends as jest.Mock).mockResolvedValue({ data: null });

    const result = await getTaggedFriends(['1']);

    expect(result).toEqual([]);
  });

  it('should return empty array when no matching ids found', async () => {
    (getFriends as jest.Mock).mockResolvedValue({ data: MOCK_FRIENDS });

    const result = await getTaggedFriends(['999']);

    expect(result).toEqual([]);
  });
});
