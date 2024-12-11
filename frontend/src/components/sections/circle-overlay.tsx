import React, { memo } from 'react';

import { Circle } from '@/components/ui';
import { cn } from '@/utils';

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
  }: CircleOverlayProps) => (
    <div
      className={cn('relative w-9 h-9', className)}
      data-testid="circle-overlay"
    >
      {children}
      <Circle
        data-testid="circle"
        size={circleSize}
        className={cn(
          'border-[1.4px] border-background absolute md:bottom-20 md:left-20 bottom-10 left-10 bg-secondary',
          circleClassName,
        )}
      >
        {circleContent}
      </Circle>
    </div>
  ),
);

CircleOverlay.displayName = 'CircleOverlay';
