import { useState, useCallback, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

export type GroupFormValues = {
  name: string;
  description: string;
  avatar: File | null;
};

export const useGroupForm = () => {
  const form = useForm<GroupFormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        form.setValue('avatar', file);
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
    form.setValue('avatar', null);
  }, [form, selectedImageUrl]);

  const getFormData = (values: GroupFormValues) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);

    if (values.avatar) {
      formData.append('avatar', values.avatar);
    }

    return formData;
  };

  return {
    form,
    selectedImageUrl,
    getFormData,
    handleFileChange,
    handleRemoveMedia,
  };
};
