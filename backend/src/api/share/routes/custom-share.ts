export default {
  routes: [
    {
      method: 'POST',
      path: '/shares/create',
      handler: 'share.createShare',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/shares/filter',
      handler: 'share.getSharedPosts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
