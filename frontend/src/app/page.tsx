import { Input } from '@/components/ui/input';
import { LockIcon, UserIcon } from 'lucide-react';

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
    </main>
  );
};

export default Homepage;
