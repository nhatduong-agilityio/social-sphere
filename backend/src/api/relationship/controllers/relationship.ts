import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::relationship.relationship',
  ({ strapi }) => ({
    async findNonFriends(ctx) {
      const { userId } = ctx.params;
      const id = Number(userId);

      if (!id) {
        return ctx.badRequest('User ID is required');
      }

      const nonFollowingUsers = await strapi.entityService.findMany(
        'plugin::users-permissions.user',
        {
          filters: { id: { $ne: userId } },
          fields: [
            'id',
            'username',
            'email',
            'firstName',
            'lastName',
            'banner',
            'accountType',
            'profilePicture',
          ],
          populate: {
            followedRelationships: {
              filters: { requestStatus: 'friends' },
              populate: { follower: true },
            },
          },
        },
      );

      const filteredUsers = nonFollowingUsers.filter(
        (user) =>
          !user['followedRelationships'].some(
            (rel: { follower: { id: number } }) => rel.follower.id === id,
          ),
      );

      ctx.body = filteredUsers;
    },
  }),
);
