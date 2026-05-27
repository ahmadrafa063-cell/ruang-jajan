import type { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

type BrandMarkProps = HTMLAttributes<HTMLSpanElement> & {
  imageClassName?: string;
};

export function BrandMark({ className, imageClassName, ...props }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "motion-standard inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      <img
        src="/images/logo-mark.webp"
        alt=""
        className={cn("h-10 w-10 object-contain drop-shadow-sm rounded-full", imageClassName)}
        loading="eager"
        fetchpriority="high"
      />
    </span>
  );
}
