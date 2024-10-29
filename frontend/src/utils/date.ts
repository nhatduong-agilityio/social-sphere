import { format, formatDistanceToNow, isValid } from 'date-fns';

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (!isValid(date)) {
    return 'Invalid date';
  }

  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  const isRecent = Date.now() - date.getTime() < 24 * 60 * 60 * 1000;

  return isRecent ? timeAgo : format(date, 'MMMM d yyyy, h:mm a');
};
