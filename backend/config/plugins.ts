export default () => ({
  'users-permissions': {
    config: {
      register: {
        allowedFields: [
          'firstName',
          'lastName',
          'phoneNumber',
          'profilePicture',
          'accountType',
        ],
      },
    },
  },
});
