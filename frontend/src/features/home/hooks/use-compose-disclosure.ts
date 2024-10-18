import { useCallback } from 'react';
import { useDisclosure } from '@/hooks/use-disclosure';

export const useComposeDisclosure = () => {
  const gifPicker = useDisclosure();
  const tagFriends = useDisclosure();
  const moods = useDisclosure();
  const shareLink = useDisclosure();
  const location = useDisclosure();

  const handleOpenGifPicker = useCallback(() => {
    gifPicker.onOpen();
    tagFriends.onClose();
    moods.onClose();
    shareLink.onClose();
    location.onClose();
  }, [gifPicker, location, moods, shareLink, tagFriends]);

  const handleOpenTagFriends = useCallback(() => {
    gifPicker.onClose();
    tagFriends.onOpen();
    moods.onClose();
    shareLink.onClose();
    location.onClose();
  }, [gifPicker, location, moods, shareLink, tagFriends]);

  const handleOpenMoods = useCallback(() => {
    gifPicker.onClose();
    tagFriends.onClose();
    moods.onOpen();
    shareLink.onClose();
    location.onClose();
  }, [gifPicker, location, moods, shareLink, tagFriends]);

  const handleOpenShareLink = useCallback(() => {
    gifPicker.onClose();
    tagFriends.onClose();
    moods.onClose();
    shareLink.onOpen();
    location.onClose();
  }, [gifPicker, location, moods, shareLink, tagFriends]);

  const handleOpenLocation = useCallback(() => {
    gifPicker.onClose();
    tagFriends.onClose();
    moods.onClose();
    shareLink.onClose();
    location.onOpen();
  }, [gifPicker, location, moods, shareLink, tagFriends]);

  return {
    gifPicker,
    tagFriends,
    moods,
    shareLink,
    location,
    onOpenGifPicker: handleOpenGifPicker,
    onOpenTagFriends: handleOpenTagFriends,
    onOpenMoods: handleOpenMoods,
    onOpenShareLink: handleOpenShareLink,
    onOpenLocation: handleOpenLocation,
  };
};
