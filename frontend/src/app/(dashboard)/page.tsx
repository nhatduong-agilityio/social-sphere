import { Suspense } from 'react';
import { Briefcase, Gift } from 'lucide-react';

// Components
import { WidgetSkeleton } from '@/components/sections';
import { ActivityFeed } from '@/features/news-feed/components';
import { FeedSkeleton } from '@/features/news-feed/components/skeletons';
import { NewsFeedsContext } from '@/features/news-feed/constants';
import {
  AcceptFriendsContent,
  StoriesWidget,
  SuggestFriendsContent,
} from '@/features/friend/components';
import { GroupsWidget } from '@/features/group/components';
import { NotificationWidget } from '@/features/notification/components';

// Icons
import { BirthdayIcon, JobIcon } from '@/icons';

const Homepage = () => (
  <div className="py-5 min-h-full">
    <div className="h-full grid grid-cols-12 gap-6">
      <div className="hidden lg:flex col-span-3 flex-col gap-6">
        <Suspense fallback={<WidgetSkeleton />}>
          <AcceptFriendsContent />
        </Suspense>

        <Suspense fallback={<WidgetSkeleton />}>
          <GroupsWidget />
        </Suspense>
      </div>
      <Suspense fallback={<FeedSkeleton />}>
        <ActivityFeed newsFeedContext={NewsFeedsContext.COMMUNITY} />
      </Suspense>

      <div className="hidden lg:flex col-span-3 flex-col gap-6">
        <StoriesWidget />
        <NotificationWidget
          avatar="/images/avatar-placeholder.svg"
          iconContent={<BirthdayIcon />}
          customClass="bg-green-100 dark:bg-green-100"
          title="Dan turns 31 today!"
          description="Send him your best wishes by leaving something on his wall."
          iconHeader={<Gift size={24} className="text-white" />}
          styleNotificationClass="border-2 border-green-100"
          notificationCount={27}
        />

        <Suspense fallback={<WidgetSkeleton />}>
          <SuggestFriendsContent />
        </Suspense>

        <NotificationWidget
          avatar="/images/avatar-placeholder.svg"
          iconContent={<JobIcon />}
          customClass="bg-blue-600 dark:bg-blue-600"
          title="Nelly has a new job!"
          description="Send her message congratulating her for getting this job."
          iconHeader={<Briefcase size={24} className="text-white" />}
          styleNotificationClass="border-2 border-blue-600"
        />
      </div>
    </div>
  </div>
);

export default Homepage;
