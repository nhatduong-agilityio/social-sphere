import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { CircleFlag } from 'react-circle-flags';
import Image from 'next/image';

// Icons
import { SearchIcon } from 'lucide-react';

// Constants
import { MOOD_DETAILS, MOOD_OPTIONS, MOODS } from '../constants/compose-form';

// Components
import { AutoCompleteInput } from '@/components/sections/auto-complete-input';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// Hooks
import { useDebounce } from '@/hooks/use-debounce';
import { useFocusState } from '@/hooks/use-focus-state';

// Types
import { Option } from '@/types/option';

// Hooks
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

// Utils
import { cn } from '@/utils/cn';
import { getMoodTitle } from '../utils/feed';

interface MoodActivityPickerProps {
  onSelectMood: (data: { title: string; content: string }) => void;
  onCloseMoodActivityPicker: () => void;
  onRemoveMood: () => void;
  defaultMood?: { title: string; content: string };
}

const MoodItem = ({
  mood,
  isTraveling = false,
  onSelectMood,
}: {
  mood: Option;
  isTraveling?: boolean;
  onSelectMood: (value: string) => void;
}) => {
  const { label, description, icon, value } = mood;

  return (
    <li
      className="cursor-pointer flex items-center px-3 py-1 gap-2.5 hover:bg-gray-600 hover:dark:bg-dark-500"
      onClick={() => onSelectMood(value)}
    >
      {icon && (
        <div className="w-9 h-9 rounded-full relative">
          <Image
            alt={description || 'Mood item image'}
            src={`${icon}`}
            fill
            sizes="36px"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: '100%',
            }}
          />
        </div>
      )}
      {isTraveling && (
        <div className="w-[22px] h-[22px] rounded-full relative">
          <CircleFlag countryCode={value} />
        </div>
      )}
      <Text className="leading-[18.2px] dark:text-gray-100">
        {label}
        {description && (
          <>
            <br />
            <Label className="text-2xs dark:text-neutral-100">
              {description}
            </Label>
          </>
        )}
      </Text>
    </li>
  );
};

export const MoodActivityPicker = memo(
  ({
    defaultMood,
    onSelectMood,
    onCloseMoodActivityPicker,
    onRemoveMood,
  }: MoodActivityPickerProps) => {
    const refWrapper = useRef<HTMLDivElement>(null);
    const { isFocused, handleFocus, handleBlur } = useFocusState();

    const [searchMood, setSearchMood] = useState('');
    const [currentOptions, setCurrentOptions] =
      useState<Option[]>(MOOD_OPTIONS);
    const [selectedMood, setSelectedMood] = useState<string | null>(
      defaultMood ? defaultMood.title : null,
    );

    const debouncedSearchMood = useDebounce(searchMood, 300);

    const filterOptions = useCallback(
      (options: Option[], searchTerm: string) =>
        options.filter(
          (option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()),
        ),
      [],
    );

    useEffect(() => {
      const filteredOptions = filterOptions(
        selectedMood ? MOOD_DETAILS[selectedMood] || [] : MOOD_OPTIONS,
        debouncedSearchMood,
      );
      setCurrentOptions(filteredOptions);
    }, [debouncedSearchMood, selectedMood, filterOptions]);

    const handleSelectMood = useCallback(
      (value: string) => {
        if (!selectedMood) {
          setSelectedMood(value);
          setSearchMood('');
          if (MOOD_DETAILS[value]) {
            setCurrentOptions(MOOD_DETAILS[value]);
          } else {
            onSelectMood({ title: value, content: '' });
            onCloseMoodActivityPicker();
          }
        } else {
          onSelectMood({ title: selectedMood, content: value });
          onCloseMoodActivityPicker();
        }
      },
      [selectedMood, onSelectMood, onCloseMoodActivityPicker],
    );

    const handleCloseInput = useCallback(() => {
      onRemoveMood();
      onCloseMoodActivityPicker();
    }, [onCloseMoodActivityPicker, onRemoveMood]);

    const moodsList = useMemo(
      () => (
        <ul className="shadow-sphere-light">
          {currentOptions.map((mood) => (
            <MoodItem
              key={mood.value}
              mood={mood}
              isTraveling={selectedMood === MOODS.TRAVELING}
              onSelectMood={handleSelectMood}
            />
          ))}
        </ul>
      ),
      [currentOptions, handleSelectMood, selectedMood],
    );

    useOnClickOutside(refWrapper, handleBlur);

    return (
      <div ref={refWrapper} className="relative">
        <AutoCompleteInput
          additionalStartIconClass={cn(selectedMood && 'left-0')}
          startIcon={
            selectedMood ? (
              <Button
                type="button"
                variant="unstyle"
                className="text-white dark:text-white text-2xs border p-0 px-2.5 bg-neutral-400 h-9 rounded-s-[4px] hover:bg-neutral-400/80 hover:dark:bg-neutral-400"
                onClick={handleFocus}
              >
                {getMoodTitle(selectedMood)}
              </Button>
            ) : (
              <SearchIcon size={16} />
            )
          }
          className={cn(selectedMood && 'pl-[74px]')}
          placeholder="What are you doing right now?"
          variant="square"
          value={searchMood}
          onChange={(e) => setSearchMood(e.target.value)}
          onClose={handleCloseInput}
          onFocus={handleFocus}
        />
        {isFocused && (
          <div className="absolute z-50 top-9 left-0 w-full max-h-[320px] overflow-auto rounded-[4px] border border-input bg-white dark:bg-dark-500 transition-all duration-300 ease-in-out">
            {moodsList}
          </div>
        )}
      </div>
    );
  },
);

MoodActivityPicker.displayName = 'MoodActivityPicker';
