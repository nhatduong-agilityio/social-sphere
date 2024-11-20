import { NewsFeed } from './news-feed';
import { Pagination } from './pagination';
import { UserDetail } from './user';

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
  members: UserDetail[];
  newsFeeds: NewsFeed[];
};

export type GroupsListResponse = {
  data: GroupDetail[];
  meta: { pagination: Pagination };
};
