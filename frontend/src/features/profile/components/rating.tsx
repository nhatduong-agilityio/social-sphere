import { memo } from 'react';

// Icons
import { StarIcon } from '@/icons/star-icon';

// Constants
import { MAX_RATING } from '@/constants';

interface RatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

export const Rating = memo(({ initialRating = 0 }: RatingProps) => (
  <div className="flex space-x-1">
    {Array.from({ length: MAX_RATING }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= initialRating;

      return <StarIcon key={starValue} isActive={isFilled} />;
    })}
  </div>
));

Rating.displayName = 'Rating';
