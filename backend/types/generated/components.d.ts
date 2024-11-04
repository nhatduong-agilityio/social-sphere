import type { Struct, Schema } from '@strapi/strapi';

export interface ArrayUser extends Struct.ComponentSchema {
  collectionName: 'components_array_users';
  info: {
    displayName: 'User';
    icon: 'user';
    description: '';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'array.user': ArrayUser;
    }
  }
}
