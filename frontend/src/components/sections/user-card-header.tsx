import { ComponentProps, Fragment, memo, ReactNode } from 'react';

// Icons
import { EllipsisVertical } from 'lucide-react';

// Components
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  CardHeader,
  CardDescription,
  CardTitle,
  Heading,
  Text,
} from '../ui';

// Types
import { UserDetail, Option } from '@/types';

// Constants
import { UserCardPopover } from './user-card-popover';

// Utils
import { cn } from '@/utils';

interface UserCardHeaderProps extends ComponentProps<typeof CardHeader> {
  user: UserDetail;
  title: string;
  description?: string;
  endIcon?: ReactNode;
  moreOptions?: Option[];
  variant?: 'default' | 'sm' | 'md' | 'lg';
}

export const UserCardHeader = memo(
  ({
    user,
    title,
    description,
    endIcon = <EllipsisVertical size={20} />,
    moreOptions,
    className,
    variant = 'default',
    ...props
  }: UserCardHeaderProps) => (
    <CardHeader
      className={cn(
        'p-3 flex flex-row rounded-md items-center justify-between group',
        className,
      )}
      {...props}
    >
      <div
        className={cn('flex items-center', {
          'gap-4': variant === 'md',
          'gap-3': variant === 'default',
        })}
      >
        <UserCardPopover
          user={user}
          variant={variant}
          additionalClass={cn(variant === 'md' && 'p-0')}
        />

        <div className="flex flex-col">
          <CardTitle className={cn('text-sm', variant === 'md' && 'text-xs')}>
            {title}
          </CardTitle>
          {description && (
            <CardDescription className={cn(variant === 'md' && 'text-4xs')}>
              {description}
            </CardDescription>
          )}
        </div>
      </div>

      {moreOptions && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="rounded"
              className="hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8"
            >
              {endIcon}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px] p-0 py-2">
            {moreOptions.map(
              ({ label, description, icon: Icon, action }, index) => (
                <Fragment key={label}>
                  {index === moreOptions.length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                  <DropdownMenuItem
                    key={label}
                    onClick={action}
                    className="flex items-center gap-2.5 py-2 px-4 h-[50px]"
                  >
                    {Icon}
                    <div className="flex flex-col">
                      <Heading
                        headingLevel="h3"
                        className="text-xs font-roboto"
                      >
                        {label}
                      </Heading>
                      <Text variant="primary" className="text-2xs font-normal">
                        {description}
                      </Text>
                    </div>
                  </DropdownMenuItem>
                </Fragment>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </CardHeader>
  ),
);

UserCardHeader.displayName = 'UserCardHeader';
