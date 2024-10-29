export type UserDetail = {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  password?: string;
  email?: string;
  profilePicture?: string;
  banner?: string;
  countFriends?: number;
  job?: string;
  phoneNumber?: string;
  accountType?: string;
  location?: {
    countryCode: string;
    city: string;
  };
};

export type IUserResponse = {
  user: UserDetail;
  jwt: string;
};

export type IUserRequest = Omit<UserDetail, 'id'>;
