import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabsTriggerType = {
  value: string;
  label: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

type TabsContentProps = {
  value: string;
  children: ReactNode;
};

interface NavTabProps {
  defaultValue?: string;
  tabsTrigger?: TabsTriggerType[];
  tabsContent?: TabsContentProps[];
}

const NavTab = ({
  defaultValue = 'personalInfo',
  tabsContent = [],
  tabsTrigger = [],
}: NavTabProps) => (
  <Tabs defaultValue={defaultValue} className="flex w-full gap-8">
    <TabsList>
      {tabsTrigger.map(({ value, label, icon: Icon }) => (
        <TabsTrigger key={value} value={value}>
          {Icon && <Icon className="mr-2" size={20} />}
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabsContent.map(({ value, children }) => (
      <TabsContent key={value} value={value}>
        {children}
      </TabsContent>
    ))}
  </Tabs>
);
export default NavTab;
