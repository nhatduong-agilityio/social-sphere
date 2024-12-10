'use client';

import { useTransition } from 'react';
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

import AvatarLogin from '@public/images/avatar-login.webp';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, formAction] = useFormState(login, undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialState,
  });

  const isDisabled =
    !form.formState.isDirty || !form.formState.isValid || isPending;

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Form {...form}>
      <form
        action={handleSubmit}
        className="flex flex-col w-full gap-3 max-w-[320px] md:max-w-[380px]"
      >
        <div className="flex flex-col items-center mb-2">
          <CircleOverlay
            className="md:w-[110px] w-16 md:h-[110px] h-16 rounded-full border border-gray-900 p-[7px]"
            circleClassName="border-3"
            circleContent={
              <CheckIcon size={12} className="text-white" strokeWidth={3} />
            }
          >
            <Avatar className="w-full h-full">
              <AvatarImage src={AvatarLogin.src} alt="Avatar Login" />
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
                  className="md:text-sm text-2xs"
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
                  className="md:text-sm text-2xs"
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
          className="w-full h-[46px] rounded-full bg-blue-600 border-blue-600 dark:text-slate-50"
          disabled={isDisabled}
          isLoading={isPending}
        >
          Login
        </Button>
        <Link href={ROUTER.ONBOARDING} className="flex justify-center">
          <Button variant="link" className="p-0 h-9 md:text-sm text-2xs">
            Do you need an account?
          </Button>
        </Link>
      </form>
      <div className="absolute top-3 right-3">
        <SwitchTheme />
      </div>
    </Form>
  );
};
