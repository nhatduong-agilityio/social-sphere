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
} from '@/components/ui/form';
import { SecureAccountSchema } from '../lib/schema';
import { Input } from '@/components/ui/input';
import { OnboardingFormWrapper } from './onboarding-form-wrapper';
import { OnboardingFormNavigation } from './onboarding-form-navigation';

// Stores
import { useOnboardingStore } from '../stores/onboarding-steps';

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
    ({ phoneNumber }: z.infer<typeof SecureAccountSchema>) => {
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
                  <FormLabel size="tiny">PASSWORD</FormLabel>
                  <FormControl>
                    <Input
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
                  <FormLabel size="tiny">REPEAT PASSWORD</FormLabel>
                  <FormControl>
                    <Input
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
                  <FormLabel size="tiny">PHONE NUMBER</FormLabel>
                  <FormControl>
                    <Input
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
          <OnboardingFormNavigation onBackClick={handleBackButton} />
        </form>
      </Form>
    </OnboardingFormWrapper>
  );
};
