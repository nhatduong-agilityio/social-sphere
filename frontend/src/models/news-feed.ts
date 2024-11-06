export type NewsFeedModel = {
  id: string;
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
