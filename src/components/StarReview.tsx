import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'ruangjajan-product-ratings';

function readRatings(): Record<string, number> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function writeRatings(ratings: Record<string, number>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}

interface StarReviewProps {
  productId: string;
  defaultRating?: number;
  size?: number;
  className?: string;
  labelClassName?: string;
}

export function StarReview({
  productId,
  defaultRating = 0,
  size = 16,
  className,
  labelClassName
}: StarReviewProps) {
  const [rating, setRating] = React.useState(defaultRating);

  React.useEffect(() => {
    const ratings = readRatings();
    setRating(ratings[productId] ?? defaultRating);
  }, [productId, defaultRating]);

  const updateRating = (value: number) => {
    const ratings = readRatings();
    const nextRatings = { ...ratings, [productId]: value };
    writeRatings(nextRatings);
    setRating(value);
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Review rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="icon-action rounded-sm text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            updateRating(star);
          }}
        >
          <Star
            size={size}
            className={cn(star <= rating ? "fill-yellow-400" : "fill-none")}
          />
        </button>
      ))}
      <span className={cn("text-xs font-bold text-slate-700 ml-1", labelClassName)}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
