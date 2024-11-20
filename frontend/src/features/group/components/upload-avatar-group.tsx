'use client';

import {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components/ui';
import {
  Bell,
  Camera,
  Mail,
  MessageCircle,
  Plus,
  PlusIcon,
} from 'lucide-react';
import { AvatarSkeleton, PopButton } from '@/components/sections';

// Libs
import { PictureProfileSchema } from '../lib';

// Utils
import { cn } from '@/utils';

// Hooks
import { toast } from '@/hooks';

// Images
import AvatarPlaceholder from '@public/images/avatar-placeholder.svg';

// Services
import { upload } from '@/services';

// Types
import { GroupDetail } from '@/types';

// Actions
import { updateGroup } from '../actions';

interface UploadAvatarGroupProps {
  group: GroupDetail;
}

export const UploadAvatarGroup = ({ group }: UploadAvatarGroupProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
    group.avatar || AvatarPlaceholder.src,
  );
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof PictureProfileSchema>>({
    resolver: zodResolver(PictureProfileSchema),
  });

  const handleActiveButton = useCallback(
    () => setIsActive(!isActive),
    [isActive],
  );

  const handleUploadButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          form.setValue('pictureProfile', file, { shouldValidate: true });
          const isValid = await form.trigger('pictureProfile');

          if (!isValid) {
            const error = form.formState.errors.pictureProfile;

            toast({
              title: 'You submitted the following values:',
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
                  <code className="text-white">{error?.message}</code>
                </pre>
              ),
            });
          } else {
            startTransition(async () => {
              const profilePicture = await upload(file);

              await updateGroup(group.documentId, {
                avatar: profilePicture,
              } as GroupDetail);
              setSelectedImageUrl(profilePicture);

              form.clearErrors('pictureProfile');

              toast({
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-green-500 p-4">
                    <code className="text-white">
                      Avatar Uploaded Successfully
                    </code>
                  </pre>
                ),
              });
            });
          }
        } catch (error) {
          form.setError('pictureProfile', {
            type: 'manual',
            message: 'Invalid file. Please select a valid image file.',
          });
        }
      }
    },
    [form, group],
  );

  const popButtons = useMemo(
    () => [
      {
        rotate: '-36deg',
        icon: (
          <Bell
            className="text-slate-400 hover:text-white"
            size={18}
            style={{ transform: 'rotate(36deg)' }}
          />
        ),
      },
      {
        rotate: '0deg',
        icon: (
          <Plus
            className="text-slate-400 hover:text-white"
            size={18}
            style={{ transform: 'rotate(0deg)' }}
          />
        ),
      },
      {
        rotate: '36deg',
        icon: (
          <MessageCircle
            className="text-slate-400 hover:text-white"
            size={18}
            style={{ transform: 'rotate(-36deg)' }}
          />
        ),
      },
      {
        rotate: '72deg',
        icon: (
          <Mail
            className="text-slate-400 hover:text-white"
            size={18}
            style={{ transform: 'rotate(-72deg)' }}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Form {...form}>
      <div className="w-[110px] h-[110px] rounded-full p-[8.5px] absolute bottom-[-50px] left-0 right-0 mx-auto z-10">
        <Avatar className="w-[full] h-[full] bg-current">
          {isPending ? (
            <AvatarSkeleton />
          ) : (
            <>
              <AvatarImage src={selectedImageUrl} alt="Profile picture" />
              <AvatarFallback className="w-24 h-24 rounded-full bg-slate-500">
                CN
              </AvatarFallback>
            </>
          )}
        </Avatar>
        <Button
          variant="rounded"
          size="icon"
          className="absolute bg-blue-500 bottom-0 right-2 w-[34px] h-[34px]"
          aria-label="Upload profile picture"
          onClick={handleActiveButton}
        >
          <PlusIcon
            size={18}
            className={cn(
              'text-white transition-all duration-300',
              isActive && 'transform rotate-[135deg]',
            )}
          />
        </Button>

        <div
          className={cn(
            'absolute top-2/3 left-1/2 flex justify-center items-center',
          )}
        >
          <div className="relative">
            <PopButton
              rotate="-72deg"
              isActive={isActive}
              onClick={handleUploadButtonClick}
              icon={
                <Camera
                  className="text-slate-400 hover:text-white"
                  size={18}
                  style={{ transform: 'rotate(72deg)' }}
                />
              }
            />

            {popButtons.map((button, index) => (
              <PopButton
                key={index}
                rotate={button.rotate}
                isActive={isActive}
                icon={button.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <FormField
        control={form.control}
        name="pictureProfile"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                id="avatar-picture-upload"
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
