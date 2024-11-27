'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { z } from 'zod';

// Icons
import { CheckIcon, LockIcon, UserIcon } from 'lucide-react';

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
  FormMessage,
  Input,
  Text,
} from '@/components/ui';
import { SwitchTheme, CircleOverlay } from '@/components/sections';

// Libs
import { FormSchema } from '../lib';

// Actions
import { login } from '../actions';

// Constants
import { ROUTER } from '@/constants';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const [errorMessage, formAction] = useFormState(login, undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialState,
  });

  const isDisabled = !form.formState.isDirty || !form.formState.isValid;

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="flex flex-col w-full gap-3 max-w-[320px] md:max-w-[380px]"
      >
        <div className="flex flex-col items-center mb-2">
          <CircleOverlay
            className="w-[110px] h-[110px] rounded-full border border-gray-900 p-[7px]"
            circleClassName="border-3"
            circleContent={
              <CheckIcon size={14} className="text-white" strokeWidth={3} />
            }
          >
            <Avatar className="w-full h-full">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CircleOverlay>
        </div>
        <FormField
          control={form.control}
          name="email"
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
                  title="password"
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

        {errorMessage && (
          <Text className="text-sm text-red-500">{errorMessage}</Text>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-full h-[46px] rounded-full bg-blue-600 border-blue-600"
          disabled={isDisabled}
        >
          Login
        </Button>
        <Button variant="link" className="p-0 h-9">
          <Link href={ROUTER.ONBOARDING}>Do you need an account?</Link>
        </Button>
      </form>
      <div className="absolute top-3 right-3">
        <SwitchTheme />
      </div>
    </Form>
  );
};
