import { Text } from '@/components/ui/text';

interface StoryMetaProps {
  title: string;
  description?: string;
}

const StoryMeta = ({ title, description }: StoryMetaProps) => (
  <div className="flex flex-col">
    <Text className="text-xs">{title}</Text>
    <span className="text-4xs text-slate-500">{description}</span>
  </div>
);

export default StoryMeta;
