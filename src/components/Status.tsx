// Libs
import { Badge, badgeClasses, Stack, styled, SxProps, Theme, Typography } from '@mui/material';
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
  directionValue?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  spacing?: number;
  styleStack?: SxProps<Theme>;
  styleText?: SxProps<Theme>;
}

const getStatus = (status: string) => {
  switch (status) {
    case STATUS.DELIVERED:
      return 'success';
    case STATUS.SHIPPED:
      return 'info';
    case STATUS.CANCELLED:
      return 'error';
    case STATUS.PENDING:
      return 'warning';
    default:
      break;
  }
};

export const Status: FunctionComponent<IProps> = memo(
  ({ status, directionValue, spacing, styleStack, styleText }: IProps) => {
    const valueStatus = useMemo(() => {
      return getStatus(status);
    }, [status]);

    return (
      <Stack direction={directionValue ? directionValue : 'row'} spacing={spacing} sx={styleStack}>
        <StyledBadgeDot variant='dot' color={valueStatus} />
        <Typography sx={styleText}>{status}</Typography>
      </Stack>
    );
  },
);

Status.displayName = 'Status';
