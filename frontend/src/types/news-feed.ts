import { Pagination } from './pagination';
import { UserDetail } from './user';

export type NewsFeedFriendIds = string[];

export type NewsFeedComment = {
  id: string;
  friendId: string;
  content: string;
  media?: string;
  tagFriends?: NewsFeedFriendIds;
  gifUrl?: string;
  createDate: string;
  likes?: NewsFeedFriendIds;
  reply?: NewsFeedComment[];
};

export type NewsFeedCommentList = {
  data: NewsFeedComment[];
  meta: { pagination: Pagination };
};

export type NewsFeedShare = {
  id: string;
  friendId: string;
  createDate: string;
};

export type NewsFeedLike = {
  likesTotal: number;
  remainingLikes?: number;
  likesRecent: {
    friend: UserDetail;
    createDate: string;
  }[];
};

export type NewsFeed = {
  id: string;
  user: UserDetail;
  content: string;
  createdDate: string;
  likes?: NewsFeedLike;
  comments?: NewsFeedCommentList;
  shares?: NewsFeedShare[];
  media?: string;
  accessItems?: string[];
  activityRole?: string;
  storyRole?: string;
  gifUrl?: string;
  tagFriends?: UserDetail[];
  mood?: {
    title: string;
    content: string;
  };
  sharedLink?: string;
  location?: string;
  sendFriends?: NewsFeedFriendIds;
  isLiked?: boolean;
};
