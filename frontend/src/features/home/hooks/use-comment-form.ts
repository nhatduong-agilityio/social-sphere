import { useState, useCallback, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

export type CommentFormValues = {
  content: string;
  media: File | null;
  tagFriends: string[];
};

export const useCommentForm = () => {
  const form = useForm<CommentFormValues>({
    defaultValues: {
      content: '',
      tagFriends: [],
    },
  });

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
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
    form.setValue('media', null);
  }, [form, selectedImageUrl]);

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

  const getFormData = (values: CommentFormValues) => {
    const formData = new FormData();

    formData.append('content', values.content);

    if (values.media) {
      formData.append('media', values.media);
    }

    values.tagFriends.forEach((friend) =>
      formData.append('tagFriends', friend),
    );

    return formData;
  };

  return {
    form,
    selectedImageUrl,
    selectedTagFriends,
    getFormData,
    handleFileChange,
    handleRemoveMedia,
    handleTagFriends,
    handleRemoveFriend,
    handleRemoveAllFriends,
  };
};
