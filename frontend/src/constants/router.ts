export const ROUTER = {
  HOME: '/',
  CATEGORY: '/category',
  LOGIN: '/login',
  USER_PROFILE: '/user-profile',
  ONBOARDING: '/onboarding',

  PROFILE_ID_OVERVIEW: (id: number) => `/user-profile/${id}/overview`,
  PROFILE_ID_PERSONAL_INFO: (id: number) => `/user-profile/${id}/personal-info`,
  PROFILE_ID_EDUCATION: (id: number) => `/user-profile/${id}/education`,
  PROFILE_ID_JOBS: (id: number) => `/user-profile/${id}/jobs`,
};
