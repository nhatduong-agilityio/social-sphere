'use client';

import { Fragment, memo, useState } from 'react';

// Icons
import { ChevronDownIcon } from 'lucide-react';

// Components
import {
  Button,
  Heading,
  Text,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui';

// Utils
import { cn } from '@/utils';

// Types
import { Option } from '@/types';

export const ShareDropdown = memo(({ options }: { options: Option[] }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="fixed"
          className={cn(
            'text-2xs border-none h-8 w-fit rounded-lg px-3 py-2.5 flex justify-center items-center gap-1 text-neutral-700 dark:text-white bg-black-haze-50 dark:bg-transparent hover:dark:bg-card transition-all duration-200',
            isOpen && 'bg-primary text-white',
          )}
        >
          <span
            className={cn(
              '[&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-neutral-700 [&>svg]:dark:text-white [&>svg]:transition-colors [&>svg]:duration-200',
              isOpen && '[&>svg]:text-white ',
            )}
          >
            {selectedOption.icon}
          </span>
          {selectedOption.label}
          <ChevronDownIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px] p-0 py-2">
        {options.map(({ label, description, value, icon: Icon }, index) => (
          <Fragment key={label}>
            {index === options.length - 1 && (
              <DropdownMenuSeparator className="my-2" />
            )}
            <DropdownMenuItem
              key={label}
              onClick={() =>
                setSelectedOption({ label, description, value, icon: Icon })
              }
              className="flex items-center gap-4 py-[6px] px-4 h-[50px] group"
            >
              {Icon}
              <div className="flex flex-col">
                <Heading
                  headingLevel="h3"
                  className="text-xs font-roboto group-hover:dark:text-primary"
                >
                  {label}
                </Heading>
                <Text variant="primary" className="text-2xs font-normal">
                  {description}
                </Text>
              </div>
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ShareDropdown.displayName = 'ShareDropdown';
