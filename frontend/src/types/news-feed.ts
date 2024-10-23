import { UserDetail } from './user';

export type NewsFeed = {
  id: string;
  user: UserDetail;
  content: string;
  createdDate: string;
};
