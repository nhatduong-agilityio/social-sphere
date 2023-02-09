import { Box, Container } from '@mui/material';

import '~/layouts/container/container.scss';

export const LayoutContainer = () => {
  return (
    <Container maxWidth='xl' className='container'>
      <Box className='contents'>nhat duong</Box>
    </Container>
  );
};
