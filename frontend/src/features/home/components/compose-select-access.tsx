'use client';

import { Fragment, useCallback } from 'react';

// Icons
import { BellIcon, ChevronDownIcon, PlusIcon, SmileIcon } from 'lucide-react';

// Constants
import {
  ACCESS_ITEMS,
  ACTIVITY_ROLES,
  STORY_ROLES,
} from '../constants/compose-form';

// Components
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Circle } from '@/components/ui/circle';

// Hooks
import { useComposeFeedForm } from '../hooks/use-compose-feed-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const RoleDropdown = ({
  name,
  roles,
}: {
  name: 'activityRole' | 'storyRole';
  roles: { label: string; description: string; icon: JSX.Element }[];
}) => {
  const { form } = useComposeFeedForm();
  const value = form.watch(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: optionField }) => (
        <FormItem>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="fixed"
                  className="h-9 w-[110px] rounded-full p-[6px] flex justify-center items-center gap-1 text-neutral-800 dark:text-neutral-100 dark:bg-transparent hover:dark:bg-card"
                >
                  <SmileIcon size={16} />
                  <Label
                    variant="darkNeutral"
                    className="text-2xs user-select-none truncate max-w-[50%]"
                  >
                    {value}
                  </Label>
                  <ChevronDownIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[280px] p-0 py-2">
                {roles.map(({ label, description, icon: Icon }, index) => (
                  <Fragment key={label}>
                    {index === roles.length - 1 && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      key={label}
                      onClick={() => optionField.onChange(label)}
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
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export const ComposeSelectAccess = () => {
  const { form } = useComposeFeedForm();

  const renderIcons = useCallback((label: string) => {
    const iconMap = {
      [ACCESS_ITEMS[0].label]: (
        <Circle variant="secondary" size="xl">
          <BellIcon size={18} />
        </Circle>
      ),
      [ACCESS_ITEMS[1].label]: (
        <div className="w-fit rounded-full relative">
          <Circle variant="secondary" size="xl" />
          <Circle className="border-2 border-gray-600 dark:border-popover absolute bottom-[-1px] right-[-8px] w-[22px] h-[22px]">
            <PlusIcon size={10} className="text-white" strokeWidth={3} />
          </Circle>
        </div>
      ),
    };

    return iconMap[label] || null;
  }, []);

  const renderDropdownRoles = useCallback((label: string) => {
    const roleMap = {
      [ACCESS_ITEMS[0].label]: (
        <RoleDropdown name="activityRole" roles={ACTIVITY_ROLES} />
      ),
      [ACCESS_ITEMS[1].label]: (
        <RoleDropdown name="storyRole" roles={STORY_ROLES} />
      ),
    };

    return roleMap[label] || null;
  }, []);

  return (
    <div className="p-2 border-t border-gray-600 dark:border-dark-500 bg-black-haze-50 dark:bg-card">
      <FormField
        control={form.control}
        name="accessItems"
        render={() => (
          <FormItem className="space-y-0">
            {ACCESS_ITEMS.map(({ label }) => (
              <FormField
                key={label}
                control={form.control}
                name="accessItems"
                render={({ field }) => (
                  <FormItem
                    key={label}
                    className="flex justify-between items-center rounded-[4px] py-[6px] px-2 hover:bg-gray-500 hover:dark:bg-dark-300 space-y-0"
                  >
                    <div className="flex items-center space-x-2.5 space-y-0">
                      <FormControl>
                        <Checkbox
                          className="w-[22px] h-[22px]"
                          variant="circle"
                          checked={field.value?.includes(label)}
                          onCheckedChange={(checked) => {
                            const currentValue = Array.isArray(field.value)
                              ? field.value
                              : [];
                            return checked
                              ? field.onChange([...currentValue, label])
                              : field.onChange(
                                  currentValue.filter((item) => item !== label),
                                );
                          }}
                        />
                      </FormControl>
                      {renderIcons(label)}
                      <FormLabel variant="neutral">{label}</FormLabel>
                    </div>
                    {renderDropdownRoles(label)}
                  </FormItem>
                )}
              />
            ))}
          </FormItem>
        )}
      />
    </div>
  );
};
