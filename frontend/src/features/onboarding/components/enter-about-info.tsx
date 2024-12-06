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

// Stores
import { useOnboardingStore } from '../stores';

// Libs
import { EnterAboutInfoSchema } from '../lib';

// Actions
import { checkEmailExists } from '../actions';

// Hooks
import { toast } from '@/hooks/use-toast';

export const EnterAboutInfo = () => {
  const [currentStep, setCurrentStep, onboardingData, setOnboardingData] =
    useOnboardingStore((state) => [
      state.currentStep,
      state.setCurrentStep,
      state.onboardingData,
      state.setOnboardingData,
    ]);

  const form = useForm<z.infer<typeof EnterAboutInfoSchema>>({
    resolver: zodResolver(EnterAboutInfoSchema),
    defaultValues: onboardingData.aboutInfo,
  });

  const handleNextButton = useCallback(
    async (aboutInfo: z.infer<typeof EnterAboutInfoSchema>) => {
      const userExist = await checkEmailExists(aboutInfo.email);

      if (userExist) {
        return toast({
          variant: 'destructive',
          title: 'Error',
          description:
            userExist && typeof userExist === 'object' && 'error' in userExist
              ? userExist.error
              : 'Email already exists',
        });
      }

      setOnboardingData({ ...onboardingData, aboutInfo });
      setCurrentStep(currentStep + 1);
    },
    [currentStep, onboardingData, setCurrentStep, setOnboardingData],
  );

  const handleBackButton = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep, setCurrentStep]);

  return (
    <OnboardingFormWrapper title="Tell us more about you.">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNextButton)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex flex-col w-full gap-5 p-[30px] bg-white dark:bg-dark-800 border rounded-md">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem variant="bordered">
                  <FormLabel
                    className="dark:text-slate-200 text-slate-600"
                    size="tiny"
                  >
                    FIRST NAME
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-slate-300 text-slate-500"
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
              name="lastName"
              render={({ field }) => (
                <FormItem variant="bordered">
                  <FormLabel
                    className="dark:text-slate-200 text-slate-600"
                    size="tiny"
                  >
                    LAST NAME
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-slate-300 text-slate-500"
                      variant="ghost"
                      placeholder="Enter your last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem variant="bordered">
                  <FormLabel
                    className="dark:text-slate-200 text-slate-600"
                    size="tiny"
                  >
                    EMAIL
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-slate-300 text-slate-500"
                      variant="ghost"
                      type="email"
                      placeholder="Enter your email"
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
