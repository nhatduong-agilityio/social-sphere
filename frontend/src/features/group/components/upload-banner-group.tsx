'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useTransition,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Input, Form, FormControl, FormField, FormItem } from '@/components/ui';
import { Banner, BannerSkeleton } from '@/components/sections';

// Libs
import { PictureProfileSchema } from '../lib';

// Constants
import { IMAGES } from '@/constants';

// Hooks
import { toast } from '@/hooks';

// Services
import { upload } from '@/services';

// Types
import { GroupDetail } from '@/types';

// Actions
import { updateGroup } from '../actions';

interface UploadBannerGroupProps {
  group: GroupDetail;
}

export const UploadBannerGroup = ({ group }: UploadBannerGroupProps) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
    group.banner || IMAGES.PROFILE_BANNER.url,
  );
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof PictureProfileSchema>>({
    resolver: zodResolver(PictureProfileSchema),
  });

  const handleUploadButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          form.setValue('banner', file, { shouldValidate: true });
          const isValid = await form.trigger('banner');

          if (!isValid) {
            const error = form.formState.errors.banner;

            toast({
              variant: 'destructive',
              title: 'Error',
              description: error?.message,
            });
          } else {
            startTransition(async () => {
              const banner = await upload(file);

              await updateGroup(group.documentId, { banner } as GroupDetail);
              setSelectedImageUrl(banner);

              toast({
                variant: 'success',
                title: 'Success',
                description: 'Banner Uploaded Successfully',
              });
            });
          }
        } catch (error) {
          form.setError('banner', {
            type: 'manual',
            message: 'Invalid file. Please select a valid image file.',
          });
        }
      }
    },
    [form, group],
  );

  return (
    <Form {...form}>
      {isPending ? (
        <BannerSkeleton />
      ) : (
        <Banner
          imageUrl={selectedImageUrl || IMAGES.PROFILE_BANNER.url}
          onClick={handleUploadButtonClick}
        />
      )}

      <FormField
        control={form.control}
        name="banner"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                id="profile-picture-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload profile picture"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
};
