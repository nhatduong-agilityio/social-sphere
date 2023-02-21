import { LayoutContainer } from './layouts/container/Container';
import { ColorModeProvider } from './store/providers/toggleColorMode';
import { UserProvider } from './store/providers/user';

const App = () => {
  return (
    <UserProvider>
      <ColorModeProvider>
        <LayoutContainer />
      </ColorModeProvider>
    </UserProvider>
  );
};

export default App;
