import { useMemo } from 'react';

// Constants
import { COMPOSE_TAB_TITLES, ComposeTabValue } from '../constants';

// Components
import { Circle, TabsList, TabsTrigger } from '@/components/ui';

// Icons
import { ImageIcon, PenLineIcon, VideoIcon, XIcon } from 'lucide-react';

// Utils
import { cn } from '@/utils';

interface ComposeTabHeaderProps {
  isOverlayOpen: boolean;
  onCloseOverlay: () => void;
}

export const ComposeTabHeader = ({
  isOverlayOpen,
  onCloseOverlay,
}: ComposeTabHeaderProps) => {
  const TABS = useMemo(
    () => [
      {
        value: ComposeTabValue.Publish,
        label: COMPOSE_TAB_TITLES[ComposeTabValue.Publish],
        icon: PenLineIcon,
        className:
          'rounded-tl-xl rounded-tr-[4px] data-[state=active]:rounded-es-[4px] data-[state=active]:border-r',
      },
      {
        value: ComposeTabValue.Albums,
        label: COMPOSE_TAB_TITLES[ComposeTabValue.Albums],
        icon: ImageIcon,
        className:
          'rounded-none data-[state=active]:border-x data-[state=active]:rounded-t-[4px]',
      },
      {
        value: ComposeTabValue.Video,
        label: COMPOSE_TAB_TITLES[ComposeTabValue.Video],
        icon: VideoIcon,
        className: 'rounded-t-[4px] data-[state=active]:border-x',
      },
    ],
    [],
  );

  return (
    <TabsList className="w-full flex flex-row md:flex-row border-0 p-0 bg-gray-50 dark:bg-dark-500 rounded-t-xl gap-0">
      {TABS.map(({ value, label, icon: Icon, className }) => (
        <TabsTrigger
          key={value}
          value={value}
          className={cn(
            'w-full px-4 py-2.5 justify-center border-b dark:text-slate-400 text-slate-500 dark:border-none hover:bg-gray-300 hover:border-gray-800 hover:dark:bg-dark-500 rounded-b-none data-[state=active]:border-b-card data-[state=active]:shadow-none data-[state=active]:bg-white data-[state=active]:dark:bg-dark-800 data-[state=active]:dark:text-neutral-200 data-[state=active]:text-neutral-500',
            className,
          )}
        >
          <Icon className="mr-2" size={16} />
          {label}
        </TabsTrigger>
      ))}
      <TabsTrigger asChild disabled value="">
        <div className="w-full px-4 py-2.5 justify-end border-b dark:border-none rounded-b-none data-[state=active]:border-b-card data-[state=active]:shadow-none data-[state=active]:bg-white data-[state=active]:dark:bg-dark-800 data-[state=active]:text-neutral-400">
          {isOverlayOpen ? (
            <Circle
              className="bg-gray-50 dark:bg-dark-500 hover:bg-gray-600 hover:dark:bg-dark-900 rounded-full w-[30px] h-[30px] cursor-pointer"
              onClick={onCloseOverlay}
            >
              <XIcon size={16} className="text-neutral-400" />
            </Circle>
          ) : null}
        </div>
      </TabsTrigger>
    </TabsList>
  );
};
