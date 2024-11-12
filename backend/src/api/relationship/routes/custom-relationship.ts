export default {
  routes: [
    {
      method: 'GET',
      path: '/relationships/non-friends/:userId',
      handler: 'relationship.findNonFriends',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
