'use client';

import { memo } from 'react';

// Icons
import { AccountPlusIcon, LockClockIcon, MapMarkerIcon } from '@/icons';

// Components
import { Button, DialogClose, DialogFooter } from '@/components/ui';

const CONTROL_BUTTONS = [
  { icon: AccountPlusIcon },
  { icon: MapMarkerIcon },
  { icon: LockClockIcon },
];

export const NewsFeedShareDialogControl = memo(() => (
  <DialogFooter className="flex w-full sm:justify-between p-2 bg-black-haze-50 dark:bg-transparent border-t border-gray-600 dark:border-dark-500 rounded-b-xl">
    <div className="flex">
      {CONTROL_BUTTONS.map(({ icon: Icon }, index) => (
        <Button
          key={index}
          type="button"
          variant="unstyle"
          className="w-[34px] h-[34px] p-0 rounded-[4px] text-neutral-200 hover:dark:text-white hover:bg-gray-600 hover:dark:bg-dark-400"
        >
          <Icon className="w-[18px] h-[18px]" />
        </Button>
      ))}
    </div>
    <div className="flex gap-2">
      <DialogClose asChild>
        <Button
          type="button"
          variant="fixed"
          className="h-8 text-2xs px-5 border-gray-600 bg-gray-600 hover:bg-gray-800"
        >
          Cancel
        </Button>
      </DialogClose>
      <Button variant="primary" className="h-8 text-2xs px-5 bg-blue-600">
        Publish
      </Button>
    </div>
  </DialogFooter>
));

NewsFeedShareDialogControl.displayName = 'NewsFeedShareDialogControl';
