export default ({ env }) => ({
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
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
});
