// Models
import { SelectAccountType } from '../models/select-account-type';
import { OnboardingAccountType } from '../models/onboarding';

export const SELECT_ACCOUNT_TYPES: SelectAccountType[] = [
  {
    mainSrc: '/images/company.svg',
    subLightSrc: '/images/light-fans.svg',
    subDarkSrc: '/images/dark-fans.svg',
    title: OnboardingAccountType.Company,
    description:
      'Create a company account to be able to do some awesome things.',
  },
  {
    mainSrc: '/images/public-person.svg',
    subLightSrc: '/images/light-person-matrix.svg',
    subDarkSrc: '/images/dark-person-matrix.svg',
    title: OnboardingAccountType.PublicPerson,
    description:
      'Create a public account to be able to do some awesome things.',
  },
  {
    mainSrc: '/images/personal.svg',
    subLightSrc: '/images/light-buildings.svg',
    subDarkSrc: '/images/dark-buildings.svg',
    title: OnboardingAccountType.Personal,
    description:
      'Create a personal account to be able to do some awesome things.',
  },
];
