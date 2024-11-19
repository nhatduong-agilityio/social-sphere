/**
 * share controller
 */

import { factories } from '@strapi/strapi';

interface Group {
  id: number;
  createdUser: {
    id: number;
  };
  groupMembers: Array<{
    user: {
      id: number;
    };
  }>;
  isPrivate: boolean;
}

export default factories.createCoreController(
  'api::share.share',
  ({ strapi }) => ({
    async createShare(ctx) {
      try {
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

        // Validate sharing permissions based on shareType
        if (shareType === 'group' && group) {
          const targetGroup = (await strapi.entityService.findOne(
            'api::group.group',
            group,
            {
              populate: {
                createdUser: true,
                groupMembers: {
                  populate: { user: true },
                },
              },
            },
          )) as unknown as Group;

          const isCreator = targetGroup.createdUser?.id === userId;
          const isMember = targetGroup.groupMembers?.some(
            (member) => member.user?.id === userId,
          );

          if (!isCreator && !isMember) {
            return ctx.forbidden(
              'You must be a member or creator of the group to share posts',
            );
          }
        }

        if (shareType === 'friendsFeed' && friendsFeed) {
          const relationship = await strapi.entityService.findMany(
            'api::relationship.relationship',
            {
              filters: {
                $or: [
                  {
                    follower: userId,
                    followed: friendsFeed,
                    requestStatus: 'friends',
                  },
                  {
                    follower: friendsFeed,
                    followed: userId,
                    requestStatus: 'friends',
                  },
                ],
              },
            },
          );

          if (!relationship.length) {
            return ctx.forbidden("You can only share to friends' feeds");
          }
        }

        // Create new post with shared content
        const newPostData = {
          data: {
            content,
            author: userId,
            sharedFrom: postId,
            tagFriends: tagFriends || [],
            location,
            activityRole,
            media: null,
            gifUrl: null,
            sendFriends: [],
            mood: null,
            sharedLink: null,
            accessItems: [],
            storyRole: null,
          },
        };

        const newPost = await strapi.entityService.create('api::post.post', {
          ...newPostData,
          populate: {
            author: true,
            sharedFrom: {
              populate: {
                author: true,
                likes: true,
                comments: {
                  populate: '*',
                },
                shares: {
                  populate: '*',
                },
              },
            },
            likes: true,
            comments: {
              populate: '*',
            },
            shares: {
              populate: '*',
            },
          },
        });

        // Create share record
        const shareData = {
          data: {
            post: postId,
            user: userId,
            content,
            tagFriends,
            location,
            activityRole,
            shareType,
            friendsFeed: shareType === 'friendsFeed' ? friendsFeed : null,
            group: shareType === 'group' ? group : null,
            page,
            friendsMessage,
          },
        };

        const share = await strapi.entityService.create('api::share.share', {
          ...shareData,
          populate: {
            user: true,
            post: {
              populate: {
                author: true,
                likes: true,
                comments: {
                  populate: '*',
                },
                shares: {
                  populate: '*',
                },
              },
            },
            friendsFeed: true,
            group: true,
          },
        });

        return { data: { share, newPost } };
      } catch (error) {
        console.error('Share creation error:', error);
        ctx.throw(400, error.message);
      }
    },
    async getSharedPosts(ctx) {
      try {
        const { userId, friendsFeed, group } = ctx.query;

        let filters = {
          user: null,
          friendsFeed: null,
          group: null,
        };

        if (userId) {
          filters.user = { id: userId };
        }

        if (friendsFeed) {
          const relationship = await strapi.entityService.findMany(
            'api::relationship.relationship',
            {
              filters: {
                $or: [
                  {
                    follower: ctx.state.user.id,
                    followed: friendsFeed,
                    requestStatus: 'friends',
                  },
                  {
                    follower: friendsFeed,
                    followed: ctx.state.user.id,
                    requestStatus: 'friends',
                  },
                ],
              },
            },
          );

          if (!relationship.length) {
            return ctx.forbidden("You can only view friends' feeds");
          }

          filters.friendsFeed = { id: friendsFeed };
        }

        if (group) {
          // Check if user is member or creator of the group
          const targetGroup = (await strapi.entityService.findOne(
            'api::group.group',
            Number(group),
            {
              populate: {
                createdUser: true,
                groupMembers: {
                  populate: {
                    user: true,
                  },
                },
              },
            },
          )) as unknown as Group;

          if (!targetGroup) {
            return ctx.badRequest('Group not found');
          }

          const isCreator = targetGroup.createdUser?.id === ctx.state.user.id;
          const isMember = targetGroup.groupMembers?.some(
            (member) => member.user?.id === ctx.state.user.id,
          );

          if (!isCreator && !isMember && targetGroup.isPrivate) {
            return ctx.forbidden(
              'You must be a member or creator to view group posts',
            );
          }

          filters.group = { id: group };
        }

        const shares = await strapi.entityService.findMany('api::share.share', {
          filters,
          populate: {
            user: true,
            post: {
              populate: {
                author: true,
                likes: true,
                comments: {
                  populate: '*',
                },
                shares: {
                  populate: '*',
                },
              },
            },
            friendsFeed: true,
            group: true,
          },
          sort: { createdAt: 'desc' },
        });

        return { data: shares };
      } catch (error) {
        console.error('Get shared posts error:', error);
        ctx.throw(400, error.message);
      }
    },
  }),
);
