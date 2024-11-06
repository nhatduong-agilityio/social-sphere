export const TAG_KEYS = {
  USER_ID: (userId: string) => `api-users-${userId}`,
  RELATIONSHIP: (userId: string) => `api-relationships-${userId}`,
  POST_BY_USER: (userId: string) => `api-posts-${userId}`,
};
