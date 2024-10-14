import {
  ChangeEvent,
  ElementType,
  memo,
  ReactNode,
  RefObject,
  useCallback,
} from 'react';

// Icons
import {
  CameraIcon,
  EllipsisIcon,
  TagIcon,
  MapPinIcon,
  Link2Icon,
  ImageIcon,
} from 'lucide-react';
import { EmojiIcon } from '@/icons/emoji-icon';

// Components
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem } from '@/components/ui/form';

// Hooks
import { useDisclosure } from '@/hooks/use-disclosure';

// Utils
import { cn } from '@/utils/cn';

interface ComposeOptionsProps {
  mediaInputRef: RefObject<HTMLInputElement>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface OptionButtonProps {
  icon: ElementType;
  text?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const OptionButton = ({
  icon: Icon,
  text,
  onClick,
  children,
}: OptionButtonProps) => (
  <div
    className="flex items-center bg-gray-200 dark:bg-dark-300 text-neutral-300 hover:text-neutral-700 hover:dark:text-white px-4 py-[6px] rounded-full cursor-pointer"
    onClick={onClick}
  >
    <Icon size={20} />
    {text && (
      <Text size="xs" className="px-2 text-neutral-300">
        {text}
      </Text>
    )}
    {children}
  </div>
);

export const ComposeOptions = memo(
  ({ mediaInputRef, onFileChange }: ComposeOptionsProps) => {
    const { isOpen: isOpenComposeOptions, onOpen: onOpenComposeOptions } =
      useDisclosure();

    const handleOptionClick = useCallback(() => {
      mediaInputRef.current?.click();
    }, [mediaInputRef]);

    return (
      <div
        className={cn(
          'flex gap-2.5 justify-start items-center border-b border-gray-600 dark:border-dark-500 p-2',
          isOpenComposeOptions && 'grid grid-cols-2 gap-2.5',
        )}
      >
        <OptionButton
          icon={CameraIcon}
          text={isOpenComposeOptions ? 'Photo/Video' : 'Media'}
          onClick={handleOptionClick}
        >
          <FormField
            name="media"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    id="media-publish-upload"
                    type="file"
                    ref={mediaInputRef}
                    onChange={onFileChange}
                    className="hidden"
                    aria-label="Upload Media Publish"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </OptionButton>

        <OptionButton
          icon={() => <EmojiIcon customClass="w-5 h-5" />}
          text={isOpenComposeOptions ? 'Mood/Activity' : 'Activity'}
        />

        {isOpenComposeOptions ? (
          <>
            <OptionButton icon={TagIcon} text="Tag friends" />
            <OptionButton icon={MapPinIcon} text="Post location" />
            <OptionButton icon={Link2Icon} text="Share link" />
            <OptionButton icon={ImageIcon} text="Post GIF" />
          </>
        ) : (
          <OptionButton icon={EllipsisIcon} onClick={onOpenComposeOptions} />
        )}
      </div>
    );
  },
);

ComposeOptions.displayName = 'ComposeOptions';
