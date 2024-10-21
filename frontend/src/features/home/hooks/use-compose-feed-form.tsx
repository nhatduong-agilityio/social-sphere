import { useState, useCallback, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

export type ComposeFeedFormValues = {
  content: string;
  media: File | null;
  accessItems: string[];
  activityRole: string;
  storyRole: string;
  gifUrl: string;
  tagFriends: string[];
  mood: {
    title: string;
    content: string;
  };
  sharedLink: string;
  location: string;
  sendFriends: string[];
};

const initMoodState = {
  title: '',
  content: '',
};

export const useComposeFeedForm = () => {
  const form = useForm<ComposeFeedFormValues>({
    defaultValues: {
      content: '',
      accessItems: ['activityFeed'],
      activityRole: 'friends',
      storyRole: 'friends',
      gifUrl: '',
      tagFriends: [],
      mood: initMoodState,
      sharedLink: '',
      location: '',
      sendFriends: [],
    },
  });

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [selectedGifUrl, setSelectedGifUrl] = useState<string>('');
  const [selectedTagFriends, setSelectedTagFriends] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<{
    title: string;
    content: string;
  }>(initMoodState);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        form.setValue('media', file);
        const imageUrl = URL.createObjectURL(file);
        setSelectedImageUrl(imageUrl);
      }
      // Reset the file input value
      event.target.value = '';
    },
    [form],
  );

  const handleRemoveMedia = useCallback(() => {
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl);
    }
    setSelectedImageUrl('');
    form.setValue('media', null);
  }, [form, selectedImageUrl]);

  const handleGifSelect = useCallback(
    (gifUrl: string) => {
      form.setValue('gifUrl', gifUrl);
      setSelectedGifUrl(gifUrl);
    },
    [form],
  );

  const handleRemoveGif = useCallback(() => {
    setSelectedGifUrl('');
  }, []);

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

  const handleSelectMood = useCallback(
    (data: { title: string; content: string }) => {
      setSelectedMood(data);
      form.setValue('mood', data);
    },
    [form],
  );

  const handleRemoveMood = useCallback(() => {
    setSelectedMood(initMoodState);
    form.setValue('mood', initMoodState);
  }, [form]);

  return {
    form,
    selectedImageUrl,
    selectedGifUrl,
    selectedTagFriends,
    selectedMood,
    handleFileChange,
    handleRemoveMedia,
    handleGifSelect,
    handleRemoveGif,
    handleTagFriends,
    handleRemoveFriend,
    handleRemoveAllFriends,
    handleSelectMood,
    handleRemoveMood,
  };
};
