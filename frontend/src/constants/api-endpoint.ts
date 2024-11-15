export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINT = {
  CATEGORY_LIST: 'categories',
  TENOR_PROXY: '/api/tenor-proxy',
  MAPBOX_GEOCODING: '/api/mapbox-geocoding',
  USERS: 'api/users',
  POSTS: 'api/posts',
  LIKES: 'api/likes',
  SHARES: 'api/shares',
  PROFILE: 'api/users/me',
  UPLOAD: 'api/upload',
  SIGN_UP: 'api/auth/local/register',
  SIGN_IN: 'api/auth/local',
  RELATIONSHIP: 'api/relationships',
  COMMENTS: 'api/comments',
};
