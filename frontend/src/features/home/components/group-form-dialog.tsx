'use client';

import { memo, useCallback, useRef } from 'react';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';

// Hooks

import { AvatarSkeleton } from '@/components/sections';
import { useGroupForm } from '../hooks';
import { PlusIcon, XIcon } from 'lucide-react';

interface GroupFormDialogProps {
  isLoading?: boolean;
  onCreate: (data: FormData) => void;
}

export const GroupFormDialog = memo(
  ({ isLoading = false, onCreate }: GroupFormDialogProps) => {
    const {
      form,
      selectedImageUrl,
      getFormData,
      handleFileChange,
      handleRemoveMedia,
    } = useGroupForm();

    const mediaInputRef = useRef<HTMLInputElement>(null);

    const handleOptionClick = useCallback(() => {
      if (mediaInputRef.current) {
        mediaInputRef.current.value = '';
        mediaInputRef.current.click();
      }
    }, [mediaInputRef]);

    const handleAction = async (_: FormData) => {
      const values = form.getValues();
      const enrichedFormData = getFormData(values);
      return onCreate(enrichedFormData);
    };

    return (
      <DialogContent className="p-0 gap-0 md:max-w-[480px]">
        <Form {...form}>
          <form className="w-full" action={handleAction}>
            <DialogHeader className="p-2 border-b border-gray-600 dark:border-dark-500">
              <DialogTitle>Create a group</DialogTitle>
              <DialogDescription className="hidden" />
            </DialogHeader>
            <div className="flex flex-col items-center w-full gap-5 p-5">
              <div className="w-[120px] h-[120px] rounded-full border-[1.4px] border-gray-900 dark:border-blue-800 relative">
                <Avatar className="w-full h-full">
                  {isLoading ? (
                    <AvatarSkeleton customClass="w-[120px] h-[120px]" />
                  ) : (
                    <>
                      <AvatarImage
                        src={
                          selectedImageUrl || '/images/avatar-placeholder.svg'
                        }
                        alt="Profile picture"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </>
                  )}
                </Avatar>
                {selectedImageUrl ? (
                  <Button
                    size="icon"
                    variant="unstyle"
                    className="absolute top-[-4px] right-[-4px] bg-white hover:bg-gray-600 dark:bg-dark-900 hover:dark:bg-dark-900 rounded-full w-[30px] h-[30px]"
                    onClick={handleRemoveMedia}
                  >
                    <XIcon size={16} className="text-neutral-400" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="rounded"
                    size="icon"
                    className="border-3 bg-gray-900 hover:bg-blue-600 border-white dark:border-dark-800 absolute top-0 right-0 w-9 h-9"
                    onClick={handleOptionClick}
                    aria-label="Upload profile picture"
                  >
                    <PlusIcon
                      size={14}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </Button>
                )}
              </div>
              <FormField
                control={form.control}
                name="avatar"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="profile-picture-upload"
                        type="file"
                        ref={mediaInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        aria-label="Upload profile picture"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col w-full gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem variant="bordered">
                      <FormLabel size="tiny">Group Name</FormLabel>
                      <FormControl>
                        <Input
                          variant="ghost"
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem variant="bordered">
                      <FormLabel size="tiny">Description</FormLabel>
                      <FormControl>
                        <Input
                          variant="ghost"
                          placeholder="Enter your last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="fixed"
                    className="h-8 text-2xs px-5 border-gray-600 bg-gray-600 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="primary"
                  className="h-8 text-2xs px-5 bg-blue-600"
                >
                  Publish
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    );
  },
);

GroupFormDialog.displayName = 'GroupFormDialog';
