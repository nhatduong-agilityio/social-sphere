'use client';

import { useCallback } from 'react';

// Constants
import { SELECT_ACCOUNT_TYPES } from '../constants';

// Components
import { OnboardingHeader } from './onboarding-header';
import { SelectAccountTypeImage } from './select-account-type-image';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@/components/ui';

// Stores
import { useOnboardingStore } from '../stores';

// Models
import { OnboardingAccountType } from '../models';

export const SelectAccountType = () => {
  const [currentStep, setCurrentStep, onboardingData, setOnboardingData] =
    useOnboardingStore((state) => [
      state.currentStep,
      state.setCurrentStep,
      state.onboardingData,
      state.setOnboardingData,
    ]);

  const handleContinueButton = useCallback(
    (accountType: OnboardingAccountType) => {
      setCurrentStep(currentStep + 1);
      setOnboardingData({ ...onboardingData, accountType });
    },
    [currentStep, onboardingData, setCurrentStep, setOnboardingData],
  );

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <OnboardingHeader title="Welcome, select an account type." />
      <div className="flex flex-col md:flex-row animate-fade-in-left gap-6">
        {SELECT_ACCOUNT_TYPES.map(
          ({ mainSrc, subDarkSrc, subLightSrc, title, description }, index) => (
            <Card key={`${title}-${index}`} className="p-2.5">
              <CardHeader className="text-center pt-2.5">
                <SelectAccountTypeImage
                  mainSrc={mainSrc}
                  subLightSrc={subLightSrc}
                  subDarkSrc={subDarkSrc}
                  alt={title}
                />
                <CardTitle className="font-montserrat text-base font-semibold py-2">
                  {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full dark:text-slate-200 text-slate-600"
                  onClick={() => handleContinueButton(title)}
                >
                  Continue
                </Button>
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </div>
  );
};
