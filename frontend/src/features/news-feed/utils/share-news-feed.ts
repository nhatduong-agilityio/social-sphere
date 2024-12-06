import { ShareTypeOption } from '@/types';

export const determineShareType = (
  friendsFeed?: string,
  group?: string,
  page?: string,
  friendsMessage?: string,
): ShareTypeOption => {
  if (friendsFeed) return ShareTypeOption.FRIENDS_FEED;
  if (group) return ShareTypeOption.GROUP;
  if (page) return ShareTypeOption.PAGE;
  if (friendsMessage) return ShareTypeOption.FRIENDS_MESSAGE;
  return ShareTypeOption.YOUR_FEED;
};
