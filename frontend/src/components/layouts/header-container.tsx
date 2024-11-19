import { getProfile } from '@/features/profile/actions';
import { Header } from './header';

interface HeaderContainerProps {
  username: string;
}

export const HeaderContainer = async ({ username }: HeaderContainerProps) => {
  const profile = await getProfile(username);

  return <Header isAuthenticated={!!profile} user={profile} />;
};
