import { Box, Container } from '@mui/material';
import { AppBarContent } from '~/components/AppBar';

export const LayoutContainer = () => {
  return (
    <Container maxWidth='xl'>
      <AppBarContent />
    </Container>
  );
};
