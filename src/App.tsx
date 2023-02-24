// Layout
import { Box, useTheme } from '@mui/material';
import { LayoutContainer } from '~/layouts/Container';

import { UserProvider } from '~/store/providers/user';

const App = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        paddingTop: '30px',
      }}
    >
      <UserProvider>
        <LayoutContainer />
      </UserProvider>
    </Box>
  );
};

export default App;
