export type UserModel = {
  id: number;
  documentId?: string;
  firstName: string;
  lastName: string;
  username: string;
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
  bio?: string;
  followedRelationships: Array<{ id: number }>;
};
