import { useCallback } from 'react';
import { useDisclosure } from '@/hooks';

export const useShareActionsDisclosure = () => {
  const tagFriends = useDisclosure();
  const location = useDisclosure();

  const handleOpenTagFriends = useCallback(() => {
    tagFriends.onToggle();
    location.onClose();
  }, [location, tagFriends]);

  const handleOpenLocation = useCallback(() => {
    tagFriends.onClose();
    location.onToggle();
  }, [location, tagFriends]);

  return {
    tagFriends,
    location,
    onOpenTagFriends: handleOpenTagFriends,
    onOpenLocation: handleOpenLocation,
  };
};
