import { ComposeFeedCard } from './compose-feed-card';
import SuggestFriendsWidget from './suggest-friends-widget';

export const ActivityFeed = () => {
  return (
    <div className="py-5 min-h-full">
      <div className="h-full grid grid-cols-12 gap-6">
        <div className="hidden lg:flex col-span-3 flex-col gap-6">
          <h3>this is widgets 1</h3>
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <ComposeFeedCard />
        </div>
        <div className="hidden lg:flex col-span-3 flex-col gap-6">
          <SuggestFriendsWidget />
        </div>
      </div>
    </div>
  );
};
