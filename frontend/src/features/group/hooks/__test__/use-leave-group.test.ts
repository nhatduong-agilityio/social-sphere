import { renderHook, act } from '@testing-library/react';
import { useLeaveGroup } from '../use-leave-group';
import { leaveGroupById } from '../../actions';
import React from 'react';

jest.mock('../../actions', () => ({
  leaveGroupById: jest.fn(),
}));

describe('useLeaveGroup', () => {
  const mockParams = {
    groupId: '1',
    groupMemberId: '123',
    userId: '456',
    page: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle leaving group', async () => {
    (leaveGroupById as jest.Mock).mockResolvedValue({});
    const { result } = renderHook(() => useLeaveGroup());

    await act(async () => {
      result.current.mutateLeaveGroup(mockParams);
    });

    expect(leaveGroupById).toHaveBeenCalledWith(mockParams);
  });

  it('should track pending state during leave operation', () => {
    jest
      .spyOn(React, 'useTransition')
      .mockImplementation(() => [true, jest.fn()]);

    const { result } = renderHook(() => useLeaveGroup());

    expect(result.current.isPending).toBe(true);
  });
});
