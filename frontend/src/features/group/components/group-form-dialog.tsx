'use client';

import { memo, useCallback, useRef, useTransition } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';

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
import { GroupDetail, GroupRole, UserDetail } from '@/types';
import { useSession } from 'next-auth/react';

interface GroupFormDialogProps {
  initialValues?: {
    name: string;
    description?: string;
    avatar?: string;
  };
  onCreate: (data: FormData) => void;
  onAddOptimisticGroups: (action: GroupDetail) => void;
}

export const GroupFormDialog = memo(
  ({
    initialValues,
    onCreate,
    onAddOptimisticGroups,
  }: GroupFormDialogProps) => {
    const { data: session } = useSession();
    const user = session?.user as UserDetail;

    const {
      form,
      selectedImageUrl,
      getFormData,
      handleFileChange,
      handleRemoveMedia,
    } = useGroupForm(initialValues);
    const [isPending, startTransition] = useTransition();

    const mediaInputRef = useRef<HTMLInputElement>(null);

    const handleOptionClick = useCallback(() => {
      if (mediaInputRef.current) {
        mediaInputRef.current.value = '';
        mediaInputRef.current.click();
      }
    }, [mediaInputRef]);

    const handleAction = async (_: FormData) => {
      const newGroup: GroupDetail = {
        id: user.id + 1,
        avatar: selectedImageUrl,
        createdAt: new Date().toISOString(),
        documentId: user.documentId || '',
        name: form.getValues('name'),
        description: form.getValues('description'),
        isPrivate: true,
        members: [
          {
            id: user.id + 1,
            documentId: user.documentId || '',
            role: GroupRole.ADMIN,
            user,
          },
        ],
        author: user,
        newsFeeds: [],
      };

      startTransition(() => {
        onAddOptimisticGroups(newGroup);

        const values = form.getValues();
        const enrichedFormData = getFormData(values);
        onCreate(enrichedFormData);
      });
    };

    return (
      <DialogContent className="p-0 gap-0 md:max-w-[480px]">
        <Form {...form}>
          <form
            data-testid="group-form"
            className="w-full"
            action={handleAction}
          >
            <DialogHeader className="p-2 border-b border-gray-600 dark:border-dark-500">
              <DialogTitle data-testid="dialog-title">
                Create a group
              </DialogTitle>
              <DialogDescription className="hidden" />
            </DialogHeader>
            <div className="flex flex-col items-center w-full gap-5 p-5">
              <div className="w-[120px] h-[120px] rounded-full border-[1.4px] border-gray-900 dark:border-blue-800 relative">
                <Avatar className="w-full h-full">
                  {isPending ? (
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
                    data-testid="remove-media-button"
                    size="icon"
                    variant="unstyle"
                    className="absolute top-[-4px] right-[-4px] bg-white hover:bg-gray-600 dark:bg-dark-900 hover:dark:bg-dark-900 rounded-full w-[30px] h-[30px]"
                    onClick={handleRemoveMedia}
                  >
                    <XIcon size={16} className="text-neutral-400" />
                  </Button>
                ) : (
                  <Button
                    data-testid="upload-button"
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
                        data-testid="file-input"
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
                          data-testid="group-name-input"
                          variant="ghost"
                          placeholder="Enter your group name"
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
                          data-testid="description-input"
                          variant="ghost"
                          placeholder="Enter description"
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
                  data-testid="publish-button"
                  variant="primary"
                  className="h-8 text-2xs px-5 bg-blue-600"
                  isLoading={isPending}
                  disabled={isPending}
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
