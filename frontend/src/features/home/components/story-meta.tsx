import { Text } from '@/components/ui/text';
import { memo } from 'react';

interface StoryMetaProps {
  title: string;
  description?: string;
}

export const StoryMeta = memo(({ title, description }: StoryMetaProps) => (
  <div className="flex flex-col">
    <Text className="text-xs">{title}</Text>
    <span className="text-4xs text-slate-500">{description}</span>
  </div>
));

StoryMeta.displayName = 'StoryMeta';
