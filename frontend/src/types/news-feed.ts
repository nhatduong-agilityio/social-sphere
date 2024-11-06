import { Pagination } from './pagination';
import { UserDetail } from './user';

export type NewsFeedComment = {
  id: string;
  friend: UserDetail;
  content: string;
  media?: string;
  tagFriends?: UserDetail[];
  gifUrl?: string;
  createdAt: string;
  likes?: UserDetail[];
  reply?: NewsFeedComment[];
  isOwner?: boolean;
};

export type NewsFeedCommentPagination = {
  data: {
    comments: NewsFeedComment[];
    totalComments: number;
  };
  meta: { pagination: Pagination };
};

export type NewsFeedShare = {
  id: string;
  friend: UserDetail;
  createdAt: string;
};

export type NewsFeedLike = {
  likesTotal: number;
  remainingLikes?: number;
  likesRecent: {
    friend: UserDetail;
    createdAt: string;
  }[];
};

export type NewsFeed = {
  id: string;
  author: UserDetail;
  content: string;
  createdAt: string;
  likes?: NewsFeedLike;
  comments?: NewsFeedCommentPagination;
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
  sendFriends?: UserDetail[];
  isLiked?: boolean;
};

export type NewsFeedsResponse = {
  data: NewsFeed[];
  meta: { pagination: Pagination };
};

export type TNewsFeedPhotos = { data: NewsFeed[] };
