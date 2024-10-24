// Icons
import {
  FlagIcon,
  ImageIcon,
  LockIcon,
  SmileIcon,
  UserIcon,
} from 'lucide-react';

import {
  OnboardingAccountType,
  OnboardingStep,
  OnboardingStepData,
} from '../models';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    stepNumber: 1,
    label: 'Select an account type',
    description: 'Select an account type to get started',
    icon: <SmileIcon size={16} />,
  },
  {
    stepNumber: 2,
    label: 'About your info',
    description: 'About your info to get started',
    icon: <UserIcon size={16} />,
  },
  {
    stepNumber: 3,
    label: 'Update image profile',
    description: 'Update image profile to get started',
    icon: <ImageIcon size={16} />,
  },
  {
    stepNumber: 4,
    label: 'Secure your account',
    description: 'Secure your account to get started',
    icon: <LockIcon size={16} />,
  },
  {
    stepNumber: 5,
    label: 'Completed',
    description: 'Completed to get started',
    icon: <FlagIcon size={16} />,
  },
];

export const AUTH_INITIAL_STATE: OnboardingStepData = {
  accountType: OnboardingAccountType.PublicPerson,
  aboutInfo: {
    firstName: '',
    lastName: '',
    email: '',
  },
  profilePicture: '',
  accountSecure: {
    phoneNumber: '',
  },
};
