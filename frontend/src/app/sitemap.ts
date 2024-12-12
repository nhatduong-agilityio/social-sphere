import { MetadataRoute } from 'next';

// Constants
import { API_ENDPOINT, BASE_URL, ROUTER } from '@/constants';

// Models
import { GroupModel, UserModel } from '@/models';

// Services
import { apiClient } from '@/services';

// Utils
import { formatLastModified } from '@/utils';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticRoutes = [
    {
      url: `${BASE_URL}${ROUTER.HOME}`,
      lastModified: formatLastModified(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}${ROUTER.LOGIN}`,
      lastModified: formatLastModified(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}${ROUTER.ONBOARDING}`,
      lastModified: formatLastModified(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Fetch dynamic user, group data
  const [users, groups] = await Promise.all([
    apiClient.get<UserModel[]>(API_ENDPOINT.USERS),
    apiClient.get<GroupModel[]>(API_ENDPOINT.GROUPS),
  ]);

  // Dynamic user profile routes
  const userRoutes = users
    .map((user) => [
      {
        url: `${BASE_URL}${ROUTER.PROFILE_ID_OVERVIEW(user.username)}`,
        lastModified: formatLastModified(user.updatedAt, user.createdAt),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${BASE_URL}${ROUTER.PROFILE_ID_PERSONAL_INFO(user.username)}`,
        lastModified: formatLastModified(user.updatedAt, user.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${BASE_URL}${ROUTER.PROFILE_ID_EDUCATION(user.username)}`,
        lastModified: formatLastModified(user.updatedAt, user.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${BASE_URL}${ROUTER.PROFILE_ID_JOBS(user.username)}`,
        lastModified: formatLastModified(user.updatedAt, user.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${BASE_URL}${ROUTER.PROFILE_MAIN(user.username)}`,
        lastModified: formatLastModified(user.updatedAt, user.createdAt),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ])
    .flat();

  // Dynamic group routes
  const groupRoutes = groups.map((group) => ({
    url: `${BASE_URL}${ROUTER.GROUP_NAME(group.name)}`,
    lastModified: formatLastModified(group.updatedAt, group.createdAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...userRoutes, ...groupRoutes];
};

export default sitemap;
