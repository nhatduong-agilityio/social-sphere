import { NewsFeed, Pagination } from '@/types';
import { UserModel } from './user-model';

export type GroupMemberModel = {
  id: number;
  documentId: string;
  role: 'admin' | 'member';
  user: UserModel;
};

export type GroupModel = {
  id: number;
  createdAt: string;
  documentId: string;
  name: string;
  avatar: string;
  banner: string;
  description: string;
  isPrivate: boolean;
  createdUser: UserModel;
  groupMembers: GroupMemberModel[];
  posts: NewsFeed[];
};

export type GroupPayload = {
  name: string;
  description?: string;
  avatar?: string;
  banner?: string;
  isPrivate: boolean;
  createdUser: number;
};

export type GroupsResponse = {
  data: GroupModel[];
  meta: {
    pagination: Pagination;
  };
};

export type GroupDetailResponse = {
  data: GroupModel;
  meta: {
    pagination: Pagination;
  };
};
