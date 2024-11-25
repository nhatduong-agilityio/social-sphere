export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINT = {
  TENOR_PROXY: '/api/tenor-proxy',
  MAPBOX_GEOCODING: '/api/mapbox-geocoding',
  USERS: 'api/users',
  POSTS: 'api/posts',
  LIKES: 'api/likes',
  SHARES: 'api/shares',
  GROUPS: 'api/groups',
  GROUP_MEMBERS: 'api/group-members',
  PROFILE: 'api/users/me',
  UPLOAD: 'api/upload',
  SIGN_UP: 'api/auth/local/register',
  SIGN_IN: 'api/auth/local',
  RELATIONSHIP: 'api/relationships',
  COMMENTS: 'api/comments',
};
