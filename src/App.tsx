import { LayoutContainer } from './layouts/container/Container';
import { ColorModeProvider } from './store/providers/toggleColorMode';

const App = () => {
  return (
    <ColorModeProvider>
      <LayoutContainer />
    </ColorModeProvider>
  );
};

export default App;
