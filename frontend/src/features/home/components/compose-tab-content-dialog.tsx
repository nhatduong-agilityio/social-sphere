'use client';

import { memo, useCallback, useState } from 'react';
import Image from 'next/image';

// Components
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Circle } from '@/components/ui/circle';

// Utils
import { cn } from '@/utils/cn';

interface ComposeTabContentDialogProps {
  tabContent: {
    title: string;
    steps: {
      image: string;
      title: string;
      description: string;
    }[];
  };
}

export const ComposeTabContentDialog = memo(
  ({ tabContent }: ComposeTabContentDialogProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = useCallback(() => {
      if (currentStep < tabContent.steps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        setCurrentStep(0);
      }
    }, [currentStep, tabContent.steps.length]);

    const currentContent = tabContent.steps[currentStep];
    const isLastStep = currentStep === tabContent.steps.length - 1;

    return (
      <DialogContent className="p-0 gap-0 md:max-w-[480px]">
        <DialogHeader className="px-3 py-2 border-b border-gray-600 dark:border-dark-500">
          <DialogTitle>{tabContent.title}</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="flex flex-col items-center w-full py-2 px-3">
          <div className="w-[204px] h-[140px] relative my-5">
            <Image
              src={currentContent.image}
              alt={currentContent.title}
              fill
              quality={100}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="text-center max-w-[350px] mx-auto mb-4">
            <Heading headingLevel="h3" variant="title" size="base">
              {currentContent.title}
            </Heading>
            <Text variant="primary">{currentContent.description}</Text>
            <div className="flex justify-center gap-[6px] py-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <Circle
                  key={index}
                  className={cn(
                    'w-2 h-2',
                    index === currentStep
                      ? 'bg-primary'
                      : 'bg-gray-600 dark:bg-dark-100',
                  )}
                />
              ))}
            </div>
            <Button
              variant="primary"
              className="w-full max-w-[160px] mx-auto"
              onClick={handleNext}
              {...(isLastStep && { disabled: true })}
            >
              {isLastStep ? 'got it' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  },
);

ComposeTabContentDialog.displayName = 'ComposeTabContentDialog';
