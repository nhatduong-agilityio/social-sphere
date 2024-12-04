import { PostSkeleton } from './post-skeleton';

export const PostListSkeleton = () => (
  <div className="flex flex-col gap-3 w-full">
    {Array.from({ length: 3 }).map((_, index) => (
      <PostSkeleton key={index} />
    ))}
  </div>
);
