import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export type ShareFormValues = {
  content: string;
  tagFriends: string[];
  location: string;
  activityRole: string;
  friendsFeed: string[];
  group: string;
  page: string;
  friendsMessage: string[];
};

export const useShareForm = () => {
  const form = useForm<ShareFormValues>({
    defaultValues: {
      content: '',
    },
  });

  const [selectedTagFriends, setSelectedTagFriends] = useState<string[]>([]);

  const handleTagFriends = useCallback(
    (friendId: string) => {
      setSelectedTagFriends((prevTaggedFriends) => {
        const updatedFriends = prevTaggedFriends.includes(friendId)
          ? prevTaggedFriends.filter((id) => id !== friendId)
          : [...prevTaggedFriends, friendId];
        form.setValue('tagFriends', updatedFriends);
        return updatedFriends;
      });
    },
    [form],
  );

  const handleRemoveFriend = useCallback(
    (friendId: string) => {
      setSelectedTagFriends((prevTaggedFriends) => {
        const updatedFriends = prevTaggedFriends.filter(
          (id) => id !== friendId,
        );
        form.setValue('tagFriends', updatedFriends);
        return updatedFriends;
      });
    },
    [form],
  );

  const handleRemoveAllFriends = useCallback(() => {
    setSelectedTagFriends([]);
    form.setValue('tagFriends', []);
  }, [form]);

  const selectedLocation = form.getValues('location');

  return {
    form,
    selectedTagFriends,
    selectedLocation,
    handleTagFriends,
    handleRemoveFriend,
    handleRemoveAllFriends,
  };
};
