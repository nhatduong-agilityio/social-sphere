export const TAG_KEYS = {
  USER_USERNAME: (username: string) => `api-users-${username}`,
  RELATIONSHIP: (username: string) => `api-relationships-${username}`,
  POST_BY_USER: (username: string) => `api-posts-${username}`,
  SUGGEST_FRIENDS: (userId: string) => `api-non-friends-${userId}`,
  NEWS_FEED_IDS_BY_USER_IN_PAGE: (userId: string, page: number) =>
    `api-news-feed-ids-${userId}-in-page-${page}`,
  ACCEPT_FRIENDS: (userId: string) => `api-accept-friends-${userId}`,
  LIST_COMMENTS_IN_NEWS_FEED_BY_ID_IN_PAGE: (
    newsFeedId: string,
    page: number,
  ) => `api-list-comments-in-news-feed-by-${newsFeedId}-in-page-${page}`,
};
