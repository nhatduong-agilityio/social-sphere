// Images
import Company from '../../../../public/images/company.svg';
import LightFans from '../../../../public/images/light-fans.svg';
import DarkFans from '../../../../public/images/dark-fans.svg';
import PublicPerson from '../../../../public/images/public-person.svg';
import LightPersonMatrix from '../../../../public/images/light-person-matrix.svg';
import DarkPersonMatrix from '../../../../public/images/dark-person-matrix.svg';
import Personal from '../../../../public/images/personal.svg';
import LightBuilding from '../../../../public/images/light-buildings.svg';
import DarkBuilding from '../../../../public/images/dark-buildings.svg';

// Models
import { SelectAccountType } from '../models/select-account-type';
import { OnboardingAccountType } from '../models/onboarding';

export const SELECT_ACCOUNT_TYPES: SelectAccountType[] = [
  {
    mainSrc: Company,
    subLightSrc: LightFans,
    subDarkSrc: DarkFans,
    title: OnboardingAccountType.Company,
    description:
      'Create a company account to be able to do some awesome things.',
  },
  {
    mainSrc: PublicPerson,
    subLightSrc: LightPersonMatrix,
    subDarkSrc: DarkPersonMatrix,
    title: OnboardingAccountType.PublicPerson,
    description:
      'Create a public account to be able to do some awesome things.',
  },
  {
    mainSrc: Personal,
    subLightSrc: LightBuilding,
    subDarkSrc: DarkBuilding,
    title: OnboardingAccountType.Personal,
    description:
      'Create a personal account to be able to do some awesome things.',
  },
];
