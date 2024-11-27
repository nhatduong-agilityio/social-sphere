import { GroupMember } from '@/types';
import { isGroupAdmin, getGroupAdmins } from '../check-authorization';

describe('Group Authorization Utils', () => {
  const mockMembers = [
    { user: { id: 1 }, role: 'admin' },
    { user: { id: 2 }, role: 'member' },
    { user: { id: 3 }, role: 'admin' },
    { user: { id: 4 }, role: 'member' },
  ] as GroupMember[];

  describe('isGroupAdmin', () => {
    it('should return true when user is admin', () => {
      const result = isGroupAdmin(mockMembers, '1');
      expect(result).toBe(true);
    });

    it('should return false when user is not admin', () => {
      const result = isGroupAdmin(mockMembers, '2');
      expect(result).toBe(false);
    });

    it('should return false when user is not in group', () => {
      const result = isGroupAdmin(mockMembers, '5');
      expect(result).toBe(false);
    });
  });

  describe('getGroupAdmins', () => {
    it('should return all admin members', () => {
      const admins = getGroupAdmins(mockMembers);
      expect(admins).toHaveLength(2);
      expect(admins).toEqual([
        { user: { id: 1 }, role: 'admin' },
        { user: { id: 3 }, role: 'admin' },
      ]);
    });

    it('should return empty array when no admins exist', () => {
      const membersWithoutAdmin = [
        { user: { id: 1 }, role: 'member' },
        { user: { id: 2 }, role: 'member' },
      ] as GroupMember[];
      const admins = getGroupAdmins(membersWithoutAdmin);
      expect(admins).toHaveLength(0);
    });
  });
});
