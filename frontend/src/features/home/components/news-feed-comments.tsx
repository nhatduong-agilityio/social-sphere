import { memo } from 'react';

// Icons
import { XIcon } from 'lucide-react';

// Components
import {
  Button,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { NewsFeedCommentPagination } from '@/types';
import { NewsFeedCommentList } from './news-feed-comment-list';
import { NewsFeedCommentForm } from './news-feed-comment-form';
import { MOCK_FRIENDS } from '@/__mocks__/user';

interface NewsFeedCommentsProps {
  comments: NewsFeedCommentPagination;
  onCloseComments: () => void;
}

export const NewsFeedComments = memo(
  ({ comments, onCloseComments }: NewsFeedCommentsProps) => {
    const {
      data: { totalComments, comments: commentsList },
    } = comments;

    return (
      <div>
        <CardHeader className="p-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base text-neutral-400">
            Comments ({totalComments})
          </CardTitle>
          <Button
            size="icon"
            variant="unstyle"
            className="bg-white hover:bg-gray-600 dark:bg-card hover:dark:bg-dark-500 rounded-full w-[30px] h-[30px]"
            onClick={onCloseComments}
          >
            <XIcon size={18} className="text-neutral-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 max-h-[450px] overflow-auto">
          {commentsList.map((comment, index) => (
            <NewsFeedCommentList
              key={comment.id}
              comment={comment}
              hasBorder={index > 0}
            />
          ))}
        </CardContent>
        <CardFooter className="p-4">
          <NewsFeedCommentForm user={MOCK_FRIENDS[0]} />
        </CardFooter>
      </div>
    );
  },
);

NewsFeedComments.displayName = 'NewsFeedComments';
