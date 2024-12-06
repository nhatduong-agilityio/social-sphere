import { memo } from 'react';
import {
  HeartIcon,
  Link2Icon,
  MessageCircleIcon,
  LucideIcon,
} from 'lucide-react';

// Components
import { Label } from '@/components/ui';

interface NewsFeedSocialCountProps {
  numberOfLikes: number;
  numberOfShares: number;
  numberOfComments: number;
}

interface SocialCountItemProps {
  Icon: LucideIcon;
  count: number;
}

const SocialCountItem = ({ Icon, count }: SocialCountItemProps) => (
  <div className="flex items-center text-neutral-300">
    <Icon size={18} />
    <Label className="text-sm px-[5px]">{count}</Label>
  </div>
);

export const NewsFeedSocialCount = memo(
  ({
    numberOfLikes,
    numberOfShares,
    numberOfComments,
  }: NewsFeedSocialCountProps) => (
    <div className="flex items-center gap-[6px] px-[3px]">
      <SocialCountItem Icon={HeartIcon} count={numberOfLikes} />
      <SocialCountItem Icon={Link2Icon} count={numberOfShares} />
      <SocialCountItem Icon={MessageCircleIcon} count={numberOfComments} />
    </div>
  ),
);

NewsFeedSocialCount.displayName = 'NewsFeedSocialCount';
