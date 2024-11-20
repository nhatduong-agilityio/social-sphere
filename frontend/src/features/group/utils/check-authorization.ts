import { GroupMember } from '@/types';

export const isGroupAdmin = (
  members: GroupMember[],
  authorId: string,
): boolean =>
  members.some(
    (member) => String(member.user.id) === authorId && member.role === 'admin',
  );

export const getGroupAdmins = (members: GroupMember[]): GroupMember[] =>
  members.filter((member) => member.role === 'admin');
