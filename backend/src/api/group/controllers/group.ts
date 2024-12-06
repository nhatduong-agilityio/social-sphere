/**
 * group controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::group.group',
  ({ strapi }) => ({
    async create(ctx) {
      try {
        // Get the authenticated user from context
        const { user } = ctx.state;

        // Add the creating user to the group data
        ctx.request.body.data.createdUser = user.id;

        // Create the group using the default controller
        const { data } = await super.create(ctx);

        // Create group member entry for the creator with admin role
        await strapi.entityService.create('api::group-member.group-member', {
          data: {
            publishedAt: new Date(),
            user: user.id,
            group: data.id,
            role: 'admin',
          },
        });

        return { data };
      } catch (error) {
        ctx.throw(500, error);
      }
    },
    async updateGroupFields(ctx) {
      const { id } = ctx.params;
      const { data: updateFields } = ctx.request.body;

      // Get existing group data
      const existingGroup = await strapi.db.query('api::group.group').findOne({
        select: '*',
        where: { id },
        populate: {
          createdUser: { select: '*' },
          groupMembers: {
            select: '*',
            populate: { user: { select: '*' } },
          },
        },
      });

      if (!existingGroup) {
        return ctx.notFound('Group not found');
      }

      // Remove id from the existing group data before spreading
      const { id: _, ...groupDataWithoutId } = existingGroup;

      // Update only the specified fields
      const updatedGroup = await strapi.entityService.update(
        'api::group.group',
        id,
        {
          data: {
            ...groupDataWithoutId,
            ...updateFields,
          },
          populate: {
            createdUser: true,
            groupMembers: {
              populate: ['user'],
            },
            posts: true,
            postsGroup: true,
          },
        },
      );

      return { data: updatedGroup };
    },
  }),
);
