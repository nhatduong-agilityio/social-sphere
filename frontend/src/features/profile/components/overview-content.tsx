// Components
import { OverviewInput } from './overview-input';
import { OverviewBio } from './overview-bio';

// Icons
import { LocationIcon, StudyIcon, WorkIcon } from '@/icons';

export const OverviewContent = () => (
  <div className="flex gap-3 md:flex-row flex-col">
    <div className="flex w-full gap-4 flex-col">
      <OverviewInput
        nameField="firstName"
        icon={<WorkIcon className="rounded-full" />}
        nameLabel="FIRST NAME"
        placeholder="Enter your first name"
      />

      <OverviewInput
        nameField="lastName"
        icon={<WorkIcon className="rounded-full" />}
        nameLabel="LAST NAME"
        placeholder="Enter your last name"
      />

      <OverviewInput
        nameField="job"
        icon={<StudyIcon className="rounded-full" />}
        nameLabel="JOB"
        placeholder="Enter your job"
      />

      <OverviewInput
        nameField="location"
        icon={<LocationIcon className="rounded-full" />}
        nameLabel="LOCATION"
        placeholder="Enter your location"
      />
    </div>

    <OverviewBio />
  </div>
);
