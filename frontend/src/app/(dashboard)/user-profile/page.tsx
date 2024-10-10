import ProfileHeader from '@/features/profile/components/profile-header';
import ProfileSubHeader from '@/features/profile/components/profile-sub-header';

const UserProfile = () => (
  <div className="py-2">
    <ProfileHeader />
    <ProfileSubHeader
      user={{
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        job: 'Engineer',
        countFriends: 3400,
      }}
    />
  </div>
);

export default UserProfile;
