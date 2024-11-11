export const TAG_KEYS = {
  USER_USERNAME: (username: string) => `api-users-${username}`,
  RELATIONSHIP: (username: string) => `api-relationships-${username}`,
  POST_BY_USER: (username: string) => `api-posts-${username}`,
};
