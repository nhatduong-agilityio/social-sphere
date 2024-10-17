export interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatar?: string;
  banner?: string;
  countFriends?: number;
  job?: string;
  location?: {
    countryCode: string;
    city: string;
  };
}
