export const TAG_KEYS = {
  USER_USERNAME: (username: string) => `api-users-${username}`,
  RELATIONSHIP: (username: string) => `api-relationships-${username}`,
  POST_BY_USER: (username: string) => `api-posts-${username}`,
  SUGGEST_FRIENDS: (userId: string) => `api-non-friends-${userId}`,
  NEWSFEED_IDS_BY_USER_IN_PAGE: (userId: string, page: number) =>
    `api-news-feed-ids-${userId}-in-page-${page}`,
};
