import { Avatar, Stack, Typography, useTheme } from '@mui/material';

interface IProps {
  avatar: string;
  name: string;
}

export const Customer = ({ avatar, name }: IProps) => {
  const theme = useTheme();

  return (
    <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar alt='customer-avatar' src={avatar} sx={{ width: '40px', height: '40px' }} />
      <Typography
        component={'h4'}
        sx={{
          color: theme.palette.primary.light,
          fontWeight: 'Bold',
          fontSize: '13px',
          textTransform: 'capitalize',
        }}
      >
        {name}
      </Typography>
    </Stack>
  );
};
