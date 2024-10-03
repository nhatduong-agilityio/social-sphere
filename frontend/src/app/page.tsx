// Icons
import { LockIcon, UserIcon } from 'lucide-react';

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

const Homepage = () => {
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
    </main>
  );
};

export default Homepage;
