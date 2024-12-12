import { MetadataRoute } from 'next';
import { BASE_URL } from '@/constants';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/'],
  },
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
