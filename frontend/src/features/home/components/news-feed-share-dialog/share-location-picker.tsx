'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Components
import { AutoCompleteInput } from '@/components/sections';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  Text,
} from '@/components/ui';

// Hooks
import { ShareFormValues } from '../../hooks';

// Types
import { MapboxFeature } from '@/types';

// Actions
import { getLocations } from '../../actions';

interface ShareLocationPickerProps {
  onCloseLocationPicker: () => void;
  form: UseFormReturn<ShareFormValues>;
}

export const ShareLocationPicker = memo(
  ({ onCloseLocationPicker, form }: ShareLocationPickerProps) => {
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
                  className="pl-[85px] rounded-e-none"
                  additionalStartIconClass="left-0"
                  startIcon={
                    <Button
                      type="button"
                      variant="unstyle"
                      className="text-white dark:text-white text-2xs border p-0 px-2.5 bg-neutral-200 dark:bg-dark-100 h-9 hover:bg-neutral-400/80 hover:dark:bg-neutral-400"
                    >
                      Location :
                    </Button>
                  }
                  placeholder="Where are you?"
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

ShareLocationPicker.displayName = 'ShareLocationPicker';
