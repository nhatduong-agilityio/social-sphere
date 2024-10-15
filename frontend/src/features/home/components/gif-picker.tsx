import { useState, useEffect, useCallback } from 'react';

// Icons
import { SearchIcon } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections/auto-complete-input';

// Models
import { GifItem } from '../models/gif';

// Hooks
import { useDebounce } from '@/hooks/use-debounce';

// Actions
import { getGifs } from '../actions/get-gifs';

interface GifPickerProps {
  onGifSelect: (gifUrl: string) => void;
  onCloseGifPicker: () => void;
}

export const GifPicker = ({
  onGifSelect,
  onCloseGifPicker,
}: GifPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState<GifItem[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleGifsList = useCallback(async () => {
    const { data } = await getGifs(debouncedSearchTerm);

    if (!data) return;

    setGifs(data);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleGifsList();
    }
  }, [handleGifsList, debouncedSearchTerm]);

  return (
    <div className="relative">
      <AutoCompleteInput
        startIcon={<SearchIcon size={16} />}
        placeholder="Search a GIF to add"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClose={onCloseGifPicker}
      />
      {gifs.length ? (
        <div className="absolute z-50 top-9 left-0 w-full max-h-[320px] overflow-auto rounded-[4px] border border-input bg-white dark:bg-dark-500 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-3 gap-1">
            {gifs.map((gif) => (
              <div
                key={gif.id}
                onClick={() => onGifSelect(gif.media_formats.gif.url)}
                className="cursor-pointer"
              >
                <img
                  alt={gif.content_description || 'GIF'}
                  src={gif.media_formats.gif.url}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
