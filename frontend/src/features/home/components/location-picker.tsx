'use client';

import { memo, useCallback, useRef } from 'react';

// Icons
import { MapPinIcon } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections/auto-complete-input';
import { FormControl, FormField, FormItem } from '@/components/ui/form';

// Hooks
import { useComposeFeedForm } from '../hooks/use-compose-feed-form';
import Script from 'next/script';

const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js';

interface LocationPickerProps {
  onCloseLocationPicker: () => void;
}

export const LocationPicker = memo(
  ({ onCloseLocationPicker }: LocationPickerProps) => {
    const { form } = useComposeFeedForm();
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
      null,
    );

    const initAutocomplete = useCallback(() => {
      const input = document.getElementById(
        'location-input',
      ) as HTMLInputElement;
      autocompleteRef.current = new google.maps.places.Autocomplete(input);

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          form.setValue('location', place.formatted_address);
        }
      });
    }, [form]);

    const handleClose = useCallback(() => {
      form.setValue('location', '');
      onCloseLocationPicker();
    }, [form, onCloseLocationPicker]);

    return (
      <>
        <Script
          src={`${GOOGLE_MAPS_API_URL}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={initAutocomplete}
        />
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
                />
              </FormControl>
            </FormItem>
          )}
        />
      </>
    );
  },
);

LocationPicker.displayName = 'LocationPicker';
