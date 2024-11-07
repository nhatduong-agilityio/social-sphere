import { Pagination } from '@/types';
import { UserModel } from './user-model';

export type NewsFeedModel = {
  id: number;
  content: string;
  media?: string;
  author: string;
  gifUrl?: string;
  tagFriends?: string[];
  mood?: {
    title: string;
    content: string;
  };
  sharedLink?: string;
  location?: string;
  accessItems?: string[];
  activityRole?: string;
  storyRole?: string;
  sendFriends?: string[];
};

export type NewsFeedPayload = Omit<NewsFeedModel, 'id'>;

export type NewsFeedListModel = Omit<NewsFeedModel, 'author'> & {
  author: UserModel;
  createdAt: string;
  likes: {
    id: number;
    createdAt: string;
    documentId: string;
    user: UserModel;
  }[];
};

export type NewsFeedListResponse = {
  data: NewsFeedListModel[];
  meta: { pagination: Pagination };
};
