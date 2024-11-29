'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Icons
import { ArrowLeft } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Text,
} from '@/components/ui';

// Types
import { MapboxFeature } from '@/types';
import { UserModel } from '@/models';

// Actions
import { getLocations } from '@/features/home/actions';

// Libs
import { OverviewSchema } from '../lib';

// Actions
import { updateProfile } from '../actions';

// Hooks
import { toast } from '@/hooks';

// Icons
import { LocationIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

interface LocationPickerProps {
  isDisabled?: boolean;
  user: UserModel;
}

const defaultLocation = { countryCode: '', city: '' };

export const LocationPicker = memo(
  ({ isDisabled = false, user }: LocationPickerProps) => {
    const form = useForm<z.infer<typeof OverviewSchema>>({
      resolver: zodResolver(OverviewSchema),
      defaultValues: {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        location: user.location || defaultLocation,
      },
    });

    const [suggestions, setSuggestions] = useState<
      { countryCode: string; city: string }[]
    >([]);

    const handleLocationChange = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (query.length > 2) {
          const { data } = await getLocations(query);

          if (!data) return setSuggestions([]);

          setSuggestions(
            data.features.map((feature: MapboxFeature) => ({
              city: feature.place_name,
              countryCode: feature.properties.short_code,
            })),
          );
        } else {
          setSuggestions([]);
        }
      },
      [],
    );

    const handleSuggestionClick = useCallback(
      (suggestion: { countryCode: string; city: string }) => {
        const location = suggestion || defaultLocation;

        form.setValue('location', location);

        setSuggestions([]);
      },
      [form],
    );

    const locationsList = useMemo(
      () => (
        <ul className="shadow-sphere-light">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.city}
              className="cursor-pointer flex items-center px-3 py-1 gap-2.5 hover:bg-gray-600 hover:dark:bg-dark-500"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Text className="leading-4 dark:text-gray-100">
                {suggestion.city}
              </Text>
            </li>
          ))}
        </ul>
      ),
      [handleSuggestionClick, suggestions],
    );

    const handleSubmit = async (data: z.infer<typeof OverviewSchema>) => {
      try {
        await updateProfile(user.username, {
          ...user,
          location: data.location,
        });
        toast({
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-500 p-4">
              <code className="text-white">Location updated successfully</code>
            </pre>
          ),
        });
      } catch (error) {
        toast({
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
              <code className="text-white">Something went wrong</code>
            </pre>
          ),
        });
      }
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="relative flex items-center group justify-between dark:bg-slate-800 bg-white border rounded-md p-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <LocationIcon className="rounded-full" />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel
                    className="dark:text-slate-200 text-slate-600"
                    size="tiny"
                  >
                    LOCATION
                  </FormLabel>
                  <FormControl>
                    <AutoCompleteInput
                      id="location-input"
                      className="dark:bg-slate-800 h-6 p-0 dark:text-slate-300 text-slate-500 text-2xs border-none"
                      placeholder="Enter a location"
                      value={field.value?.city || ''}
                      onChange={(e) => {
                        const newCity = e.target.value;
                        field.onChange({ ...field.value, city: newCity });
                        handleLocationChange(e);
                      }}
                      disabled={isDisabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute z-50 top-9 left-0 w-full max-h-[320px] overflow-auto rounded-[4px] border border-input bg-white dark:bg-dark-500 transition-all duration-300 ease-in-out">
              {locationsList}
            </div>
          )}

          <Button
            type="submit"
            title="location-button"
            variant="rounded"
            size="icon"
            className={cn(
              'w-[42px] h-[42px] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-all duration-300 group-hover:rotate-180',
              isDisabled && 'hidden',
            )}
          >
            <ArrowLeft size={16} />
          </Button>
        </form>
      </Form>
    );
  },
);

LocationPicker.displayName = 'LocationPicker';
