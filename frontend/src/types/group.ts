export type GroupDetail = {
  id: string;
  name: string;
  description: string;
  members: string;
  avatar: string;
  location?: {
    countryCode: string;
    city: string;
  };
};
