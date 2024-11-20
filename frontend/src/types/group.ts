import { NewsFeed } from './news-feed';
import { Pagination } from './pagination';
import { UserDetail } from './user';

export type GroupMember = {
  id: number;
  documentId: string;
  role: 'admin' | 'member';
  user: UserDetail;
};

export type GroupDetail = {
  id: number;
  avatar?: string;
  createdAt?: string;
  documentId: string;
  banner?: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  author: UserDetail;
  members: GroupMember[];
  newsFeeds: NewsFeed[];
};

export type GroupsListResponse = {
  data: GroupDetail[];
  meta: { pagination: Pagination };
};

export type GroupMembersResponse = {
  data: GroupMember[];
  meta: { pagination: Pagination };
};
