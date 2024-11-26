'use client';

import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/ui';

// Hooks
import { toast } from '@/hooks';

// Libs
import { OverviewSchema } from '../lib';

// Types
import { UserModel } from '@/models';

// Actions
import { updateProfile } from '../actions';

// Utils
import { cn } from '@/utils';

interface OverviewBioProps {
  isDisabled?: boolean;
  user: UserModel;
}

export const OverviewBio = ({ isDisabled = false, user }: OverviewBioProps) => {
  const form = useForm<z.infer<typeof OverviewSchema>>({
    resolver: zodResolver(OverviewSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      location: user.location || {},
      bio: user.bio || '',
    },
  });

  const handleUpdateBio = async (data: z.infer<typeof OverviewSchema>) => {
    try {
      await updateProfile(user.username, {
        ...user,
        bio: data.bio,
      });

      toast({
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-500 p-4">
            <code className="text-white">Bio updated successfully</code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
            <code className="text-white">Something went wrong</code>
          </pre>
        ),
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateBio)}
        className="relative w-full h-full flex items-end gap-2 group justify-between dark:bg-slate-800 bg-white border rounded-md p-8"
      >
        <div className="flex w-full h-full items-center gap-3">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-full h-full space-y-0">
                <FormLabel className="text-lg dark:text-white">
                  About Me
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full h-56 p-0 border-none dark:bg-slate-800 text-slate-400 text-md"
                    variant="ghost"
                    placeholder="Enter your bio"
                    {...field}
                    disabled={isDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          title="bio-button"
          variant="rounded"
          size="icon"
          className={cn(
            'w-[42px] h-[42px] right-10 absolute opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 rounded-full bg-blue-50 group-hover:bg-blue-100 items-center justify-center transition-all duration-300 group-hover:rotate-180',
            isDisabled && 'hidden',
          )}
        >
          <ArrowLeft size={16} />
        </Button>
      </form>
    </Form>
  );
};
