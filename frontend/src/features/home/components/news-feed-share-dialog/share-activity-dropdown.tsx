'use client';

import { Fragment, memo, ReactNode, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Constants
import { ACTIVITY_ROLES } from '../../constants';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Heading,
  Text,
  Label,
} from '@/components/ui';

// Hooks
import { ShareFormValues } from '../../hooks';

interface ShareActivityDropdownProps {
  trigger: ReactNode;
  form: UseFormReturn<ShareFormValues>;
}

export const ShareActivityDropdown = memo(
  ({ trigger, form }: ShareActivityDropdownProps) => {
    const value = form.watch('activityRole');

    const selectedOption = useMemo(
      () =>
        ACTIVITY_ROLES.find((role) => role.value === value) ||
        ACTIVITY_ROLES[0],
      [value],
    );

    return (
      <FormField
        control={form.control}
        name="activityRole"
        render={({ field: optionField }) => (
          <FormItem>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    data-testid="dropdown-trigger"
                    className="flex items-center"
                  >
                    {trigger}
                    {selectedOption !== ACTIVITY_ROLES[0] && (
                      <Label
                        variant="darkNeutral"
                        className="text-2xs user-select-none font-sans"
                      >
                        {selectedOption.label}
                      </Label>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[280px] p-0 py-2">
                  {ACTIVITY_ROLES.map(
                    ({ label, description, value, icon: Icon }, index) => (
                      <Fragment key={label}>
                        {index === ACTIVITY_ROLES.length - 1 && (
                          <DropdownMenuSeparator />
                        )}
                        <DropdownMenuItem
                          data-testid="dropdown-item"
                          key={label}
                          onClick={() => optionField.onChange(value)}
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
                            <Text
                              variant="primary"
                              className="text-2xs font-normal"
                            >
                              {description}
                            </Text>
                          </div>
                        </DropdownMenuItem>
                      </Fragment>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
          </FormItem>
        )}
      />
    );
  },
);

ShareActivityDropdown.displayName = 'ShareActivityDropdown';
