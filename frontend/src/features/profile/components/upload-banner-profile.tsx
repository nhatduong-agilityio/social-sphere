import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Banner from './profile-banner';
import { Input } from '@/components/ui/input';

// Libs
import { PictureProfileSchema } from '../lib/schema';

// Constants
import { IMAGES } from '@/constants/images';

// Hooks
import { toast } from '@/hooks/use-toast';

const UploadBannerProfile = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
    IMAGES.PROFILE_BANNER.url,
  );
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
          form.setValue('bannerProfile', file, { shouldValidate: true });
          const isValid = await form.trigger('bannerProfile');

          if (!isValid) {
            const error = form.formState.errors.bannerProfile;

            toast({
              title: 'You submitted the following values:',
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
                  <code className="text-white">{error?.message}</code>
                </pre>
              ),
            });
          } else {
            const imageUrl = URL.createObjectURL(file);

            setSelectedImageUrl(imageUrl);

            toast({
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-green-500 p-4">
                  <code className="text-white">
                    Banner Uploaded Successfully
                  </code>
                </pre>
              ),
            });
          }
        } catch (error) {
          form.setError('bannerProfile', {
            type: 'manual',
            message: 'Invalid file. Please select a valid image file.',
          });
        }
      }
    },
    [form],
  );

  return (
    <Form {...form}>
      <Banner imageUrl={selectedImageUrl} onClick={handleUploadButtonClick} />

      <FormField
        control={form.control}
        name="bannerProfile"
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

export default UploadBannerProfile;
