import { useState, useCallback, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

type ComposeFeedFormValues = {
  content: string;
  media: File;
  accessItems: string[];
  activityRole: string;
  storyRole: string;
  gifUrl: string;
  tagFriends: string[];
};

export const useComposeFeedForm = () => {
  const form = useForm<ComposeFeedFormValues>({
    defaultValues: {
      content: '',
      activityRole: 'Friends',
      storyRole: 'Friends',
      gifUrl: '',
      tagFriends: [],
    },
  });

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [selectedGifUrl, setSelectedGifUrl] = useState<string>('');
  const [selectedTagFriends, setSelectedTagFriends] = useState<string[]>([]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        form.setValue('media', file);
        const imageUrl = URL.createObjectURL(file);
        setSelectedImageUrl(imageUrl);
      }
    },
    [form],
  );

  const handleRemoveMedia = useCallback(() => {
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl);
    }
    setSelectedImageUrl('');
  }, [selectedImageUrl]);

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

  return {
    form,
    selectedImageUrl,
    selectedGifUrl,
    selectedTagFriends,
    handleFileChange,
    handleRemoveMedia,
    handleGifSelect,
    handleRemoveGif,
    handleTagFriends,
    handleRemoveFriend,
    handleRemoveAllFriends,
  };
};
