export enum OnboardingAccountType {
  Company = 'Company',
  PublicPerson = 'Public Person',
  Personal = 'Personal',
}

export type OnboardingAboutInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type OnboardingProfilePictureUrl = string;

export type OnboardingAccountSecure = {
  phoneNumber: string;
};

export type OnboardingStepData = {
  accountType: OnboardingAccountType;
  aboutInfo: OnboardingAboutInfo;
  profilePicture: OnboardingProfilePictureUrl;
  accountSecure: OnboardingAccountSecure;
};

export type OnboardingStep = {
  label: string;
  description: string;
  icon: JSX.Element;
  stepNumber: number;
};
