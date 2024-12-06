export default {
  routes: [
    {
      method: 'PUT',
      path: '/groups/:id/update',
      handler: 'group.updateGroupFields',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
