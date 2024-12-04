/**
 * like controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::like.like',
  ({ strapi }) => ({
    async toggleLike(ctx) {
      const { post, user } = ctx.request.body.data;

      try {
        // Check for existing like
        const existingLikes = await strapi.entityService.findMany(
          'api::like.like',
          {
            filters: {
              post,
              user,
            },
          },
        );

        // If like exists, remove it
        if (existingLikes && existingLikes.length > 0) {
          const deletedLike = await strapi.entityService.delete(
            'api::like.like',
            existingLikes[0].id,
          );
          return { data: deletedLike };
        }

        // If no like exists, create new one
        const newLike = await strapi.entityService.create('api::like.like', {
          data: {
            post,
            user,
            publishedAt: new Date(),
          },
        });

        return { data: newLike };
      } catch (error) {
        ctx.throw(500, error);
      }
    },
  }),
);
