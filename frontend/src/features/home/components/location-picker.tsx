'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Icons
import { MapPinIcon } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections/auto-complete-input';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

// Hooks
import { ComposeFeedFormValues } from '../hooks/use-compose-feed-form';

// Types
import { MapboxFeature } from '@/types/map-box';

// Actions
import { getLocations } from '../actions/get-locations';

interface LocationPickerProps {
  onCloseLocationPicker: () => void;
  form: UseFormReturn<ComposeFeedFormValues>;
}

export const LocationPicker = memo(
  ({ onCloseLocationPicker, form }: LocationPickerProps) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (query.length > 2) {
          const { data } = await getLocations(query);

          if (!data) return setSuggestions([]);

          setSuggestions(
            data.features.map((feature: MapboxFeature) => feature.place_name),
          );
        } else {
          setSuggestions([]);
        }
      },
      [],
    );

    const handleSuggestionClick = useCallback(
      (suggestion: string) => {
        form.setValue('location', suggestion);
        setSuggestions([]);
      },
      [form],
    );

    const handleClose = useCallback(() => {
      form.setValue('location', '');
      onCloseLocationPicker();
    }, [form, onCloseLocationPicker]);

    const locationsList = useMemo(
      () => (
        <ul className="shadow-sphere-light">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="cursor-pointer flex items-center px-3 py-1 gap-2.5 hover:bg-gray-600 hover:dark:bg-dark-500"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Text className="leading-4 dark:text-gray-100">{suggestion}</Text>
            </li>
          ))}
        </ul>
      ),
      [handleSuggestionClick, suggestions],
    );

    return (
      <div className="relative">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <AutoCompleteInput
                  id="location-input"
                  className="dark:text-neutral-200"
                  startIcon={<MapPinIcon size={16} />}
                  placeholder="Enter a location"
                  onClose={handleClose}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {suggestions.length > 0 && (
          <div className="absolute z-50 top-9 left-0 w-full max-h-[320px] overflow-auto rounded-[4px] border border-input bg-white dark:bg-dark-500 transition-all duration-300 ease-in-out">
            {locationsList}
          </div>
        )}
      </div>
    );
  },
);

LocationPicker.displayName = 'LocationPicker';
