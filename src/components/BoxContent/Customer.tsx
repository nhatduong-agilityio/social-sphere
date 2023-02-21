import { Avatar, Stack, Typography, useTheme } from '@mui/material';
import { IData } from '~/types/data';
import { IUser } from '~/types/user';

interface IProps {
  customer: IUser;
}

export const Customer = ({ customer }: IProps) => {
  const theme = useTheme();

  return (
    <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar alt='customer-avatar' src={customer.avatar} sx={{ width: '40px', height: '40px' }} />
      <Typography
        component={'h4'}
        sx={{
          color: theme.palette.primary.light,
          fontWeight: 'Bold',
          fontSize: '13px',
          textTransform: 'capitalize',
        }}
      >
        {customer.name}
      </Typography>
    </Stack>
  );
};
