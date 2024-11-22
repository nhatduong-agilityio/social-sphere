// Components
import { OverviewInput } from './overview-input';
import { LocationPicker } from './location-picker';
import { OverviewBio } from './overview-bio';

// Icons
import { StudyIcon, WorkIcon } from '@/icons';

// Actions
import { getProfile } from '../actions';

// Auth
import { auth } from '@/auth';

interface OverviewContentProps {
  username: string;
}

export const OverviewContent = async ({ username }: OverviewContentProps) => {
  const profile = await getProfile(username);
  const { user } = (await auth()) ?? {};
  const isDisabled = user?.id !== String(profile.id);

  return (
    <div className="flex gap-3 md:flex-row flex-col">
      <div className="flex w-full gap-4 flex-col">
        <OverviewInput
          user={profile}
          nameField="firstName"
          icon={<WorkIcon className="rounded-full" />}
          nameLabel="FIRST NAME"
          placeholder="Enter your first name"
          isDisabled={isDisabled}
        />

        <OverviewInput
          user={profile}
          nameField="lastName"
          icon={<WorkIcon className="rounded-full" />}
          nameLabel="LAST NAME"
          placeholder="Enter your last name"
          isDisabled={isDisabled}
        />

        <OverviewInput
          user={profile}
          nameField="job"
          icon={<StudyIcon className="rounded-full" />}
          nameLabel="JOB"
          placeholder="Enter your job"
          isDisabled={isDisabled}
        />

        <LocationPicker user={profile} isDisabled={isDisabled} />
      </div>

      <OverviewBio user={profile} isDisabled={isDisabled} />
    </div>
  );
};
