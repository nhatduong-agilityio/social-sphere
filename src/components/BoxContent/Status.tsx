// Libs
import { Badge, badgeClasses, Stack, styled, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { FunctionComponent } from 'react';

// Constants
import { STATUS } from '~/constants/status';

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

const getStatus = (status: string) => {
  switch (status) {
    case STATUS.SUCCESS:
      return 'success';
    case STATUS.INFO:
      return 'info';
    case STATUS.ERROR:
      return 'error';
    case STATUS.WARNING:
      return 'warning';
    default:
      break;
  }
};

export const Status: FunctionComponent<IProps> = memo(({ status }: IProps) => {
  const valueStatus = useMemo(() => {
    return getStatus(status);
  }, [status]);

  return (
    <Stack direction='row' spacing={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
      <StyledBadgeDot variant='dot' color={valueStatus} />
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
});

Status.displayName = 'Status';
