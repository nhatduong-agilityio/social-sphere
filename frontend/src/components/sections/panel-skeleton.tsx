// Components
import { Card, CardContent, CardHeader, Skeleton } from '@/components/ui';

export const PanelSkeleton = () => (
  <Card className="w-full animate-pulse">
    <CardHeader className="flex flex-row justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 bg-gray-300 rounded-full" />
        <Skeleton className="w-20 h-8 bg-gray-300 rounded-md" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Skeleton className="w-20 h-8 bg-gray-300 rounded-md" />
        </div>

        <Skeleton className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </CardHeader>
    <CardContent className="flex flex-col md:flex-row gap-5">
      <Card className="w-full">
        <Skeleton className="h-12 bg-gray-300 rounded-md" />
      </Card>
    </CardContent>
  </Card>
);

PanelSkeleton.displayName = 'PanelSkeleton';
