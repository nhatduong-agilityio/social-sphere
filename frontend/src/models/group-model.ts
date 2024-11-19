import { NewsFeed, Pagination } from '@/types';
import { UserModel } from './user-model';

export type GroupModel = {
  id: number;
  createdAt: string;
  documentId: string;
  name: string;
  avatar: string;
  description: string;
  isPrivate: boolean;
  createdUser: UserModel;
  groupMembers: UserModel[];
  posts: NewsFeed[];
};

export type GroupPayload = {
  name: string;
  description?: string;
  avatar?: string;
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
