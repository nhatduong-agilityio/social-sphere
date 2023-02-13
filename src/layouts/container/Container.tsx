import { Box, Container, useTheme } from '@mui/material';
import { useContext } from 'react';
import { AppBarContent } from '~/components/AppBar';
import { TableFilter } from '~/components/BoxControl';

export const LayoutContainer = () => {
  const theme = useTheme();

  return (
    <Container maxWidth='xl'>
      <AppBarContent />
      <Box
        sx={{
          width: '100%',
          padding: '15px 25px 20px 25px ',
          backgroundColor: `${theme.palette.background.default}`,
        }}
      >
        <TableFilter />
      </Box>
    </Container>
  );
};
