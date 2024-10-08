// Icons
import { LockIcon, UserIcon, EllipsisVertical, UsersRound } from 'lucide-react';

// Components
import { BrandLink } from '@/components/sections/brand-link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserCard } from '@/components/sections/user-card';
import Panel from '@/components/sections/panel';
import NavTab from '@/components/sections/nav-tab';
import { TABS_TRIGGER } from '@/constants/nav-tab';
import Banner from '@/components/sections/profile-banner';

const Homepage = () => {
  const tabsContent = [
    {
      value: 'overview',
      children: <div>Overview</div>,
    },
    {
      value: 'personalInfo',
      children: (
        <Panel
          panelTile="Friends"
          countItems={10}
          startIcon={<UsersRound size={24} />}
          buttonLabel="Invitations"
        >
          <UserCard
            user={{ id: '1', firstName: 'Nhat', lastName: 'Duong' }}
            endIcon={<EllipsisVertical size={24} />}
          />
          <UserCard
            user={{
              id: '1',
              firstName: 'Loc',
              lastName: 'Vo',
              avatar: 'https://github.com/shadcn.png',
              countFriends: 25,
            }}
            endIcon={<EllipsisVertical size={24} />}
          />
        </Panel>
      ),
    },
    {
      value: 'education',
      children: <div>Education</div>,
    },
    {
      value: 'jobs',
      children: <div>Jobs</div>,
    },
  ];

  return (
    <main className="container flex flex-col mx-auto gap-4">
      <h1 className="text-lg font-semibold">This is homepage</h1>
      <Input placeholder="jennadavis@gmail.com" />
      <Input
        startIcon={<UserIcon size="18" />}
        variant="icon"
        placeholder="jennadavis@gmail.com"
      />
      <Input
        type="password"
        startIcon={<LockIcon size="18" />}
        variant="icon"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
      />

      <BrandLink />

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Button>Login</Button>
      <Button variant="primary">Login</Button>
      <Button variant="destructive">Login</Button>
      <Button variant="link" size="link">
        Login
      </Button>

      <Heading>Nhat Duong</Heading>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <UserCard
        user={{
          id: '1',
          firstName: 'Nhat',
          lastName: 'Duong',
          countFriends: 0,
        }}
        endIcon={<EllipsisVertical size={24} />}
      />

      <Panel
        panelTile="Friends"
        countItems={10}
        startIcon={<UsersRound size={24} />}
        buttonLabel="Invitations"
      >
        <UserCard
          user={{ id: '1', firstName: 'Nhat', lastName: 'Duong' }}
          endIcon={<EllipsisVertical size={24} />}
        />
        <UserCard
          user={{
            id: '1',
            firstName: 'Loc',
            lastName: 'Vo',
            avatar: 'https://github.com/shadcn.png',
            countFriends: 25,
          }}
          endIcon={<EllipsisVertical size={24} />}
        />
      </Panel>

      <Banner />

      <NavTab tabsTrigger={TABS_TRIGGER} tabsContent={tabsContent} />
    </main>
  );
};

export default Homepage;
