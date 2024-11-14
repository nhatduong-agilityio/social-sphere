export const ROUTER = {
  HOME: '/',
  CATEGORY: '/category',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',

  PROFILE_ID_OVERVIEW: (username: string) =>
    `/user-profile/${username}/overview`,
  PROFILE_ID_PERSONAL_INFO: (username: string) =>
    `/user-profile/${username}/personal-info`,
  PROFILE_ID_EDUCATION: (username: string) =>
    `/user-profile/${username}/education`,
  PROFILE_ID_JOBS: (username: string) => `/user-profile/${username}/jobs`,
};
