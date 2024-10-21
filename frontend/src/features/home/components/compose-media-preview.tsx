import { memo } from 'react';
import Image from 'next/image';

// Icons
import { XIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';

interface ComposeMediaPreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export const ComposeMediaPreview = memo(
  ({ imageUrl, onRemove }: ComposeMediaPreviewProps) => (
    <div className="w-[140px] h-[169px] relative mb-3">
      <Image
        alt="Media of feed"
        src={imageUrl}
        fill
        sizes="140px"
        style={{ objectFit: 'cover' }}
        className="rounded-md"
      />
      <Button
        size="icon"
        variant="unstyle"
        className="absolute top-[-4px] right-[-4px] bg-white hover:bg-gray-600 dark:bg-dark-900 hover:dark:bg-dark-900 rounded-full w-[30px] h-[30px]"
        onClick={onRemove}
      >
        <XIcon size={16} className="text-neutral-400" />
      </Button>
    </div>
  ),
);

ComposeMediaPreview.displayName = 'ComposeMediaPreview';
