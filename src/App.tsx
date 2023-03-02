// Libs
import { Box, useTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

// Layout
import { LayoutContainer } from '~/layouts/Container';

// Component
import { OrderDetail } from '@components/OrderDetail/OrderDetail';

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
      <Routes>
        <Route path='/' element={<LayoutContainer />} />
        <Route path='/detail/:id' element={<OrderDetail />} />
        <Route path='*' element={<h1>error</h1>} />
      </Routes>
    </Box>
  );
};

export default App;
