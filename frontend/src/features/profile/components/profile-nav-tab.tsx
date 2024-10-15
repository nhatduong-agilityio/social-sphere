'use client';

import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabsType = {
  key: string;
  label: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  href: string;
};

interface ProfileNavTabProps {
  tabs: TabsType[];
}

const ProfileNavTab = ({ tabs }: ProfileNavTabProps) => {
  const pathname = usePathname();

  return (
    <Tabs defaultValue={pathname || tabs[0].href}>
      <TabsList>
        {tabs.map(({ key, label, icon: Icon, href }) => (
          <Link key={key} href={href}>
            <TabsTrigger value={href}>
              {Icon && <Icon className="md:mr-2" size={20} />}
              <span className="hidden md:block">{label}</span>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ProfileNavTab;
