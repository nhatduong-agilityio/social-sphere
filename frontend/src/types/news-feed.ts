import { Pagination } from './pagination';
import { UserDetail } from './user';

export type NewsFeedComment = {
  id: string;
  friend: UserDetail;
  content: string;
  media?: string;
  tagFriends?: UserDetail[];
  gifUrl?: string;
  createdDate: string;
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
  createdDate: string;
};

export type NewsFeedLike = {
  likesTotal: number;
  remainingLikes?: number;
  likesRecent: {
    friend: UserDetail;
    createdDate: string;
  }[];
};

export type NewsFeed = {
  id: string;
  user: UserDetail;
  content: string;
  createdDate: string;
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
