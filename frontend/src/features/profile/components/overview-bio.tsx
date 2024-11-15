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
import { OverviewSchema } from '../lib';

export const OverviewBio = () => {
  const form = useForm<z.infer<typeof OverviewSchema>>({
    resolver: zodResolver(OverviewSchema),
    defaultValues: {},
  });

  return (
    <Form {...form}>
      <form className="w-full h-full flex items-end gap-2 group justify-between dark:bg-slate-800 bg-white border rounded-md p-8">
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
          className="w-[48px] h-[42px] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
               rounded-full bg-blue-50 group-hover:bg-blue-100
               flex items-center justify-center transition-all duration-300 group-hover:rotate-180"
        >
          <ArrowLeft size={16} />
        </Button>
      </form>
    </Form>
  );
};
