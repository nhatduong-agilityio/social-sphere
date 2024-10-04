'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Icons
import { CheckIcon, LockIcon, UserIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Circle } from '@/components/ui/circle';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SwitchTheme } from '@/components/sections/switch-theme';

// Hooks
import { toast } from '@/hooks/use-toast';

// Libs
import { FormSchema } from '../lib/schema';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-3 max-w-[320px] md:max-w-[380px]"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="w-[110px] h-[110px] rounded-full border border-border-quaternary p-[7px] relative">
            <Avatar className="w-full h-full">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Circle className="border-3 border-background absolute top-0 right-0 bg-sphere-green-10">
              <CheckIcon size={14} className="text-white" strokeWidth={3} />
            </Circle>
          </div>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  startIcon={<UserIcon size="18" />}
                  variant="icon"
                  placeholder="jennadavis@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  startIcon={<LockIcon size="18" />}
                  variant="icon"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="primary"
          type="submit"
          className="w-full h-[46px] rounded-full"
        >
          Login
        </Button>
        <Button variant="link" className="p-0 h-9">
          Forgot password?
        </Button>
      </form>
      <div className="absolute top-3 right-3">
        <SwitchTheme />
      </div>
    </Form>
  );
};
