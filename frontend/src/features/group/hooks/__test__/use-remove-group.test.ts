import { renderHook, act } from '@testing-library/react';
import { useRemoveGroup } from '../use-remove-group';
import { removeGroupById } from '../../actions';

jest.mock('../../actions', () => ({
  removeGroupById: jest.fn(),
}));

describe('useRemoveGroup', () => {
  const mockParams = {
    groupId: '1',
    groupName: 'test-group',
    userId: '456',
    page: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle removing group', async () => {
    (removeGroupById as jest.Mock).mockResolvedValue({});
    const { result } = renderHook(() => useRemoveGroup());

    await act(async () => {
      result.current.mutateRemoveGroup(mockParams);
    });

    expect(removeGroupById).toHaveBeenCalledWith(mockParams);
  });
});
