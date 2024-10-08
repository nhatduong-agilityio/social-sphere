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
  FormMessage,
} from '@/components/ui/form';
import { EnterAboutInfoSchema } from '../lib/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OnboardingFormWrapper } from './onboarding-form-wrapper';

// Stores
import { useOnboardingStore } from '../stores/onboarding-steps';

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
    (aboutInfo: z.infer<typeof EnterAboutInfoSchema>) => {
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
          className="flex flex-col gap-5 w-full max-w-[330px] md:max-w-[540px] animate-fade-in-left"
        >
          <div className="flex flex-col w-full gap-3 p-[30px] bg-card rounded-md">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button onClick={handleBackButton}>Back</Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </OnboardingFormWrapper>
  );
};
