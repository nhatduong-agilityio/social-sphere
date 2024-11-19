// Components
import { OverviewInput } from './overview-input';
import { OverviewBio } from './overview-bio';

// Icons
import { StudyIcon, WorkIcon } from '@/icons';

// Actions
import { getProfile } from '../actions';

// Components
import { LocationPicker } from './location-picker';

interface OverviewContentProps {
  username: string;
}

export const OverviewContent = async ({ username }: OverviewContentProps) => {
  const profile = await getProfile(username);

  return (
    <div className="flex gap-3 md:flex-row flex-col">
      <div className="flex w-full gap-4 flex-col">
        <OverviewInput
          user={profile}
          nameField="firstName"
          icon={<WorkIcon className="rounded-full" />}
          nameLabel="FIRST NAME"
          placeholder="Enter your first name"
        />

        <OverviewInput
          user={profile}
          nameField="lastName"
          icon={<WorkIcon className="rounded-full" />}
          nameLabel="LAST NAME"
          placeholder="Enter your last name"
        />

        <OverviewInput
          user={profile}
          nameField="job"
          icon={<StudyIcon className="rounded-full" />}
          nameLabel="JOB"
          placeholder="Enter your job"
        />

        <LocationPicker user={profile} />
      </div>

      <OverviewBio user={profile} />
    </div>
  );
};
