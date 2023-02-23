// Layout
import { LayoutContainer } from '~/layouts/Container';

// Store
import { ColorModeProvider } from '~/store/providers/colorMode';
import { UserProvider } from '~/store/providers/user';

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
