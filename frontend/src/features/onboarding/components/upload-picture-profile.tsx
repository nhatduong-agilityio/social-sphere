'use client';

import { useCallback, useRef, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button,
} from '@/components/ui';
import { OnboardingFormWrapper } from './onboarding-form-wrapper';
import { OnboardingFormNavigation } from './onboarding-form-navigation';

// Libs
import { PictureProfileSchema } from '../lib';

// Stores
import { useOnboardingStore } from '../stores';

// Services
import { upload } from '@/services';

export const UploadPictureProfile = () => {
  const { currentStep, setCurrentStep, onboardingData, setOnboardingData } =
    useOnboardingStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
    onboardingData.profilePicture,
  );

  const form = useForm<z.infer<typeof PictureProfileSchema>>({
    resolver: zodResolver(PictureProfileSchema),
  });

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          form.setValue('pictureProfile', file, { shouldValidate: true });
          await form.trigger('pictureProfile');

          if (!form.formState.errors.pictureProfile) {
            const imageUrl = await upload(file);
            setSelectedImageUrl(imageUrl);
            form.clearErrors('pictureProfile');
          } else {
            setSelectedImageUrl(null);
          }
        } catch (error) {
          form.setError('pictureProfile', {
            type: 'manual',
            message: 'Invalid file. Please select a valid image file.',
          });
        } finally {
          form.resetField('pictureProfile');
        }
      }
    },
    [form],
  );

  const handlePlusButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleNextButton = useCallback(() => {
    if (selectedImageUrl) {
      setOnboardingData({
        ...onboardingData,
        profilePicture: selectedImageUrl,
      });
      setCurrentStep(currentStep + 1);
    }
  }, [
    currentStep,
    onboardingData,
    selectedImageUrl,
    setCurrentStep,
    setOnboardingData,
  ]);

  const handleBackButton = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep, setCurrentStep]);

  const avatarContent = useMemo(
    () => (
      <div className="w-[120px] h-[120px] rounded-full border-[1.4px] border-gray-900 dark:border-blue-800 p-[8.5px] relative">
        <Avatar className="w-full h-full">
          <AvatarImage
            src={selectedImageUrl || '/images/avatar-placeholder.svg'}
            alt="Profile picture"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          variant="rounded"
          size="icon"
          className="border-3 bg-gray-900 hover:bg-blue-600 border-white dark:border-dark-800 absolute top-0 right-0 w-9 h-9"
          onClick={handlePlusButtonClick}
          aria-label="Upload profile picture"
        >
          <PlusIcon size={14} className="text-white" strokeWidth={3} />
        </Button>
      </div>
    ),
    [selectedImageUrl, handlePlusButtonClick],
  );

  return (
    <OnboardingFormWrapper title="Upload a profile picture.">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNextButton)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex flex-col items-center w-full p-[30px] bg-white dark:bg-dark-800 border rounded-md">
            {avatarContent}
            <FormDescription className="text-neutral-200 dark:text-neutral-100 mt-5">
              Only images with a size lower than 3MB are allowed.
            </FormDescription>
            <FormField
              control={form.control}
              name="pictureProfile"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <OnboardingFormNavigation onBackClick={handleBackButton} />
        </form>
      </Form>
    </OnboardingFormWrapper>
  );
};
