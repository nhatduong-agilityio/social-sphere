import { OnboardingHeader } from './onboarding-header';
import { SelectAccountTypeImage } from './select-account-type-image';

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

const accountTypes = [
  {
    mainSrc: Company,
    subLightSrc: LightFans,
    subDarkSrc: DarkFans,
    alt: 'Company',
  },
  {
    mainSrc: PublicPerson,
    subLightSrc: LightPersonMatrix,
    subDarkSrc: DarkPersonMatrix,
    alt: 'Public Person',
  },
  {
    mainSrc: Personal,
    subLightSrc: LightBuilding,
    subDarkSrc: DarkBuilding,
    alt: 'Personal',
  },
];

export const SelectAccountType = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <OnboardingHeader title="Welcome, select an account type." />
      <div className="flex flex-col md:flex-row animate-fade-in-left">
        {accountTypes.map((accountType, index) => (
          <div key={index}>
            <SelectAccountTypeImage
              mainSrc={accountType.mainSrc}
              subLightSrc={accountType.subLightSrc}
              subDarkSrc={accountType.subDarkSrc}
              alt={accountType.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
