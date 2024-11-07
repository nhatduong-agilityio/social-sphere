import { Pagination } from '@/types';
import { NewsFeedModel } from './news-feed';
import { UserModel } from './user-model';

export type ExitingLikeModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
  user: UserModel;
  post: NewsFeedModel;
};

export type ExitingLikeResponse = {
  data: ExitingLikeModel[];
  meta: { pagination: Pagination };
};
