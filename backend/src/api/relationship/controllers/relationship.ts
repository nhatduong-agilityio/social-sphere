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
          filters: { id: { $ne: id } },
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
              filters: { requestStatus: { $in: ['friends', 'pending'] } },
              populate: { follower: true },
            },
            followerRelationships: {
              filters: { requestStatus: { $in: ['pending', 'friends'] } },
              populate: { follower: true },
            },
          },
        },
      );

      const filteredUsers = nonFollowingUsers.filter(
        (user) =>
          !user['followedRelationships'].some(
            (rel: { requestStatus: string; follower: { id: number } }) =>
              ['friends', 'pending'].includes(rel.requestStatus) &&
              rel.follower.id === id,
          ),
      );

      ctx.body = filteredUsers;
    },
  }),
);
