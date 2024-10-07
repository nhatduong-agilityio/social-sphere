// Components
import { OnboardingHeader } from './onboarding-header';
import { SelectAccountTypeImage } from './select-account-type-image';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    title: 'Company',
    description:
      'Create a company account to be able to do some awesome things.',
  },
  {
    mainSrc: PublicPerson,
    subLightSrc: LightPersonMatrix,
    subDarkSrc: DarkPersonMatrix,
    title: 'Public Person',
    description:
      'Create a public account to be able to do some awesome things.',
  },
  {
    mainSrc: Personal,
    subLightSrc: LightBuilding,
    subDarkSrc: DarkBuilding,
    title: 'Personal',
    description:
      'Create a personal account to be able to do some awesome things.',
  },
];

export const SelectAccountType = () => {
  return (
    <div className="w-full flex flex-col items-center gap-12">
      <OnboardingHeader title="Welcome, select an account type." />
      <div className="flex flex-col md:flex-row animate-fade-in-left gap-6">
        {accountTypes.map(
          ({ mainSrc, subDarkSrc, subLightSrc, title, description }, index) => (
            <Card key={`${title}-${index}`} className="p-2.5">
              <CardHeader className="text-center">
                <SelectAccountTypeImage
                  mainSrc={mainSrc}
                  subLightSrc={subLightSrc}
                  subDarkSrc={subDarkSrc}
                  alt={title}
                />
                <CardTitle className="font-montserrat font-semibold py-2">
                  {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="primary" className="w-full">
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
