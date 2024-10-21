'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react';

import { cn } from '@/utils/cn';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 16, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-[300px] rounded-md border border-t-0 bg-popover p-4 text-popover-foreground shadow-sphere-light outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    >
      {props.children}
      <PopoverPrimitive.Arrow className="fill-current text-popover w-3" />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

interface PopoverContainerProps {
  trigger: ReactNode;
  content: ReactNode;
  contentClassName?: string;
}

const PopoverContainer = ({
  trigger,
  content,
  contentClassName,
}: PopoverContainerProps) => (
  <Popover>
    <PopoverTrigger>{trigger}</PopoverTrigger>
    <PopoverContent className={contentClassName}>{content}</PopoverContent>
  </Popover>
);

export { Popover, PopoverTrigger, PopoverContent, PopoverContainer };
