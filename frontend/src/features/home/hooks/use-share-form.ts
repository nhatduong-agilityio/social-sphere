import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export type ShareFormValues = {
  content: string;
  tagFriends: string[];
  location: string;
  activityRole: string;
  friendsFeed: string;
  group: string;
  page: string;
  friendsMessage: string;
};

export const useShareForm = () => {
  const form = useForm<ShareFormValues>({
    defaultValues: {
      content: '',
    },
  });

  const [selectedTagFriends, setSelectedTagFriends] = useState<string[]>([]);
  const [selectedFriendsFeed, setSelectedFriendsFeed] = useState<string>('');
  const [selectedFriendsMessage, setSelectedFriendsMessage] =
    useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');

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

  const handleFriendsFeed = useCallback(
    (friendId: string) => {
      setSelectedFriendsFeed(friendId);
      form.setValue('friendsFeed', friendId);
    },
    [form],
  );

  const handleRemoveFriendsFeed = useCallback(() => {
    setSelectedFriendsFeed('');
    form.setValue('friendsFeed', '');
  }, [form]);

  const handleFriendsMessage = useCallback(
    (friendId: string) => {
      setSelectedFriendsMessage(friendId);
      form.setValue('friendsMessage', friendId);
    },
    [form],
  );

  const handleRemoveFriendsMessage = useCallback(() => {
    setSelectedFriendsMessage('');
    form.setValue('friendsMessage', '');
  }, [form]);

  const handleSelectGroup = useCallback(
    (groupId: string) => {
      setSelectedGroup(groupId);
      form.setValue('group', groupId);
    },
    [form],
  );

  const handleRemoveGroup = useCallback(() => {
    setSelectedGroup('');
    form.setValue('group', '');
  }, [form]);

  const selectedLocation = form.getValues('location');

  return {
    form,
    selectedTagFriends,
    selectedLocation,
    selectedFriendsFeed,
    selectedFriendsMessage,
    selectedGroup,
    handleTagFriends,
    handleRemoveFriend,
    handleRemoveAllFriends,
    handleFriendsFeed,
    handleRemoveFriendsFeed,
    handleFriendsMessage,
    handleRemoveFriendsMessage,
    handleSelectGroup,
    handleRemoveGroup,
  };
};
