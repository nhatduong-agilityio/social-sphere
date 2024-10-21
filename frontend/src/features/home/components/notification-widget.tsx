import { EllipsisVertical } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

// Utils
import { cn } from '@/utils/cn';

interface NotificationWidgetProps {
  title: string;
  avatar?: string;
  description: string;
  customClass?: string;
  styleNotificationClass?: string;
  notificationCount?: number;
  iconContent: JSX.Element;
  iconHeader?: JSX.Element;
}

const NotificationWidget = ({
  customClass,
  avatar,
  iconContent,
  title,
  description,
  iconHeader,
  notificationCount,
  styleNotificationClass,
}: NotificationWidgetProps) => (
  <Card
    className={cn(
      'relative flex flex-col w-full h-full rounded-lg',
      customClass,
    )}
  >
    <CardHeader className="flex flex-row items-center justify-between">
      <Button size="icon" variant="unstyle">
        {iconHeader}
      </Button>

      <Button size="icon" variant="unstyle">
        <EllipsisVertical size={24} className="text-white" />
      </Button>
    </CardHeader>

    <CardContent className="z-10 p-4 flex flex-col justify-center items-center">
      <div className="relative">
        <Avatar className="mb-4">
          <AvatarImage src={avatar} alt="Background image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {notificationCount && (
          <div
            className={cn(
              'absolute w-[26px] flex items-center justify-center text-xs text-center text-white h-[26px] bottom-9 left-7 bg-slate-800 rounded-full',
              styleNotificationClass,
            )}
          >
            {notificationCount}
          </div>
        )}
      </div>

      <div className="text-center">
        <Text className="font-medium text-md text-white">{title}</Text>
        <p className="text-sm text-white">{description}</p>

        <Button
          variant="rounded"
          className="mt-4 text-white rounded-lg border-white"
        >
          Write Message
        </Button>
      </div>
    </CardContent>

    <div className="absolute bottom-0 right-0 w-80 h-80">{iconContent}</div>
  </Card>
);

export default NotificationWidget;
