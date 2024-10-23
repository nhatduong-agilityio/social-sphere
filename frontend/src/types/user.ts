export type UserDetail = {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  banner?: string;
  countFriends?: number;
  job?: string;
  location?: {
    countryCode: string;
    city: string;
  };
};
