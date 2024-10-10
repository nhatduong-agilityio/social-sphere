import React, { memo } from 'react';

import { Circle } from '@/components/ui/circle';
import { cn } from '@/utils/cn';

interface CircleOverlayProps {
  children: React.ReactNode;
  circleContent?: React.ReactNode;
  className?: string;
  circleClassName?: string;
  circleSize?: 'default' | 'tiny';
}

export const CircleOverlay = memo(
  ({
    children,
    circleContent,
    className = '',
    circleClassName = '',
    circleSize = 'default',
  }: CircleOverlayProps) => {
    return (
      <div className={cn('relative w-9 h-9', className)}>
        {children}
        <Circle
          size={circleSize}
          className={cn(
            'border-[1.4px] border-background absolute top-0 right-0 bg-secondary',
            circleClassName,
          )}
        >
          {circleContent}
        </Circle>
      </div>
    );
  },
);

CircleOverlay.displayName = 'CircleOverlay';
