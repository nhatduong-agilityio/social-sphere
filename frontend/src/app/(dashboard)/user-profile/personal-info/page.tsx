import LocationCard from '@/features/profile/components/location-card';
import Photo from '@/features/profile/components/photo';
import Video from '@/features/profile/components/video';
import { convertSecondsToMinutes } from '@/utils/number';

const PersonalInfoPage = () => {
  return (
    <div className="flex gap-10">
      <Photo
        src="https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/1.jpg"
        alt="https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/1.jpg"
      />
      <LocationCard
        title="New York, USA"
        src="https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/1.jpg"
        alt="https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/1.jpg"
      />
      <Video
        thumbnail="https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/1.jpg"
        alt="https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/1.jpg"
        videoSrc="https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/1.jpg"
        duration={convertSecondsToMinutes(200)}
      />
    </div>
  );
};

export default PersonalInfoPage;
