/**
 * share controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::share.share',
  ({ strapi }) => ({
    async createShare(ctx) {
      const { data } = ctx.request.body;
      const {
        postId,
        userId,
        content,
        tagFriends,
        location,
        activityRole,
        friendsFeed,
        group,
        page,
        friendsMessage,
        shareType,
      } = data;

      // Create new post with shared content
      const newPost = await strapi.db.query('api::post.post').create({
        data: {
          content,
          author: userId,
          sharedFrom: postId,
          tagFriends,
          location,
          activityRole,
          publishedAt: new Date(),
        },
        populate: {
          author: true,
          sharedFrom: {
            populate: ['author', 'media', 'likes', 'comments'],
          },
        },
      });

      // Create share record linking everything together
      const shareData = {
        post: postId,
        user: userId,
        content,
        tagFriends,
        location,
        activityRole,
        shareType,
        friendsFeed,
        group,
        page,
        friendsMessage,
      };

      const share = await strapi.db.query('api::share.share').create({
        data: shareData,
        populate: {
          user: true,
          post: {
            populate: {
              author: true,
              media: true,
              likes: true,
              comments: {
                populate: {
                  friend: true,
                  replies: {
                    populate: {
                      friend: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return {
        data: {
          ...share,
          newPost,
        },
      };
    },

    async getSharedPosts(ctx) {
      const { userId, friendsFeed, group } = ctx.query;

      const query = {
        where: {
          $and: [
            ...(userId ? [{ user: { id: userId } }] : []),
            ...(friendsFeed ? [{ friendsFeed: { id: friendsFeed } }] : []),
            ...(group ? [{ group: { id: group } }] : []),
          ],
        },
        populate: {
          user: true,
          post: {
            populate: {
              author: true,
              media: true,
              likes: true,
              comments: {
                populate: {
                  friend: true,
                  replies: {
                    populate: {
                      friend: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      };

      const shares = await strapi.db.query('api::share.share').findMany(query);
      return { data: shares };
    },
  }),
);
