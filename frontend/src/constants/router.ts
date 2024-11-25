export const ROUTER = {
  HOME: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  GROUP_NAME: (groupName: string) => `/group/${groupName}`,

  PROFILE_ID_OVERVIEW: (username: string) =>
    `/user-profile/${username}/overview`,
  PROFILE_ID_PERSONAL_INFO: (username: string) =>
    `/user-profile/${username}/personal-info`,
  PROFILE_ID_EDUCATION: (username: string) =>
    `/user-profile/${username}/education`,
  PROFILE_ID_JOBS: (username: string) => `/user-profile/${username}/jobs`,
  PROFILE_MAIN: (username: string) => `/user-profile/${username}/main-profile`,
};
