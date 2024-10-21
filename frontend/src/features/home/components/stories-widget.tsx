import { EllipsisVertical, Plus } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserPopover from '@/components/sections/user-popover';
import StoryMeta from '@/features/home/components/story-meta';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__/user';

// Utils
import { getFullName } from '@/utils/string';

interface StoriesWidgetProps {
  onAddStory: () => void;
}

const StoriesWidget = ({ onAddStory }: StoriesWidgetProps) => {
  const renderStoriesFriends = MOCK_FRIENDS.slice(0, 3).map((user) => (
    <div
      key={user.id}
      className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <UserPopover user={user} isStories={true} />

        <StoryMeta
          title={getFullName(user.firstName, user.lastName)}
          description={user.location?.city}
        />
      </div>
    </div>
  ));

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex flex-row px-4 py-2 justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-sm font-normal">Stories</CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <Button size="icon" variant="rounded" className="hover:bg-muted">
            <EllipsisVertical size={20} className="text-slate-600" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-0">
        <div className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="rounded"
              className="w-11 h-11 border-2 border-dashed dark:border-white group-hover:border-blue-200 hover:border-solid"
              onClick={onAddStory}
            >
              <Plus
                size={20}
                className="dark:text-white text-slate-300 group-hover:text-blue-200"
              />
            </Button>

            <StoryMeta
              title="Add a new story"
              description="Share an image, a video or some text"
            />
          </div>
        </div>

        {renderStoriesFriends}
      </CardContent>
    </Card>
  );
};

export default StoriesWidget;
