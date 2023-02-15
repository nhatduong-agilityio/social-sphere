import { Badge, badgeClasses, Stack, styled, Typography } from '@mui/material';
import { STATUS } from '~/constant/status';

const StyledBadgeDot = styled(Badge)(() => ({
  [`& .${badgeClasses.dot}`]: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
}));

interface IProps {
  status: string;
}

export const Status = ({ status }: IProps) => {
  const getStatus = () => {
    switch (status) {
      case STATUS.SUCCESS:
        return 'success';
      case STATUS.INFO:
        return 'info';
      default:
        break;
    }
  };

  return (
    <Stack direction='row' spacing={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
      <StyledBadgeDot variant='dot' color={getStatus()} />
      <Typography
        component={'h4'}
        sx={{
          fontSize: '13px',
          textTransform: 'capitalize',
          paddingTop: '3px',
        }}
      >
        {status}
      </Typography>
    </Stack>
  );
};
