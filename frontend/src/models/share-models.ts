import { ShareTypeOption } from '@/types';

export type SharePayload = {
  postId: number;
  userId: number;
  content?: string;
  tagFriends?: string[];
  location?: string;
  activityRole?: string;
  friendsFeed?: number;
  group?: number;
  page?: number;
  friendsMessage?: number;
  shareType: ShareTypeOption;
};
