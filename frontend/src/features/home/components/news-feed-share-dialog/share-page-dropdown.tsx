'use client';

import { Fragment, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

// Components
import {
  Button,
  Heading,
  Text,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  FormField,
  FormItem,
  FormControl,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui';

// Utils
import { cn } from '@/utils';

// Hooks
import { ShareFormValues } from '../../hooks';

// Types
import { SocialPageModel } from '@/models';

interface SharePageDropdownProps {
  form: UseFormReturn<ShareFormValues>;
  pages: SocialPageModel[];
}

const PageMenuItem = ({
  page,
  onChange,
}: {
  page: SocialPageModel;
  onChange: (id: string) => void;
}) => (
  <DropdownMenuItem
    onClick={() => onChange(page.id)}
    className="flex items-center gap-2.5 py-[6px] px-4 h-[50px] group"
  >
    <Avatar size="md">
      <AvatarImage src={page.avatar} alt={`Avatar of the page-${page.id}`} />
      <AvatarFallback>PA</AvatarFallback>
    </Avatar>
    <div className="flex flex-col">
      <Heading
        headingLevel="h3"
        className="text-xs font-roboto group-hover:dark:text-primary"
      >
        {page.name}
      </Heading>
      <Text variant="primary" className="text-2xs font-normal">
        {page.description}
      </Text>
    </div>
  </DropdownMenuItem>
);

export const SharePageDropdown = ({ form, pages }: SharePageDropdownProps) => {
  const value = form.watch('page');
  const selectedPage = pages.find((page) => page.id === value) || pages[0];

  // Set the initial value for the page field
  useEffect(() => {
    form.setValue('page', selectedPage.id);
  }, [form, selectedPage.id]);

  return (
    <FormField
      control={form.control}
      name="page"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DropdownMenu>
              <div className="flex justify-between items-center p-2">
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="fixed"
                    className={cn(
                      'text-2xs border h-8 w-fit rounded-lg px-3 py-2.5 flex justify-center items-center gap-1 text-neutral-700 dark:text-white bg-black-haze-50 dark:bg-transparent hover:dark:bg-card transition-all duration-200',
                    )}
                  >
                    <Avatar className="w-5 h-5">
                      <AvatarImage
                        src={selectedPage.avatar}
                        alt={`Avatar of the selected page-${selectedPage.id}`}
                      />
                      <AvatarFallback>PA</AvatarFallback>
                    </Avatar>
                    {selectedPage.name}
                    <ChevronDownIcon size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={selectedPage.owner.profilePicture}
                    alt={`Avatar of owner of the selected page-${selectedPage.id}`}
                  />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
              </div>
              <DropdownMenuContent className="w-[320px] p-0 py-2">
                {pages.map((page) => (
                  <Fragment key={page.id}>
                    <PageMenuItem page={page} onChange={field.onChange} />
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

SharePageDropdown.displayName = 'SharePageDropdown';
