export default {
  routes: [
    {
      method: 'POST',
      path: '/likes/toggle',
      handler: 'like.toggleLike',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
