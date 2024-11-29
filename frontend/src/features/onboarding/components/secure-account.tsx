'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { OnboardingFormWrapper } from './onboarding-form-wrapper';
import { OnboardingFormNavigation } from './onboarding-form-navigation';

// Libs
import { SecureAccountSchema } from '../lib';

// Stores
import { useOnboardingStore } from '../stores';

// Types
import { IUserRequest } from '@/types';

// Actions
import { register } from '../actions';

// Hooks
import { toast } from '@/hooks/use-toast';

export const SecureAccount = () => {
  const [currentStep, setCurrentStep, onboardingData, setOnboardingData] =
    useOnboardingStore((state) => [
      state.currentStep,
      state.setCurrentStep,
      state.onboardingData,
      state.setOnboardingData,
    ]);

  const form = useForm<z.infer<typeof SecureAccountSchema>>({
    resolver: zodResolver(SecureAccountSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
      phoneNumber: onboardingData.accountSecure.phoneNumber,
    },
  });

  const handleNextButton = useCallback(
    async ({ phoneNumber, password }: z.infer<typeof SecureAccountSchema>) => {
      const payload: IUserRequest = {
        username: onboardingData.aboutInfo.email,
        firstName: onboardingData.aboutInfo.firstName,
        lastName: onboardingData.aboutInfo.lastName,
        email: onboardingData.aboutInfo.email,
        password,
        phoneNumber,
        profilePicture: onboardingData.profilePicture,
        accountType: onboardingData.accountType,
      };

      const response = await register(payload);

      if (response?.error) {
        return toast({
          title: 'Error messages:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
              <code className="text-white">{response?.error}</code>
            </pre>
          ),
        });
      }

      setOnboardingData({
        ...onboardingData,
        accountSecure: {
          phoneNumber,
        },
      });

      setCurrentStep(currentStep + 1);
    },
    [currentStep, onboardingData, setCurrentStep, setOnboardingData],
  );

  const handleBackButton = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep, setCurrentStep]);

  return (
    <OnboardingFormWrapper title="Secure your account.">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNextButton)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex flex-col w-full gap-5 p-[30px] bg-white dark:bg-dark-800 border rounded-md">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem variant="bordered">
                  <FormLabel
                    className="dark:text-slate-200 text-slate-600"
                    size="tiny"
                  >
                    PASSWORD
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-slate-300 text-slate-500"
                      variant="ghost"
                      type="password"
                      placeholder="Choose a password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem variant="bordered">
                  <FormLabel
                    className="dark:text-slate-200 text-slate-600"
                    size="tiny"
                  >
                    REPEAT PASSWORD
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-slate-300 text-slate-500"
                      variant="ghost"
                      type="password"
                      placeholder="Repeat your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem variant="bordered">
                  <FormLabel
                    className="dark:text-slate-200 text-slate-600"
                    size="tiny"
                  >
                    PHONE NUMBER
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-slate-300 text-slate-500"
                      variant="ghost"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <OnboardingFormNavigation
            isDisabled={!form.formState.isValid}
            onBackClick={handleBackButton}
          />
        </form>
      </Form>
    </OnboardingFormWrapper>
  );
};
