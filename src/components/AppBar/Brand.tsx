import { Typography } from '@mui/material';
import { FunctionComponent, memo } from 'react';

export const Brand: FunctionComponent = memo(() => {
  return (
    <Typography component='h1' sx={{ flexGrow: 1, fontSize: '24px' }}>
      Order <b>Details</b>
    </Typography>
  );
});

Brand.displayName = 'Brand';
