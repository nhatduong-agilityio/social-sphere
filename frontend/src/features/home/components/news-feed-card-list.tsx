'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { NewsFeedCardDetail } from './news-feed-card-detail';

// Modesl
import { NewsFeedIdModel } from '@/models';

interface NewsFeedCardListProps {
  authorId: string;
  newsFeedIds: NewsFeedIdModel[];
}

export const NewsFeedCardList = memo(
  ({ authorId, newsFeedIds }: NewsFeedCardListProps) => {
    const [displayedIds, setDisplayedIds] = useState<NewsFeedIdModel[]>([]);
    const [visibleDetails, setVisibleDetails] = useState<Set<number>>(
      new Set(),
    );
    const observerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const ITEMS_PER_BATCH = 2;

    // Load first 2 items initially
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
      const observers: { [key: string]: IntersectionObserver } = {};

      displayedIds.forEach((newsFeedId) => {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];

            if (entry.isIntersecting) {
              // Add to visible set to trigger detail fetch
              setVisibleDetails((prev) => {
                const newSet = new Set(prev);
                newSet.add(newsFeedId.id);
                return newSet;
              });

              // If this is one of the last two items, load more
              const idIndex = displayedIds.indexOf(newsFeedId);
              if (
                idIndex >= displayedIds.length - 2 &&
                displayedIds.length < newsFeedIds.length
              ) {
                loadMoreIds();
              }
            } else {
              // Optionally, remove from visible set when out of view
              setVisibleDetails((prev) => {
                const newSet = new Set(prev);
                newSet.delete(newsFeedId.id);
                return newSet;
              });
            }
          },
          { threshold: 0.05 },
        );

        if (observerRefs.current[newsFeedId.id]) {
          observer.observe(observerRefs.current[newsFeedId.id]!);
        }

        observers[newsFeedId.id] = observer;
      });

      return () => {
        Object.values(observers).forEach((observer) => observer.disconnect());
      };
    }, [displayedIds, loadMoreIds, newsFeedIds.length]);

    const setRef = (id: number) => (element: HTMLDivElement | null) => {
      observerRefs.current[id] = element;
    };

    return (
      <div className="flex flex-col gap-6">
        {displayedIds.map((newsFeedId) => (
          <div
            key={newsFeedId.id}
            ref={setRef(newsFeedId.id)}
            className="min-h-56"
          >
            {visibleDetails.has(newsFeedId.id) && (
              <NewsFeedCardDetail
                newsFeedId={newsFeedId.id.toString()}
                authorId={authorId}
              />
            )}
          </div>
        ))}
      </div>
    );
  },
);

NewsFeedCardList.displayName = 'NewsFeedCardList';
