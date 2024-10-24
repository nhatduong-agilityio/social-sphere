import { memo, ReactNode } from 'react';
import { EllipsisVertical } from 'lucide-react';

// Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';

interface PanelProps {
  panelTile: string;
  buttonLabel: string;
  countItems: number;
  startIcon?: ReactNode;
  children: ReactNode;
  handleClick?: () => void;
}

export const Panel = memo(
  ({
    panelTile,
    buttonLabel,
    countItems,
    startIcon,
    children,
    handleClick,
  }: PanelProps) => (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex items-center gap-3">
          {startIcon}
          <CardTitle>{panelTile}</CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button onClick={handleClick}>{buttonLabel}</Button>
            {countItems > 0 && (
              <span className="absolute top-[-8px] left-[-15px] flex items-center justify-center ml-2 min-w-6 h-6 bg-blue-600 rounded-full text-2xs text-white">
                {countItems}
              </span>
            )}
          </div>

          <Button size="icon" variant="rounded" className="hover:bg-muted">
            <EllipsisVertical size={24} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-5">
        {children}
      </CardContent>
    </Card>
  ),
);

Panel.displayName = 'Panel';
