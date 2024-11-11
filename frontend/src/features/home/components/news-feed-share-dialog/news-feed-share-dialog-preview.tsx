import { memo } from 'react';
import Image from 'next/image';

// Constants
import { IMAGES } from '@/constants';

// Components
import { Label } from '@/components/ui';
import { UserCardPopover } from '@/components/sections';
import { NewsFeedCardContent } from '../news-feed-card-content';
import { EarthIcon, EyeIcon } from '@/icons';

// Types
import { NewsFeed } from '@/types';

interface NewsFeedShareDialogPreviewProps {
  newsFeed: NewsFeed;
}

export const NewsFeedShareDialogPreview = memo(
  ({ newsFeed }: NewsFeedShareDialogPreviewProps) => (
    <div className="flex flex-col">
      <div className="relative h-[177px] md:h-[256px]">
        <Image
          src={IMAGES.PROFILE_BANNER_FALLBACK.url}
          alt={IMAGES.PROFILE_BANNER_FALLBACK.alt}
          fill
          quality={100}
          priority
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex flex-col border p-5 gap-5">
        <div className="flex justify-center gap-3">
          <UserCardPopover user={newsFeed.author} additionalClass="w-10 h-10" />
          <NewsFeedCardContent newsFeed={newsFeed} />
        </div>
        <div className="flex gap-2.5 items-center">
          <Label className="flex text-3xs text-neutral-200 dark:text-neutral-100 gap-0.5">
            <EarthIcon className="w-4 h-4" />
            Public
          </Label>
          <Label className="flex text-3xs text-neutral-200 dark:text-neutral-100 gap-0.5">
            <EyeIcon className="w-4 h-4" />
            163 views
          </Label>
        </div>
      </div>
    </div>
  ),
);

NewsFeedShareDialogPreview.displayName = 'NewsFeedShareDialogPreview';
