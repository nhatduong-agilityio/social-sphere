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
  Input,
} from '@/components/ui';

// Hooks
import { OverviewSchema } from '../lib';

// Types
import { UserModel } from '@/models';

// Actions
import { updateProfile } from '../actions';

// Hooks
import { toast } from '@/hooks';

interface OverviewInputProps {
  nameField: 'firstName' | 'lastName' | 'job';
  nameLabel: string;
  placeholder: string;
  user: UserModel;
  icon: JSX.Element;
}

export const OverviewInput = ({
  icon,
  nameField,
  nameLabel,
  user,
  placeholder,
}: OverviewInputProps) => {
  const form = useForm<z.infer<typeof OverviewSchema>>({
    resolver: zodResolver(OverviewSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      location: user.location || {},
      job: user.job || '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof OverviewSchema>) => {
    try {
      await updateProfile(user.username, {
        ...user,
        [nameField]: data[nameField],
      });

      toast({
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-500 p-4">
            <code className="text-white">{nameLabel} updated successfully</code>
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
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center group justify-between dark:bg-slate-800 bg-white border rounded-md p-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">{icon}</div>

          <FormField
            control={form.control}
            name={nameField}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel size="tiny">{nameLabel}</FormLabel>
                <FormControl>
                  <Input
                    className="h-6 p-0 border-none dark:bg-slate-800 text-slate-400 text-2xs"
                    variant="ghost"
                    placeholder={placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          variant="rounded"
          size="icon"
          className="w-[42px] h-[42px] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
               rounded-full bg-blue-50 group-hover:bg-blue-100
               flex items-center justify-center transition-all duration-300 group-hover:rotate-180"
        >
          <ArrowLeft size={16} />
        </Button>
      </form>
    </Form>
  );
};
