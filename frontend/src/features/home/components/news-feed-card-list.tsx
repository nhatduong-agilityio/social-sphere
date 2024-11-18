'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';

// Components
import { NewsFeedCardDetail } from './news-feed-card-detail';

// Models
import { NewsFeedIdModel } from '@/models';

interface NewsFeedCardListProps {
  authorId: string;
  newsFeedIds: NewsFeedIdModel[];
}

export const NewsFeedCardList = memo(
  ({ authorId, newsFeedIds }: NewsFeedCardListProps) => {
    const ITEMS_PER_BATCH = 2;
    const [displayedIds, setDisplayedIds] = useState<NewsFeedIdModel[]>([]);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const initialIds = newsFeedIds.slice(0, ITEMS_PER_BATCH);
      setDisplayedIds(initialIds);
    }, [newsFeedIds]);

    const loadMoreIds = useCallback(() => {
      setDisplayedIds((prev) => {
        const currentLength = prev.length;
        const nextItems = newsFeedIds.slice(
          currentLength,
          currentLength + ITEMS_PER_BATCH,
        );
        return [...prev, ...nextItems];
      });
    }, [newsFeedIds]);

    useEffect(() => {
      if (!lastItemRef.current) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (
            entry.isIntersecting &&
            displayedIds.length < newsFeedIds.length
          ) {
            loadMoreIds();
          }
        },
        { threshold: 0.1 },
      );

      observerRef.current.observe(lastItemRef.current);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [displayedIds.length, loadMoreIds, newsFeedIds.length]);

    return (
      <div className="flex flex-col gap-6">
        {displayedIds.map((newsFeedId, index) => (
          <div
            key={newsFeedId.id}
            ref={index === displayedIds.length - 1 ? lastItemRef : null}
            className="min-h-56"
          >
            <NewsFeedCardDetail
              newsFeedId={newsFeedId.id.toString()}
              authorId={authorId}
            />
          </div>
        ))}
      </div>
    );
  },
);

NewsFeedCardList.displayName = 'NewsFeedCardList';
