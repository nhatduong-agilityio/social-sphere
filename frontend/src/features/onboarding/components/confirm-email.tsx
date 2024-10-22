import Image from 'next/image';
import { OnboardingFormWrapper } from './onboarding-form-wrapper';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export const ConfirmEmail = () => (
  <OnboardingFormWrapper title="You're all set. Ready?">
    <div className="flex flex-col items-center w-full gap-5 p-[30px] bg-white dark:bg-dark-800 border rounded-md">
      <div className="relative w-[120px] h-[120px]">
        <Image
          src="/images/mailbox.svg"
          alt="Confirm Email Image"
          fill
          quality={100}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="text-center max-w-[370px] my-3 mx-auto">
        <Heading headingLevel="h3" variant="title" size="base">
          Congratz, you successfully created your account.
        </Heading>
        <Text variant="primary">
          We just sent you a confirmation email. PLease confirm your account
          within 24 hours.
        </Text>
        <Button className="w-full max-w-[280px] mx-auto mt-5 text-primary dark:text-white hover:text-white border-primary">
          Let Me In
        </Button>
      </div>
    </div>
  </OnboardingFormWrapper>
);
