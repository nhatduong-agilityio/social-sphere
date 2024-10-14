import { useState, useCallback, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

type ComposeFeedFormValues = {
  content: string;
  media: File;
  accessItems: string[];
  activityRole: string;
  storyRole: string;
};

export const useComposeFeedForm = () => {
  const form = useForm<ComposeFeedFormValues>({
    defaultValues: {
      content: '',
      activityRole: 'Friends',
      storyRole: 'Friends',
    },
  });

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

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

  return {
    form,
    selectedImageUrl,
    handleFileChange,
    handleRemoveMedia,
  };
};
