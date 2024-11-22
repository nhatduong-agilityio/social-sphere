import { useCallback } from 'react';
import Link from 'next/link';
import { LogOutIcon } from 'lucide-react';

// Components
import { Button, Text } from '../ui';
import { SwitchTheme } from './switch-theme';

// Constants
import { ROUTER } from '@/constants';

// Utils
import { getFullName } from '@/utils';
import { logout } from '@/features/auth/actions';

interface HeaderPopoverProps {
  firstName: string;
  lastName: string;
  username: string;
}

export const HeaderPopover = ({
  firstName,
  lastName,
  username,
}: HeaderPopoverProps) => {
  const handleLogOut = useCallback(async () => {
    await logout();
  }, []);

  return (
    <div className="grid">
      <div className="flex justify-between items-center p-4 border-b border-slate-700">
        <Link href={ROUTER.PROFILE_MAIN(username)}>
          <Text variant="primary">{getFullName(firstName, lastName)}</Text>
        </Link>
        <SwitchTheme />
      </div>

      <Button
        onClick={handleLogOut}
        className="flex w-full h-full p-4 gap-6 justify-start items-center border-none rounded-none bg-transparent"
      >
        <LogOutIcon size={20} className="text-muted-foreground" />

        <div className="flex flex-col items-start">
          <Text variant="primary" className="text-2xs dark:text-white">
            Log out
          </Text>
          <span className="text-3xs text-muted-foreground">
            Log out from your account.
          </span>
        </div>
      </Button>
    </div>
  );
};
