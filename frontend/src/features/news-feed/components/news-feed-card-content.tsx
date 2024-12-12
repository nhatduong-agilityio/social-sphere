import { Fragment, memo, useMemo } from 'react';
import { NewsFeed } from '@/types';
import { Label, LinkWithIcon, Text } from '@/components/ui';
import { getMoodOptions } from '../utils';
import { MOODS } from '../constants';
import { ROUTER } from '@/constants';
import { cn, getFullName } from '@/utils';
import { ComposeGifPreview } from './compose-gif-preview';

interface NewsFeedCardContentProps {
  newsFeed: NewsFeed;
}

interface LinkWithIconWrapperProps {
  url: string;
  text: string;
}

const LinkWithIconWrapper = ({ url, text }: LinkWithIconWrapperProps) => (
  <LinkWithIcon
    url={url}
    text={text}
    additionalClass="border-none w-fit text-sm text-primary hover:bg-transparent"
  />
);

export const NewsFeedCardContent = memo(
  ({ newsFeed }: NewsFeedCardContentProps) => {
    const { content, gifUrl, tagFriends, mood, location, sharedLink } =
      newsFeed;

    const displayMoodOptions = useMemo(() => {
      if (!mood) return null;

      const { title, content: moodContent } = mood;
      const { moodOption, moodDetail } = getMoodOptions(title, moodContent);

      if (!moodDetail) return null;
      return (
        <>
          {moodOption.value !== MOODS.STATUS && `is ${moodOption.label} `}
          <Label className="text-sm text-primary">{moodDetail.label}</Label>.
        </>
      );
    }, [mood]);

    const displayTaggedFriends = useMemo(() => {
      if (!tagFriends?.length) return null;

      return (
        <>
          &nbsp;with&nbsp;
          {tagFriends.map((friend, index) => (
            <Fragment key={friend.id}>
              <LinkWithIconWrapper
                url={ROUTER.PROFILE_ID_PERSONAL_INFO(friend.username)}
                text={getFullName(friend.firstName, friend.lastName)}
              />
              {index < tagFriends.length - 2 && ', '}
              {index === tagFriends.length - 2 && ' and '}
            </Fragment>
          ))}
          .
        </>
      );
    }, [tagFriends]);

    const displayLocation = useMemo(() => {
      if (!location) return null;

      return (
        <>
          &nbsp;at the&nbsp;
          <LinkWithIconWrapper url="#" text={location} />.
        </>
      );
    }, [location]);

    return (
      <div className="flex flex-col font-roboto">
        <Text
          className={cn(
            'dark:text-slate-400 text-slate-600 whitespace-break-spaces text-wrap',
            (gifUrl || sharedLink) && 'mb-3',
          )}
        >
          <Label className="flex items-center flex-wrap text-sm font-normal dark:text-slate-400 text-slate-600">
            {displayMoodOptions}
            {displayTaggedFriends}
            {displayLocation}
          </Label>
          {content}
        </Text>
        {gifUrl && <ComposeGifPreview imageUrl={gifUrl} />}
        {sharedLink && (
          <LinkWithIconWrapper url={sharedLink} text={sharedLink} />
        )}
      </div>
    );
  },
);

NewsFeedCardContent.displayName = 'NewsFeedCardContent';
