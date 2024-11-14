import { Pagination } from '@/types';
import { UserModel } from './user-model';
import { LikeModel } from './likes-models';

export type CommentPayload = {
  content: string;
  tagFriends?: string[];
  media?: string;
  friend: number;
  post: number;
};

export type CommentModel = {
  id: number;
  content: string;
  media?: string;
  tagFriends?: string[];
  friend: UserModel;
  createdAt: string;
  updatedAt: string;
  likes: LikeModel[];
};

export type ListCommentsResponse = {
  data: CommentModel[];
  meta: { pagination: Pagination };
};
